import React from 'react';
import { Logo } from './Logo';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

/**
 * Composant Footer - Pied de page avec informations de contact et liens
 */
export const Footer: React.FC = () => {
  // Liens rapides
  const quickLinks = [
    { label: 'Accueil', href: '#' },
    { label: 'Propriétés', href: '#' },
    { label: 'Agents', href: '#' },
    { label: 'Blog', href: '#' }
  ];

  // Liens légaux
  const legalLinks = [
    { label: 'Politique de Confidentialité', href: '#' },
    { label: "Conditions d'Utilisation", href: '#' },
    { label: 'Politique des Cookies', href: '#' }
  ];

  // Informations de contact
  const contactInfo = [
    { icon: Phone, text: '+224 623 93 63 13' },
    { icon: Mail, text: 'ib362392@gmail.com' },
    { icon: MapPin, text: 'Kaloum, Conakry\nRépublique de Guinée' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenu principal du footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Colonne 1: Logo et réseaux sociaux */}
          <div className="col-span-1 md:col-span-1">
            <Logo className="h-10 mb-6" variant="light" />
            <p className="text-sm leading-relaxed mb-6">
              Services immobiliers premium pour la Guinée moderne. Trouvez votre sanctuaire avec Kushtati Immo.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <a 
                href="https://github.com/kushtati" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-brand-accent"
                aria-label="GitHub"
              >
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-brand-accent">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-brand-accent">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Colonne 2: Liens rapides */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
              Liens Rapides
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Colonne 3: Liens légaux */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
              Légal
            </h4>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Colonne 4: Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <Icon size={16} className="mt-1 text-brand-accent" />
                    <span style={{ whiteSpace: 'pre-line' }}>{info.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>&copy; 2025 Kushtati. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
