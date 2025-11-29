import React from 'react';
import { Quote } from 'lucide-react';

/**
 * Composant Testimonials - Section des témoignages clients
 * Affiche les avis et retours d'expérience des clients satisfaits
 */
export const Testimonials: React.FC = () => {
  // Données des témoignages (peut être étendu facilement)
  const testimonials = [
    {
      id: 1,
      text: "Trouver une maison avec Kushtati était un rêve absolu. Le conseiller IA nous a aidés à affiner nos options, et l'agent s'est occupé du reste.",
      author: 'Mamadou & Aissatou',
      role: 'Propriétaires',
      avatar: 11
    },
    {
      id: 2,
      text: "Trouver une maison avec Kushtati était un rêve absolu. Le conseiller IA nous a aidés à affiner nos options, et l'agent s'est occupé du reste.",
      author: 'Mamadou & Aissatou',
      role: 'Propriétaires',
      avatar: 12
    },
    {
      id: 3,
      text: "Trouver une maison avec Kushtati était un rêve absolu. Le conseiller IA nous a aidés à affiner nos options, et l'agent s'est occupé du reste.",
      author: 'Mamadou & Aissatou',
      role: 'Propriétaires',
      avatar: 13
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Titre de la section */}
        <h2 className="text-4xl font-serif font-bold text-brand-primary mb-16">
          Témoignages Clients
        </h2>
        
        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative"
            >
              {/* Icône de citation */}
              <Quote className="absolute top-4 left-4 text-slate-200 w-8 h-8" />
              
              {/* Texte du témoignage */}
              <p className="text-slate-600 mb-6 relative z-10 italic">
                "{testimonial.text}"
              </p>
              
              {/* Informations de l'auteur */}
              <div className="flex items-center justify-center gap-4">
                <img 
                  src={`https://i.pravatar.cc/150?img=${testimonial.avatar}`} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full" 
                />
                <div className="text-left">
                  <div className="font-bold text-brand-primary">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
