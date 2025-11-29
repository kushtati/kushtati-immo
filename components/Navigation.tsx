import React from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onNavigate?: (page: 'home' | 'properties' | 'agents' | 'about' | 'contact' | 'add-property' | 'login' | 'dashboard') => void;
}

/**
 * COMPOSANT NAVIGATION - Barre de navigation avec menu responsive
 */
export const Navigation: React.FC<NavigationProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen,
  onNavigate 
}) => {
  // Liens de navigation
  const navLinks = [
    { label: 'Propriétés', page: 'properties' as const },
    { label: 'Agents', page: 'agents' as const },
    { label: 'À Propos', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const }
  ];

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleLinkClick = (page: 'home' | 'properties' | 'agents' | 'about' | 'contact' | 'add-property' | 'login' | 'dashboard') => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={handleLogoClick}>
            <Logo className="h-12" />
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Liens de navigation */}
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link.page)}
                className="text-slate-600 hover:text-brand-accent font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            
            {/* Bouton d'action */}
            <button 
              onClick={() => handleLinkClick('add-property')}
              className="bg-brand-primary text-white px-5 py-2.5 rounded-lg hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200"
            >
              Lister une Propriété
            </button>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-slate-600 p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleLinkClick(link.page)}
              className="text-lg font-medium text-slate-800 text-left"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick('add-property')}
            className="bg-brand-accent text-white px-5 py-3 rounded-lg w-full font-bold"
          >
            Lister une Propriété
          </button>
        </div>
      )}
    </nav>
  );
};
