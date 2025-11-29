import { GoogleGenAI } from "@google/genai";

/**
 * CLIENT GEMINI AI
 * Instance unique du client pour communiquer avec l'API Gemini
 */
let client: GoogleGenAI | null = null;

/**
 * Récupère ou crée l'instance du client Gemini
 * Vérifie que l'API key est configurée avant de créer le client
 */
const getClient = (): GoogleGenAI => {
  if (!client) {
    // Récupérer la clé API depuis les variables d'environnement
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    // Vérifier que la clé API est bien configurée
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      throw new Error(
        'Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.'
      );
    }
    
    // Créer l'instance du client
    client = new GoogleGenAI({ apiKey });
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
    
    // Modèle Gemini utilisé (rapide et efficace pour le chat)
    const model = 'gemini-2.5-flash';
    
    // Instructions système : définit le rôle et le comportement de l'IA
    const systemInstruction = `You are "Kushtati AI", an expert real estate advisor for the premium agency "Kushtati Immo" in Guinea. 
    Your tone is professional, warm, and sophisticated. 
    You help users find properties in Conakry and surrounding areas, understand real estate terms, and value homes.
    Prices are in Guinean Francs (GNF). You know the neighborhoods of Conakry: Kaloum, Camayenne, Kipé, Ratoma, Hamdallaye, etc.
    If asked about the agency, emphasize our expertise in Guinea's real estate market and personalized service.
    Keep responses concise (under 100 words) unless asked for a detailed explanation.`;

    // Appel à l'API Gemini avec l'historique et le nouveau message
    const response = await ai.models.generateContent({
      model,
      contents: [
        // Convertir l'historique au format attendu par Gemini
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        })),
        // Ajouter le nouveau message de l'utilisateur
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        systemInstruction,
        temperature: 0.7, // Contrôle la créativité des réponses
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Messages d'erreur spécifiques selon le type d'erreur
    if (error instanceof Error && error.message.includes('API key')) {
      return "⚠️ AI Assistant is not configured. Please contact the administrator.";
    }
    return "I'm currently having trouble connecting. Please try again in a moment.";
  }
};