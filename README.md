# Kushtati Immo 🏠

**Plateforme moderne de gestion immobilière pour la Guinée 🇬🇳**

---

## 🎯 Description

Kushtati Immo est une plateforme web bilingue (Français/English) qui connecte propriétaires et locataires en Guinée. Elle offre une interface intuitive pour la gestion locative, les paiements, et inclut un assistant IA alimenté par Google Gemini.

---

## ✨ Fonctionnalités

### **👨‍💼 Pour les Propriétaires**
- 📊 Dashboard complet avec statistiques en temps réel
- 🏢 Gestion complète de propriétés
- 💰 Suivi des paiements et revenus
- 📄 Gestion des contrats de location
- 🔧 Suivi des demandes de maintenance
- 📈 Génération de rapports fiscaux PDF

### **👤 Pour les Locataires**
- 🏡 Vue complète de votre logement
- 💳 Paiements en ligne (Orange Money, MTN, Moov)
- 📲 Demandes de maintenance en ligne
- 📄 Accès au contrat de location
- 💬 Messagerie avec le propriétaire

### **🤖 Assistant IA Gemini**
- 💬 Conseils immobiliers personnalisés
- 🌍 Bilingue (Français/English)
- 🇬🇳 Expertise du marché guinéen

---

## 🛠️ Technologies

- React 19 + TypeScript 5.8
- Vite 6 + Tailwind CSS 3.4
- Google Gemini AI
- jsPDF pour génération PDF

---

## 🚀 Déploiement sur Render

### **Méthode 1 : Blueprint (Recommandé)**

1. **Fork/Clone le repository**
```bash
git clone https://github.com/kushtati/kushtati-immo.git
cd kushtati-immo
```

2. **Push sur votre GitHub**
```bash
git remote set-url origin https://github.com/VOTRE_USERNAME/kushtati-immo.git
git push -u origin main
```

3. **Créer sur Render**
   - Connectez-vous sur [render.com](https://render.com)
   - "New" → "Blueprint"
   - Connectez votre repository GitHub
   - Render détectera automatiquement `render.yaml`
   - Ajoutez votre clé API Gemini dans Environment Variables :
     - **Key** : `VITE_GEMINI_API_KEY`
     - **Value** : Votre clé API
   - Cliquez sur "Apply"

### **Méthode 2 : Static Site**

1. Sur Render Dashboard : "New" → "Static Site"
2. Connectez votre repository GitHub
3. Configurez :
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `dist`
4. Environment Variables :
   - `VITE_GEMINI_API_KEY` : Votre clé API Gemini
5. Deploy !

---

## 💻 Installation Locale

```bash
# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Ajoutez votre VITE_GEMINI_API_KEY dans .env

# Lancer en développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🔐 Variables d'Environnement

Créez un fichier `.env` :

```env
VITE_GEMINI_API_KEY=votre_cle_api_gemini_ici
```

Obtenez votre clé API : [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## 📱 Comptes de Démo

**Propriétaire :**
- Email : `owner@kushtati.com`
- Password : `owner123`

**Locataire :**
- Email : `tenant@kushtati.com`
- Password : `tenant123`

---

## 🌍 Caractéristiques

- 🇬🇳 Optimisé pour la Guinée
- 💰 Devise : Franc Guinéen (GNF)
- 📱 Mobile Money : Orange, MTN, Moov
- 🌐 Bilingue : Français/English
- 📱 100% Responsive

---

## 📄 Licence

© 2025 Kushtati Immo - Tous droits réservés
