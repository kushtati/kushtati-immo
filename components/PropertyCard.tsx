import React from 'react';
import { Property } from '../types';
import { MapPin, Bed, Bath, Expand, Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

/**
 * COMPOSANT CARTE DE PROPRIÉTÉ
 * Affiche une propriété immobilière avec image, prix, localisation et caractéristiques
 */
export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      
      {/* Section image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge type (Vente ou Location) */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            property.type === 'Sale' ? 'bg-brand-accent text-white' : 'bg-brand-primary text-white'
          }`}>
            {property.type === 'Sale' ? 'À Vendre' : 'À Louer'}
          </span>
        </div>
        
        {/* Bouton favori */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-slate-600 hover:text-red-500 transition-colors">
          <Heart size={18} />
        </button>
        
        {/* Prix en overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-2xl font-serif font-bold">
            {property.price.toLocaleString('fr-GN')} GNF
            {property.type === 'Rent' && <span className="text-sm font-sans font-normal">/mois</span>}
          </p>
        </div>
      </div>

      {/* Section détails */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Titre */}
        <h3 className="text-lg font-bold text-brand-primary mb-1 line-clamp-1">{property.title}</h3>
        
        {/* Localisation */}
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin size={14} className="mr-1 text-brand-accent" />
          {property.location}
        </div>

        {/* Caractéristiques (Chambres, Bains, Surface) */}
        <div className="mt-auto grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 text-slate-600">
          <div className="flex flex-col items-center">
            <Bed size={18} className="mb-1 text-slate-400" />
            <span className="text-sm font-semibold">{property.beds} <span className="text-xs font-normal text-slate-400">Chambres</span></span>
          </div>
          <div className="flex flex-col items-center border-l border-slate-100">
            <Bath size={18} className="mb-1 text-slate-400" />
            <span className="text-sm font-semibold">{property.baths} <span className="text-xs font-normal text-slate-400">Bains</span></span>
          </div>
          <div className="flex flex-col items-center border-l border-slate-100">
            <Expand size={18} className="mb-1 text-slate-400" />
            <span className="text-sm font-semibold">{property.sqft} <span className="text-xs font-normal text-slate-400">m²</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};