import React, { useState } from 'react';
import { PropertyCard } from './components/PropertyCard';
import { AIAdvisor } from './components/AIAdvisor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Statistics } from './components/Statistics';
import { BrandingSection } from './components/BrandingSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { PropertiesPage } from './components/PropertiesPage';
import { AgentsPage } from './components/AgentsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AddPropertyPage } from './components/AddPropertyPage';
import { LoginPage } from './components/LoginPage';
import { OwnerDashboardPage } from './components/OwnerDashboardPage';
import TenantDashboardPage from './components/TenantDashboardPage';
import { Property } from './types';

/**
 * DONNÉES DE DÉMONSTRATION
 * Liste des propriétés affichées sur le site
 */
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Villa Moderne Front de Mer',
    price: 12500000000,
    location: 'Camayenne, Conakry',
    beds: 4,
    baths: 3,
    sqft: 3200,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    type: 'Sale',
    featured: true
  },
  {
    id: '2',
    title: 'Appartement Moderne Centre-Ville',
    price: 4500000,
    location: 'Kaloum, Conakry',
    beds: 2,
    baths: 2,
    sqft: 1400,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    type: 'Rent'
  },
  {
    id: '3',
    title: 'Résidence Familiale de Prestige',
    price: 8900000000,
    location: 'Kipé, Ratoma',
    beds: 5,
    baths: 4,
    sqft: 4100,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    type: 'Sale'
  },
  {
    id: '4',
    title: 'Studio Minimaliste',
    price: 1800000,
    location: 'Almamya, Kaloum',
    beds: 1,
    baths: 1,
    sqft: 650,
    imageUrl: 'https://picsum.photos/800/600?random=4',
    type: 'Rent'
  },
  {
    id: '5',
    title: 'Villa de Luxe aux Collines',
    price: 21000000000,
    location: 'Taouyah, Dubréka',
    beds: 6,
    baths: 5,
    sqft: 5500,
    imageUrl: 'https://picsum.photos/800/600?random=5',
    type: 'Sale'
  },
  {
    id: '6',
    title: 'Maison avec Jardin',
    price: 5500000000,
    location: 'Hamdallaye, Ratoma',
    beds: 3,
    baths: 2,
    sqft: 1800,
    imageUrl: 'https://picsum.photos/800/600?random=6',
    type: 'Sale'
  }
];

/**
 * COMPOSANT PRINCIPAL DE L'APPLICATION
 * Gère l'état global et organise les différentes sections du site
 */
const App: React.FC = () => {
  // États pour gérer le menu mobile et le filtre des propriétés
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState<'home' | 'properties' | 'agents' | 'about' | 'contact' | 'add-property' | 'login' | 'dashboard'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'proprietaire' | 'locataire' | null>(null);

  // Filtrage des propriétés selon l'onglet actif
  const filteredProperties = activeTab === 'All' 
    ? MOCK_PROPERTIES 
    : MOCK_PROPERTIES.filter(p => p.type === activeTab);

  // Fonction pour changer de page
  const navigateToPage = (page: 'home' | 'properties' | 'agents' | 'about' | 'contact' | 'add-property' | 'login' | 'dashboard') => {
    // Si tentative d'accès à add-property sans connexion, rediriger vers login
    if (page === 'add-property' && !isLoggedIn) {
      setCurrentPage('login');
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fonction de connexion
  const handleLogin = (type: 'proprietaire' | 'locataire') => {
    setIsLoggedIn(true);
    setUserType(type);
    // Rediriger vers le tableau de bord approprié
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      
      {/* Barre de navigation */}
      <Navigation 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigate={navigateToPage}
      />

      {/* Contenu selon la page active */}
      {currentPage === 'home' && (
        <>
          {/* Section Hero (bannière principale) */}
          <Hero />

          {/* Section des propriétés en vedette */}
          <section className="py-20 bg-brand-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* En-tête avec titre et filtres */}
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-serif font-bold text-brand-primary mb-4">
                    Annonces en Vedette
                  </h2>
                  <p className="text-slate-500 max-w-lg">
                    Découvrez notre sélection de propriétés qui définissent le luxe, le confort et le style.
                  </p>
                </div>
                
                {/* Onglets de filtrage */}
                <div className="flex space-x-2 mt-6 md:mt-0 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                  {['All', 'Sale', 'Rent'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                        activeTab === tab 
                          ? 'bg-brand-primary text-white shadow-md' 
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {tab === 'All' ? 'Toutes' : tab === 'Sale' ? 'À Vendre' : 'À Louer'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grille de cartes de propriétés */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Bouton pour voir plus */}
              <div className="mt-16 text-center">
                <button 
                  onClick={() => navigateToPage('properties')}
                  className="border-2 border-brand-primary text-brand-primary px-10 py-3 rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all duration-300"
                >
                  Voir Toutes les Propriétés
                </button>
              </div>
            </div>
          </section>

          {/* Section des statistiques */}
          <Statistics />

          {/* Section de branding / valeurs */}
          <BrandingSection />

          {/* Section des témoignages */}
          <Testimonials />
        </>
      )}

      {currentPage === 'properties' && <PropertiesPage properties={MOCK_PROPERTIES} />}
      {currentPage === 'agents' && <AgentsPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'dashboard' && isLoggedIn && userType === 'proprietaire' && (
        <OwnerDashboardPage onAddProperty={() => navigateToPage('add-property')} />
      )}
      {currentPage === 'dashboard' && isLoggedIn && userType === 'locataire' && (
        <TenantDashboardPage />
      )}
      {currentPage === 'add-property' && isLoggedIn && userType === 'proprietaire' && (
        <AddPropertyPage onCancel={() => navigateToPage('dashboard')} />
      )}

      {/* Pied de page */}
      <Footer />

      {/* Assistant IA flottant */}
      <AIAdvisor />
    </div>
  );
};

export default App;
