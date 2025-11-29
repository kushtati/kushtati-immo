import React, { useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { Property } from '../types';
import { SlidersHorizontal } from 'lucide-react';

interface PropertiesPageProps {
  properties: Property[];
}

/**
 * COMPOSANT PAGE PROPRIÉTÉS
 * Page complète dédiée à la recherche et navigation des propriétés
 */
export const PropertiesPage: React.FC<PropertiesPageProps> = ({ properties }) => {
  const [activeType, setActiveType] = useState<'All' | 'Sale' | 'Rent'>('All');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [bedrooms, setBedrooms] = useState<string>('all');

  // Quartiers de Conakry
  const locations = [
    'Tous les quartiers',
    'Kaloum',
    'Camayenne',
    'Kipé',
    'Ratoma',
    'Hamdallaye',
    'Matam',
    'Dixinn',
    'Taouyah'
  ];

  // Filtrage des propriétés
  const filteredProperties = properties.filter(property => {
    // Filtre par type
    if (activeType !== 'All' && property.type !== activeType) return false;
    
    // Filtre par localisation
    if (location !== 'all' && !property.location.includes(location)) return false;
    
    // Filtre par chambres
    if (bedrooms !== 'all') {
      const bedroomCount = parseInt(bedrooms);
      if (property.beds < bedroomCount) return false;
    }
    
    // Filtre par prix
    if (priceRange !== 'all') {
      const price = property.price;
      switch (priceRange) {
        case 'low':
          if (price > 5000000000) return false;
          break;
        case 'medium':
          if (price < 5000000000 || price > 15000000000) return false;
          break;
        case 'high':
          if (price < 15000000000) return false;
          break;
      }
    }
    
    return true;
  });

  return (
    <section id="properties" className="relative py-20 min-h-screen">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-brand-primary mb-4">
            Nos Propriétés
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Découvrez notre collection exclusive de propriétés immobilières en Guinée. 
            Utilisez les filtres pour trouver votre maison idéale.
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="text-brand-accent" size={24} />
            <h3 className="text-xl font-bold text-slate-800">Filtres de Recherche</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Type de transaction */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Type de Transaction
              </label>
              <div className="flex gap-2">
                {(['All', 'Sale', 'Rent'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      activeType === type
                        ? 'bg-brand-primary text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type === 'All' ? 'Toutes' : type === 'Sale' ? 'Vente' : 'Location'}
                  </button>
                ))}
              </div>
            </div>

            {/* Localisation */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Quartier
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent outline-none"
              >
                <option value="all">{locations[0]}</option>
                {locations.slice(1).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Fourchette de prix */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Fourchette de Prix
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent outline-none"
              >
                <option value="all">Tous les prix</option>
                <option value="low">Moins de 5M GNF</option>
                <option value="medium">5M - 15M GNF</option>
                <option value="high">Plus de 15M GNF</option>
              </select>
            </div>

            {/* Chambres */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Chambres Minimum
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent outline-none"
              >
                <option value="all">Peu importe</option>
                <option value="1">1+ chambre</option>
                <option value="2">2+ chambres</option>
                <option value="3">3+ chambres</option>
                <option value="4">4+ chambres</option>
                <option value="5">5+ chambres</option>
              </select>
            </div>
          </div>

          {/* Résultats */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-slate-600">
              <span className="font-bold text-brand-primary">{filteredProperties.length}</span> 
              {filteredProperties.length > 1 ? ' propriétés trouvées' : ' propriété trouvée'}
            </p>
          </div>
        </div>

        {/* Grille de propriétés */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              Aucune propriété ne correspond à vos critères. 
              Essayez de modifier vos filtres.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
