# Kushtati Immo 🏠

> Plateforme de gestion immobilière moderne pour la Guinée 🇬🇳

[![Déploiement](https://img.shields.io/badge/deploy-vercel-black)](https://vercel.com)
[![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)

## 📋 Description

**Kushtati Immo** est une application web complète de gestion immobilière conçue spécialement pour le marché guinéen. Elle permet aux propriétaires de gérer leurs biens et aux locataires de suivre leurs paiements facilement.

### ✨ Fonctionnalités principales

#### **Pour les Propriétaires** 🏠
- Dashboard complet avec statistiques en temps réel
- Gestion des propriétés, contrats et maintenance
- Génération de rapports PDF (mensuels, fiscaux)
- Suivi des paiements et historique
- Chatbot IA pour assistance

#### **Pour les Locataires** 👤
- Suivi des paiements et historique
- 6 méthodes de paiement (Carte, Virement, Orange Money, MTN Money, PayPal, Espèces)
- Génération automatique de reçus PDF
- Paiements anticipés possibles
- Demandes de maintenance

## 🚀 Démarrage Rapide

### **Prérequis**
- Node.js 18+
- npm ou yarn

### **Installation**

```bash
# Cloner le projet
git clone https://github.com/kushtati/kushtati-immo.git
cd kushtati-immo

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### **Variables d'environnement** (optionnel)

Créez un fichier `.env` :
```env
VITE_GEMINI_API_KEY=votre_cle_api_gemini
```

## 📦 Scripts Disponibles

```bash
npm run dev      # Lancer le serveur de développement
npm run build    # Compiler pour la production
npm run preview  # Tester la version compilée
npm run host     # Lancer avec accès réseau local
```

## 🌐 Déploiement

### **Déploiement rapide sur Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kushtati/kushtati-immo)

Ou manuellement :

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod
```

### **Autres options de déploiement**
- **Netlify** : Voir [HEBERGEMENT_EN_LIGNE.md](HEBERGEMENT_EN_LIGNE.md)
- **GitHub Pages** : Voir [HEBERGEMENT_EN_LIGNE.md](HEBERGEMENT_EN_LIGNE.md)

## 📚 Documentation

- [DOCUMENTATION.md](DOCUMENTATION.md) - Guide complet du code
- [HEBERGEMENT_LOCAL.md](HEBERGEMENT_LOCAL.md) - Guide d'hébergement local
- [HEBERGEMENT_EN_LIGNE.md](HEBERGEMENT_EN_LIGNE.md) - Guide de déploiement en ligne
- [MISE_A_JOUR.md](MISE_A_JOUR.md) - Historique des mises à jour

## 🛠️ Technologies

- **Frontend** : React 19 + TypeScript 5.8
- **Build Tool** : Vite 6
- **Styling** : Tailwind CSS 3.4
- **PDF** : jsPDF
- **IA** : Google Gemini AI
- **Icons** : Lucide React

## 📊 Structure du Projet

```
kushtati-immo/
├── components/          # Composants React
│   ├── OwnerDashboardPage.tsx
│   ├── TenantDashboardPage.tsx
│   ├── PropertyCard.tsx
│   ├── AIAdvisor.tsx
│   └── Logo.tsx
├── services/           # Services API
│   └── geminiService.ts
├── App.tsx            # Composant principal
├── index.tsx          # Point d'entrée
├── types.ts           # Types TypeScript
└── vite.config.ts     # Configuration Vite
```

## 🎨 Design

- **Couleurs principales** : Slate (#334155) + Amber (#f59e0b)
- **Responsive** : Mobile, tablette, desktop
- **Images** : Unsplash (immobilier guinéen)

## 🔐 Sécurité

- Headers de sécurité configurés
- HTTPS automatique (Vercel/Netlify)
- Variables d'environnement pour secrets
- Pas de données sensibles dans le code

## 📈 Roadmap

### ✅ Phase 1 : Frontend (Terminée)
- Interface propriétaire complète
- Interface locataire complète
- Système de paiement
- Génération de PDFs

### 🔄 Phase 2 : Backend (En cours)
- API REST
- Base de données (PostgreSQL)
- Authentification JWT
- Sauvegarde des données

### 📅 Phase 3 : Intégrations (À venir)
- Orange Money API
- MTN Money API
- Emails automatiques
- SMS notifications

### 🚀 Phase 4 : Production (À venir)
- Tests utilisateurs
- Optimisations performance
- SEO
- Marketing

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/NouvelleFeature`)
3. Commit vos changements (`git commit -m 'Ajout NouvelleFeature'`)
4. Push vers la branche (`git push origin feature/NouvelleFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

**Kushtati Immo**
- **Email** : ib362392@gmail.com
- **GitHub** : [@kushtati](https://github.com/kushtati)
- **Téléphone** : +224 623 93 63 13
- **Localisation** : Conakry, Guinée 🇬🇳

## 🙏 Remerciements

- Google Gemini AI pour l'assistance IA
- Unsplash pour les images
- La communauté React et Vite

---

**© 2025 Kushtati Immo - Fait avec ❤️ pour la Guinée 🇬🇳**
