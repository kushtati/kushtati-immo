import React, { useState } from 'react';
import { Mail, Lock, User, Home, Key } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userType: 'proprietaire' | 'locataire') => void;
}

/**
 * Page de connexion et inscription
 */
export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'proprietaire' | 'locataire'>('locataire');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Simulation de connexion
    console.log('Connexion:', { ...formData, userType, isLogin });
    alert(`${isLogin ? 'Connexion' : 'Inscription'} réussie en tant que ${userType} !`);
    onLogin(userType);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative py-20 min-h-screen flex items-center justify-center">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* En-tête avec onglets */}
          <div className="flex border-b">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 font-bold transition-colors ${
                isLogin
                  ? 'bg-brand-primary text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 font-bold transition-colors ${
                !isLogin
                  ? 'bg-brand-primary text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Titre */}
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-brand-primary mb-2">
                {isLogin ? 'Bon retour !' : 'Créer un compte'}
              </h2>
              <p className="text-slate-600">
                {isLogin
                  ? 'Connectez-vous pour continuer'
                  : 'Rejoignez Kushtati Immo'}
              </p>
            </div>

            {/* Nom (uniquement pour inscription) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Nom complet *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Confirmation mot de passe (uniquement pour inscription) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirmer le mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Type d'utilisateur */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Vous êtes : *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Option Locataire */}
                <label
                  className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    userType === 'locataire'
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="locataire"
                    checked={userType === 'locataire'}
                    onChange={(e) => setUserType(e.target.value as 'locataire')}
                    className="absolute opacity-0"
                  />
                  <Key
                    size={32}
                    className={`mb-2 ${
                      userType === 'locataire' ? 'text-brand-accent' : 'text-slate-400'
                    }`}
                  />
                  <span
                    className={`font-bold ${
                      userType === 'locataire' ? 'text-brand-accent' : 'text-slate-600'
                    }`}
                  >
                    Locataire
                  </span>
                  <span className="text-xs text-slate-500 text-center mt-1">
                    Je cherche à louer
                  </span>
                </label>

                {/* Option Propriétaire */}
                <label
                  className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    userType === 'proprietaire'
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="proprietaire"
                    checked={userType === 'proprietaire'}
                    onChange={(e) => setUserType(e.target.value as 'proprietaire')}
                    className="absolute opacity-0"
                  />
                  <Home
                    size={32}
                    className={`mb-2 ${
                      userType === 'proprietaire' ? 'text-brand-accent' : 'text-slate-400'
                    }`}
                  />
                  <span
                    className={`font-bold ${
                      userType === 'proprietaire' ? 'text-brand-accent' : 'text-slate-600'
                    }`}
                  >
                    Propriétaire
                  </span>
                  <span className="text-xs text-slate-500 text-center mt-1">
                    Je veux publier
                  </span>
                </label>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="w-full bg-brand-accent text-white py-4 rounded-lg font-bold hover:bg-amber-700 transition-colors shadow-lg"
            >
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>

            {/* Mot de passe oublié (uniquement pour connexion) */}
            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-brand-primary hover:text-brand-accent transition-colors"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
