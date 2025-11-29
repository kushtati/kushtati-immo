import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10", variant = 'dark' }) => {
  const primaryColor = variant === 'dark' ? '#1e293b' : '#f8fafc'; // Slate 800 or Slate 50
  const accentColor = '#d97706'; // Amber 600

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Kushtati Immo Logo"
      >
        {/* Modern Architectural Monogram 'K' */}
        <path
          d="M25 15V85"
          stroke={primaryColor}
          strokeWidth="8"
          strokeLinecap="square"
        />
        <path
          d="M25 50L65 15"
          stroke={accentColor}
          strokeWidth="8"
          strokeLinecap="square"
        />
        <path
          d="M45 32.5L75 85"
          stroke={accentColor}
          strokeWidth="8"
          strokeLinecap="square"
        />
        
        {/* Roof/Lintel Accent */}
        <path
            d="M65 15H85"
            stroke={primaryColor}
            strokeWidth="8"
            strokeLinecap="square"
        />
      </svg>
      <div className="flex flex-col justify-center">
        <span 
            className="font-serif font-bold text-xl tracking-wide leading-none"
            style={{ color: primaryColor }}
        >
            KUSHTATI
        </span>
        <span 
            className="text-xs font-sans tracking-[0.2em] uppercase font-light opacity-80"
            style={{ color: variant === 'dark' ? '#64748b' : '#cbd5e1' }}
        >
            Immo
        </span>
      </div>
    </div>
  );
};
