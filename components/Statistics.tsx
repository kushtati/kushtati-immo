import React from 'react';
import { Home, Users, TrendingUp, Star } from 'lucide-react';

/**
 * Composant Statistics - Affiche les statistiques de l'entreprise
 * (nombre de propriétés vendues, clients satisfaits, années d'expérience, etc.)
 */
export const Statistics: React.FC = () => {
  // Données des statistiques
  const stats = [
    {
      icon: Home,
      value: '500+',
      label: 'Propriétés Vendues'
    },
    {
      icon: Users,
      value: '95%',
      label: 'Clients Satisfaits'
    },
    {
      icon: TrendingUp,
      value: '8',
      label: "Ans d'Expérience"
    },
    {
      icon: Star,
      value: '24/7',
      label: 'Support IA'
    }
  ];

  return (
    <section className="bg-white py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="p-4">
                {/* Icône */}
                <div className="flex justify-center mb-4 text-brand-accent">
                  <Icon size={32} />
                </div>
                
                {/* Valeur */}
                <div className="text-4xl font-serif font-bold text-slate-800 mb-1">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-sm text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
