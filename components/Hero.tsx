import React from 'react';
import { Search } from 'lucide-react';

/**
 * Composant Hero - Section principale avec image de fond et formulaire de recherche
 */
export const Hero: React.FC = () => {
  return (
    <div className="relative h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Image de fond avec effet */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920" 
          alt="Villa de luxe en Guinée" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Contenu principal du hero */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Titre principal */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          Trouvez Votre Maison <br/> de Rêve en Guinée
        </h1>

        {/* Sous-titre */}
        <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light">
          Kushtati Immo vous offre un portefeuille exclusif de propriétés en Guinée. 
          Découvrez les meilleures opportunités immobilières à Conakry et ses environs.
        </p>
        
        {/* Formulaire de recherche */}
        <div className="bg-white p-2 rounded-xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
          {/* Champ Localisation */}
          <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-200 p-2">
            <div className="text-xs text-slate-400 text-left mb-1 uppercase tracking-wide font-bold ml-1">
              Localisation
            </div>
            <input 
              type="text" 
              placeholder="Conakry, Quartier..." 
              className="w-full outline-none text-slate-800 p-1 font-medium" 
            />
          </div>

          {/* Champ Type */}
          <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-200 p-2">
            <div className="text-xs text-slate-400 text-left mb-1 uppercase tracking-wide font-bold ml-1">
              Type
            </div>
            <select className="w-full outline-none text-slate-800 bg-transparent p-1 font-medium">
              <option>Résidentiel</option>
              <option>Commercial</option>
              <option>Terrain</option>
            </select>
          </div>

          {/* Champ Prix */}
          <div className="flex-1 p-2">
            <div className="text-xs text-slate-400 text-left mb-1 uppercase tracking-wide font-bold ml-1">
              Fourchette de Prix
            </div>
            <select className="w-full outline-none text-slate-800 bg-transparent p-1 font-medium">
              <option>Tout Prix</option>
              <option>1M - 5M GNF</option>
              <option>5M - 10M GNF</option>
              <option>10M+ GNF</option>
            </select>
          </div>

          {/* Bouton de recherche */}
          <button className="bg-brand-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
            <Search size={20} /> Rechercher
          </button>
        </div>
      </div>
    </div>
  );
};
