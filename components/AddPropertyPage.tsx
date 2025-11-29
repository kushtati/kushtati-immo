import React, { useState } from 'react';
import { Home, MapPin, Bed, Bath, Maximize, Upload, DollarSign, FileText, Image as ImageIcon } from 'lucide-react';

interface AddPropertyPageProps {
  onCancel?: () => void;
}

/**
 * Page pour ajouter une nouvelle propriété
 */
export const AddPropertyPage: React.FC<AddPropertyPageProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'villa',
    images: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle propriété:', formData);
    alert('Propriété ajoutée avec succès !');
    // Ici vous pouvez envoyer les données à votre backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative py-20 min-h-screen bg-slate-50">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-brand-primary mb-4">
            Lister une Propriété
          </h1>
          <p className="text-slate-600 text-lg">
            Ajoutez votre propriété à notre catalogue
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Informations de base */}
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-2">
                <Home size={24} />
                Informations de base
              </h2>
              
              <div className="space-y-6">
                {/* Titre */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                    Titre de la propriété *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: Villa moderne avec piscine"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Type de propriété */}
                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-slate-700 mb-2">
                    Type de propriété *
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                  >
                    <option value="villa">Villa</option>
                    <option value="appartement">Appartement</option>
                    <option value="terrain">Terrain</option>
                    <option value="bureau">Bureau</option>
                    <option value="commerce">Commerce</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Décrivez votre propriété en détail..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Localisation et Prix */}
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-2">
                <MapPin size={24} />
                Localisation et Prix
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Localisation */}
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
                    Localisation *
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Sélectionnez un quartier</option>
                    <option value="Kaloum">Kaloum</option>
                    <option value="Matam">Matam</option>
                    <option value="Ratoma">Ratoma</option>
                    <option value="Dixinn">Dixinn</option>
                    <option value="Matoto">Matoto</option>
                    <option value="Kipé">Kipé</option>
                    <option value="Lambandji">Lambandji</option>
                    <option value="Taouyah">Taouyah</option>
                  </select>
                </div>

                {/* Prix */}
                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
                    Prix (GNF) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Ex: 500000000"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Caractéristiques */}
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-2">
                <FileText size={24} />
                Caractéristiques
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Chambres */}
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-semibold text-slate-700 mb-2">
                    Chambres *
                  </label>
                  <div className="relative">
                    <Bed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="number"
                      id="bedrooms"
                      name="bedrooms"
                      required
                      min="0"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Salles de bain */}
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-semibold text-slate-700 mb-2">
                    Salles de bain *
                  </label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      required
                      min="0"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Surface */}
                <div>
                  <label htmlFor="area" className="block text-sm font-semibold text-slate-700 mb-2">
                    Surface (m²) *
                  </label>
                  <div className="relative">
                    <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="number"
                      id="area"
                      name="area"
                      required
                      min="0"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-2">
                <ImageIcon size={24} />
                Photos de la propriété
              </h2>
              
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-brand-accent transition-colors">
                <Upload className="mx-auto mb-4 text-slate-400" size={48} />
                <p className="text-slate-600 mb-2">
                  Glissez vos images ici ou cliquez pour parcourir
                </p>
                <p className="text-sm text-slate-500">
                  PNG, JPG jusqu'à 10MB (Minimum 3 photos)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="images"
                />
                <label
                  htmlFor="images"
                  className="inline-block mt-4 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Choisir des fichiers
                </label>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-brand-accent text-white px-8 py-4 rounded-lg font-bold hover:bg-amber-700 transition-colors shadow-lg"
              >
                Publier la propriété
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
