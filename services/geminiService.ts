import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * CLIENT GEMINI AI
 * Instance unique du client pour communiquer avec l'API Gemini
 */
let client: GoogleGenerativeAI | null = null;

/**
 * Récupère ou crée l'instance du client Gemini
 * Vérifie que l'API key est configurée avant de créer le client
 */
const getClient = (): GoogleGenerativeAI => {
  if (!client) {
    // Récupérer la clé API depuis les variables d'environnement
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      throw new Error('❌ GEMINI API KEY NOT CONFIGURED. Please add VITE_GEMINI_API_KEY to your .env file.');
    }
    
    // Créer l'instance du client
    client = new GoogleGenerativeAI(apiKey);
  }
  return client;
};

/**
 * GÉNÈRE UN CONSEIL IMMOBILIER AVEC L'IA
 * Envoie un message à Gemini AI et retourne la réponse
 */
export const generateRealEstateAdvice = async (
  userMessage: string,
  history: { role: string; text: string }[] = []
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Instructions système : définit le rôle et le comportement de l'IA
    const systemPrompt = `You are "Kushtati AI", an expert real estate advisor for the premium agency "Kushtati Immo" in Guinea. 
    Your tone is professional, warm, and sophisticated. 
    You help users find properties in Conakry and surrounding areas, understand real estate terms, and value homes.
    Prices are in Guinean Francs (GNF). You know the neighborhoods of Conakry: Kaloum, Camayenne, Kipé, Ratoma, Hamdallaye, etc.
    If asked about the agency, emphasize our expertise in Guinea's real estate market and personalized service.
    Keep responses concise (under 100 words) unless asked for a detailed explanation.
    
    IMPORTANT: Always respond using plain text. Do NOT use Markdown formatting (no asterisks *, bold **, or bullet points). Use simple line breaks and clear sentences instead.`;

    // Utilisation du nom de modèle stable et injection native des instructions système
    const model = ai.getGenerativeModel({ 
      model: 'gemini-1.5-pro', // Modèle stable avec quotas généreux
      systemInstruction: systemPrompt, // Méthode native plus robuste
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    
    // Construire l'historique de conversation propre
    const chatHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // VÉRIFICATION : Assurez-vous que le premier message n'est jamais 'model'
    if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
        // Si l'historique commence par un message du modèle, on le retire
        chatHistory.shift(); 
    }

    // Démarrer le chat
    const chat = model.startChat({
      history: chatHistory
    });

    // Envoyer le message et obtenir la réponse
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    let cleanText = response.text() || "I apologize, I couldn't generate a response at this moment.";
    
    // Nettoyage du texte (Markdown etc)
    cleanText = cleanText.replace(/\*+/g, ''); // Supprimer les astérisques
    cleanText = cleanText.replace(/^[\-\+]\s+/gm, ''); // Supprimer les puces de liste
    cleanText = cleanText.replace(/^#+\s+/gm, ''); // Supprimer les titres Markdown
    
    return cleanText.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    if (error instanceof Error) {
      console.error("❌ Gemini API Error Details:", {
        message: error.message,
        name: error.name,
      });

      // Gestion des erreurs spécifiques
      if (error.message.includes('API KEY NOT CONFIGURED')) {
        return "⚠️ L'assistant IA n'est pas configuré. Veuillez ajouter une clé API Gemini valide dans le fichier .env";
      }
      if (error.message.includes('API key') || error.message.includes('PERMISSION_DENIED')) {
        return "⚠️ Clé API invalide ou révoquée. Veuillez vérifier votre configuration.";
      }
      if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('429')) {
        return "⚠️ Quota API dépassé. Patientez 1 minute avant de réessayer. Consultez votre usage sur https://ai.dev/usage";
      }
      if (error.message.includes('model') || error.message.includes('NOT_FOUND')) {
        return "⚠️ Erreur technique (Modèle introuvable). Contactez le support.";
      }
    }
    
    return "Désolé, je rencontre des difficultés de connexion. Réessayez dans un instant.";
  }
};