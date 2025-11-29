import React from 'react';
import { Logo } from './Logo';

/**
 * Composant BrandingSection - Section expliquant les valeurs de l'entreprise
 * Affiche le logo, la mission et les avantages de Kushtati Immo
 */
export const BrandingSection: React.FC = () => {
  // Liste des avantages
  const benefits = [
    'Annonces Exclusives en Guinée',
    'Analyse de Marché par IA',
    'Service Personnalisé'
  ];

  return (
    <section className="bg-brand-primary text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Colonne de texte */}
          <div className="order-2 md:order-1">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              {/* Logo */}
              <Logo className="h-20 mb-8" variant="light" />
              
              {/* Titre */}
              <h3 className="text-2xl font-serif font-bold mb-4">
                Pourquoi Choisir Kushtati?
              </h3>
              
              {/* Description */}
              <p className="text-slate-300 mb-6 leading-relaxed">
                Nous connectons l'élégance architecturale et le confort humain. Kushtati Immo n'est pas qu'une agence; 
                nous sommes les créateurs de votre style de vie. Notre équipe dédiée et notre technologie IA de pointe 
                vous garantissent de trouver non pas juste une maison, mais un foyer qui résonne avec votre esprit.
              </p>
              
              {/* Liste des avantages */}
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-200">
                    <span className="h-2 w-2 bg-brand-accent rounded-full"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Colonne d'images */}
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <img 
              src="https://picsum.photos/400/500?random=10" 
              alt="Intérieur" 
              className="rounded-2xl transform translate-y-8 shadow-2xl" 
            />
            <img 
              src="https://picsum.photos/400/500?random=11" 
              alt="Extérieur" 
              className="rounded-2xl transform -translate-y-8 shadow-2xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
