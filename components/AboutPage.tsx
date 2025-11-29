import React from 'react';
import { Logo } from './Logo';
import { Target, Eye, Heart, Award, Users, TrendingUp, Shield, Zap } from 'lucide-react';

/**
 * COMPOSANT PAGE À PROPOS
 * Présente l'histoire, la mission et les valeurs de Kushtati Immo
 */
export const AboutPage: React.FC = () => {
  // Valeurs de l'entreprise
  const values = [
    {
      icon: Shield,
      title: 'Transparence',
      description: 'Nous croyons en une communication claire et honnête avec tous nos clients.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Notre amour pour l\'immobilier guinéen nous pousse à l\'excellence.'
    },
    {
      icon: Users,
      title: 'Service Client',
      description: 'Votre satisfaction est notre priorité absolue à chaque étape.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Nous utilisons les dernières technologies pour vous servir mieux.'
    }
  ];

  // Chiffres clés
  const stats = [
    { value: '500+', label: 'Propriétés Vendues' },
    { value: '95%', label: 'Clients Satisfaits' },
    { value: '8', label: 'Ans d\'Expérience' },
    { value: '15', label: 'Agents Experts' }
  ];

  // Timeline de l'entreprise
  const timeline = [
    {
      year: '2017',
      title: 'Fondation',
      description: 'Kushtati Immo est créée avec la vision de révolutionner l\'immobilier en Guinée.'
    },
    {
      year: '2019',
      title: 'Expansion',
      description: 'Ouverture de notre deuxième bureau à Ratoma et croissance de l\'équipe.'
    },
    {
      year: '2022',
      title: 'Innovation Digitale',
      description: 'Lancement de notre plateforme en ligne et intégration de l\'IA.'
    },
    {
      year: '2025',
      title: 'Leadership du Marché',
      description: 'Devenu leader de l\'immobilier premium à Conakry avec plus de 500 ventes.'
    }
  ];

  return (
    <section id="about" className="relative py-20 min-h-screen">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <Logo className="h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-serif font-bold text-brand-primary mb-4">
            À Propos de Kushtati Immo
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Votre partenaire de confiance pour l'immobilier en Guinée depuis 2017
          </p>
        </div>

        {/* Notre Histoire */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-primary mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Fondée en 2017, <strong className="text-brand-primary">Kushtati Immo</strong> est née 
                  d'une passion pour l'excellence immobilière et d'une vision claire : transformer le 
                  marché immobilier guinéen en offrant des services de qualité internationale.
                </p>
                <p>
                  Le nom "Kushtati" signifie "maison" en persan, reflétant notre engagement à aider 
                  chaque Guinéen à trouver non pas seulement une propriété, mais un véritable foyer où 
                  bâtir son avenir.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'être reconnus comme l'une des agences immobilières 
                  les plus innovantes et fiables de Conakry, avec une équipe d'experts passionnés et 
                  des centaines de clients satisfaits.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://picsum.photos/400/500?random=20" 
                alt="Bureau Kushtati"
                className="rounded-xl shadow-lg"
              />
              <img 
                src="https://picsum.photos/400/500?random=21" 
                alt="Équipe Kushtati"
                className="rounded-xl shadow-lg transform translate-y-8"
              />
            </div>
          </div>
        </div>

        {/* Mission et Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="bg-brand-primary text-white rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-accent p-3 rounded-full">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-serif font-bold">Notre Mission</h3>
            </div>
            <p className="text-slate-200 leading-relaxed">
              Faciliter l'accès à la propriété en Guinée en offrant un service personnalisé, 
              transparent et innovant. Nous nous engageons à être le pont entre vos rêves 
              immobiliers et leur réalisation, en combinant expertise locale et technologies 
              de pointe.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-slate-50 rounded-2xl p-8 border-2 border-brand-accent">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-accent p-3 rounded-full">
                <Eye size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-primary">Notre Vision</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Devenir la référence incontournable de l'immobilier en Afrique de l'Ouest, 
              reconnue pour son excellence, son innovation et son impact positif sur le 
              développement urbain durable de la région.
            </p>
          </div>
        </div>

        {/* Nos Valeurs */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-brand-primary text-center mb-12">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-brand-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-brand-accent" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-brand-primary mb-2">
                    {value.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-brand-primary text-center mb-12">
            Notre Parcours
          </h2>
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-accent"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Point sur la timeline */}
                  <div className="absolute left-8 md:left-1/2 -ml-3 w-6 h-6 bg-brand-accent rounded-full border-4 border-white z-10"></div>
                  
                  {/* Contenu */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-slate-50 rounded-xl p-6 shadow-md">
                      <span className="inline-block bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                        {item.year}
                      </span>
                      <h4 className="text-xl font-bold text-brand-primary mb-2">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-gradient-to-r from-brand-primary to-slate-800 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Kushtati en Chiffres
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-brand-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
