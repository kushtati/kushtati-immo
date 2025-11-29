import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { generateRealEstateAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

/**
 * COMPOSANT AI ADVISOR
 * Chat flottant avec assistant IA pour conseiller les utilisateurs
 * sur leurs recherches immobilières
 */
export const AIAdvisor: React.FC = () => {
  // États du composant
  const [isOpen, setIsOpen] = useState(false); // Chat ouvert/fermé
  const [input, setInput] = useState(''); // Texte saisi par l'utilisateur
  const [isLoading, setIsLoading] = useState(false); // En cours de chargement
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Bonjour ! Je suis votre conseiller immobilier Kushtati. Comment puis-je vous aider à trouver votre maison de rêve en Guinée aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  
  // Référence pour le scroll automatique
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Fait défiler automatiquement vers le dernier message
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll automatique quand les messages changent
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  /**
   * Envoie un message à l'IA et reçoit la réponse
   */
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Ajouter le message de l'utilisateur
    const userMsg: ChatMessage = { 
      role: 'user', 
      text: input, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Préparer l'historique pour l'API
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    // Obtenir la réponse de l'IA
    const responseText = await generateRealEstateAdvice(input, history);
    
    // Ajouter la réponse de l'IA
    const botMsg: ChatMessage = { 
      role: 'model', 
      text: responseText, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  /**
   * Gère l'appui sur la touche Entrée pour envoyer
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-brand-accent animate-bounce-subtle'
        }`}
        aria-label="Toggle AI Advisor"
      >
        {isOpen ? (
          <X className="text-white w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="text-white w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 transform transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 120px)', height: '500px' }}
      >
        {/* Header */}
        <div className="bg-brand-primary p-4 flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-full">
            <Sparkles className="text-brand-accent w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-serif font-bold">Kushtati IA</h3>
            <p className="text-slate-300 text-xs">Expert Immobilier Guinéen</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-primary text-white rounded-tr-none'
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] mt-1 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-500 p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-brand-accent" />
                <span className="text-xs">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:border-brand-accent focus-within:ring-1 focus-within:ring-brand-accent transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Posez vos questions sur les propriétés..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-1.5 rounded-full bg-brand-accent text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-700 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-2">
             <p className="text-[10px] text-slate-400">Propulsé par Gemini AI</p>
          </div>
        </div>
      </div>
    </>
  );
};