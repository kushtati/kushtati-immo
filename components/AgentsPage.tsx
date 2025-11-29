import React from 'react';
import { Phone, Mail, MapPin, Star, Award, Briefcase } from 'lucide-react';

// Type pour un agent
interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  phone: string;
  email: string;
  imageUrl: string;
  experience: number;
  salesCount: number;
  rating: number;
  bio: string;
}

/**
 * COMPOSANT PAGE AGENTS
 * Affiche l'équipe d'agents immobiliers avec leurs profils
 */
export const AgentsPage: React.FC = () => {
  // Données des agents
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Mamadou Diallo',
      role: 'Agent Principal',
      specialization: ['Villas de Luxe', 'Propriétés Commerciales'],
      phone: '+224 623 93 63 13',
      email: 'mamadou@kushtati-immo.com',
      imageUrl: 'https://i.pravatar.cc/400?img=12',
      experience: 8,
      salesCount: 120,
      rating: 4.9,
      bio: 'Expert en immobilier de luxe avec une connaissance approfondie du marché de Conakry.'
    },
    {
      id: '2',
      name: 'Aissatou Camara',
      role: 'Agente Senior',
      specialization: ['Résidences Familiales', 'Locations'],
      phone: '+224 620 11 22 33',
      email: 'aissatou@kushtati-immo.com',
      imageUrl: 'https://i.pravatar.cc/400?img=45',
      experience: 6,
      salesCount: 95,
      rating: 4.8,
      bio: 'Spécialiste des résidences familiales dans les quartiers de Ratoma et Kipé.'
    },
    {
      id: '3',
      name: 'Ibrahima Bah',
      role: 'Agent Commercial',
      specialization: ['Terrains', 'Investissements'],
      phone: '+224 621 44 55 66',
      email: 'ibrahima@kushtati-immo.com',
      imageUrl: 'https://i.pravatar.cc/400?img=33',
      experience: 5,
      salesCount: 78,
      rating: 4.7,
      bio: 'Conseiller en investissements immobiliers et développement foncier.'
    },
    {
      id: '4',
      name: 'Mariama Sylla',
      role: 'Agente Consultante',
      specialization: ['Appartements', 'Première Acquisition'],
      phone: '+224 622 77 88 99',
      email: 'mariama@kushtati-immo.com',
      imageUrl: 'https://i.pravatar.cc/400?img=28',
      experience: 4,
      salesCount: 62,
      rating: 4.9,
      bio: "Accompagnement personnalisé pour les primo-accédants et jeunes professionnels."
    }
  ];

  return (
    <section id="agents" className="relative py-20 min-h-screen">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-brand-primary mb-4">
            Notre Équipe d'Agents
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Des professionnels expérimentés dédiés à vous aider à trouver la propriété parfaite. 
            Notre équipe connaît chaque quartier de Conakry et vous accompagne à chaque étape.
          </p>
        </div>

        {/* Grille d'agents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
            >
              <div className="md:flex">
                {/* Photo de l'agent */}
                <div className="md:w-48 md:flex-shrink-0">
                  <img 
                    src={agent.imageUrl} 
                    alt={agent.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>

                {/* Informations */}
                <div className="p-6 flex-1">
                  {/* Nom et rôle */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-brand-primary mb-1">
                      {agent.name}
                    </h3>
                    <p className="text-brand-accent font-semibold">
                      {agent.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {agent.bio}
                  </p>

                  {/* Spécialisations */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Spécialisations
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialization.map((spec, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-semibold rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-slate-200">
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        <Briefcase size={16} className="text-brand-accent" />
                      </div>
                      <p className="text-lg font-bold text-slate-800">{agent.experience}</p>
                      <p className="text-xs text-slate-500">Ans d'exp.</p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        <Award size={16} className="text-brand-accent" />
                      </div>
                      <p className="text-lg font-bold text-slate-800">{agent.salesCount}</p>
                      <p className="text-xs text-slate-500">Ventes</p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        <Star size={16} className="text-brand-accent" />
                      </div>
                      <p className="text-lg font-bold text-slate-800">{agent.rating}</p>
                      <p className="text-xs text-slate-500">Note</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <a 
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-accent transition-colors"
                    >
                      <Phone size={14} className="text-brand-accent" />
                      {agent.phone}
                    </a>
                    <a 
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-accent transition-colors"
                    >
                      <Mail size={14} className="text-brand-accent" />
                      {agent.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="bg-brand-primary text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Prêt à Trouver Votre Maison Idéale ?
          </h2>
          <p className="text-slate-200 mb-8 max-w-2xl mx-auto">
            Nos agents sont disponibles pour répondre à toutes vos questions et vous accompagner 
            dans votre recherche immobilière.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#contact"
              className="bg-brand-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors"
            >
              Nous Contacter
            </a>
            <a 
              href="tel:+224623936313"
              className="bg-white text-brand-primary px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
            >
              Appeler Maintenant
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
