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
 * 
 * @param userMessage - Le message de l'utilisateur
 * @param history - L'historique de la conversation (optionnel)
 * @returns La réponse de l'IA sous forme de texte
 */
export const generateRealEstateAdvice = async (
  userMessage: string,
  history: { role: string; text: string }[] = []
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Récupérer le modèle Gemini (utilisez gemini-1.5-flash pour plus de fiabilité)
    const model = ai.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    
    // Instructions système : définit le rôle et le comportement de l'IA
    const systemInstruction = `You are "Kushtati AI", an expert real estate advisor for the premium agency "Kushtati Immo" in Guinea. 
    Your tone is professional, warm, and sophisticated. 
    You help users find properties in Conakry and surrounding areas, understand real estate terms, and value homes.
    Prices are in Guinean Francs (GNF). You know the neighborhoods of Conakry: Kaloum, Camayenne, Kipé, Ratoma, Hamdallaye, etc.
    If asked about the agency, emphasize our expertise in Guinea's real estate market and personalized service.
    Keep responses concise (under 100 words) unless asked for a detailed explanation.
    
    IMPORTANT: Always respond using plain text. Do NOT use Markdown formatting (no asterisks *, bold **, or bullet points). Use simple line breaks and clear sentences instead.`;

    // Construire l'historique de conversation
    const chatHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Démarrer le chat avec l'historique
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are my real estate advisor. Please follow the instructions given.' }]
        },
        {
          role: 'model',
          parts: [{ text: systemInstruction }]
        },
        ...chatHistory
      ]
    });

    // Envoyer le message et obtenir la réponse
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    let cleanText = response.text() || "I apologize, I couldn't generate a response at this moment.";
    
    // Supprimer les astérisques (*, **, ***)
    cleanText = cleanText.replace(/\*+/g, '');
    
    // Supprimer les tirets et plus en début de ligne (listes)
    cleanText = cleanText.replace(/^[\-\+]\s+/gm, '');
    
    // Supprimer les # (titres Markdown)
    cleanText = cleanText.replace(/^#+\s+/gm, '');
    
    return cleanText.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Afficher plus de détails sur l'erreur
    if (error instanceof Error) {
      console.error("❌ Gemini API Error:", {
        message: error.message,
        name: error.name,
      });
    }
    
    // Messages d'erreur spécifiques selon le type d'erreur
    if (error instanceof Error) {
      // Clé API invalide ou manquante
      if (error.message.includes('API KEY NOT CONFIGURED')) {
        return "⚠️ L'assistant IA n'est pas configuré. Veuillez ajouter une clé API Gemini valide dans le fichier .env";
      }
      
      // Clé API révoquée ou invalide
      if (error.message.includes('API key') || error.message.includes('PERMISSION_DENIED')) {
        return "⚠️ Clé API invalide ou révoquée. Veuillez générer une nouvelle clé sur https://aistudio.google.com/app/apikey";
      }
      
      // Quota dépassé
      if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
        return "⚠️ Quota API dépassé. Réessayez dans quelques minutes ou vérifiez votre compte Google AI Studio.";
      }
      
      // Modèle non disponible
      if (error.message.includes('model') || error.message.includes('NOT_FOUND')) {
        return "⚠️ Modèle IA non disponible. Contactez l'administrateur.";
      }
    }
    
    return "Désolé, je rencontre des difficultés de connexion. Réessayez dans un instant.";
  }
};