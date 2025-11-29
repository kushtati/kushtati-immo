# Documentation Complète - Kushtati Immo

## **📁 STRUCTURE DU PROJET**

---

## **FICHIERS RACINE**

### **1. index.html** 🌐
```html
<!-- Page HTML principale -->
```
- **Rôle** : Point d'entrée HTML de l'application
- **Contenu** : 
  - Balise `<div id="root">` où React s'attache
  - Liens vers les styles et scripts
  - Configuration de base de la page
- **Quand** : Chargé en premier par le navigateur

### **2. package.json** 📦
```json
{
  "name": "kushtati-immo",
  "dependencies": {...}
}
```
- **Rôle** : Fichier de configuration npm
- **Contenu** :
  - Liste toutes les bibliothèques (React, Vite, jsPDF, etc.)
  - Scripts de commandes (`npm run dev`, `npm run build`)
  - Métadonnées du projet (nom, version, auteur)
- **Utilité** : `npm install` lit ce fichier pour télécharger les dépendances

### **3. tsconfig.json** 📘
```json
{
  "compilerOptions": {...}
}
```
- **Rôle** : Configuration TypeScript
- **Contenu** :
  - Options de compilation
  - Version de JavaScript cible
  - Règles de vérification des types
- **Utilité** : Dit à TypeScript comment compiler votre code

### **4. vite.config.ts** ⚡
```typescript
export default defineConfig({...})
```
- **Rôle** : Configuration Vite
- **Contenu** :
  - Port du serveur (3000 par défaut)
  - Plugins (React)
  - Options de build
- **Utilité** : Personnalise le comportement de Vite

### **5. tailwind.config.js** 🎨
```javascript
module.exports = {...}
```
- **Rôle** : Configuration Tailwind CSS
- **Contenu** :
  - Couleurs personnalisées (brand-primary, brand-accent)
  - Chemins des fichiers à scanner
  - Extensions et plugins
- **Utilité** : Définit votre système de design

### **6. README.md** 📖
```markdown
# Kushtati Immo
Documentation du projet
```
- **Rôle** : Documentation
- **Contenu** : Instructions d'installation, description du projet
- **Utilité** : Guide pour les développeurs

### **7. metadata.json** 📋
```json
{
  "name": "Kushtati Immo",
  ...
}
```
- **Rôle** : Métadonnées du projet
- **Contenu** : Informations supplémentaires sur le projet
- **Utilité** : Configuration ou données de référence

---

## **FICHIERS SOURCE PRINCIPAUX**

### **8. index.tsx** 🚀
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
```
- **Rôle** : Point d'entrée JavaScript
- **Fonction** :
  - Importe React et App
  - Attache l'application au `<div id="root">`
  - Lance toute l'application
- **Flux** : `index.html` → `index.tsx` → `App.tsx`

### **9. App.tsx** 🎯
```typescript
function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [userType, setUserType] = useState<'owner' | 'tenant'>()
  
  return (...)
}
```
- **Rôle** : Composant racine, chef d'orchestre
- **Responsabilités** :
  - Gère la navigation (quelle page afficher)
  - Gère le type d'utilisateur (propriétaire/locataire)
  - Affiche HomePage, LoginPage, ou Dashboard selon l'état
- **État** :
  - `currentPage` : 'home', 'login', 'add-property', 'dashboard'
  - `userType` : 'owner' ou 'tenant'
- **Flux** : Décide quel composant afficher

### **10. types.ts** 📐
```typescript
export interface Property {...}
export interface Payment {...}
export interface Contract {...}
```
- **Rôle** : Définitions des types TypeScript
- **Contenu** :
  - `Property` : structure d'une propriété (id, title, price, etc.)
  - `Payment` : structure d'un paiement (month, amount, status, etc.)
  - `Contract` : structure d'un contrat
  - `MaintenanceRequest` : demande de maintenance
- **Utilité** : Assure que les données ont la bonne structure

### **11. index.css** 🎨
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- **Rôle** : Styles CSS globaux
- **Contenu** :
  - Imports Tailwind CSS
  - Styles personnalisés éventuels
  - Variables CSS
- **Utilité** : Applique Tailwind à toute l'application

---

## **📁 DOSSIER components/**

### **12. OwnerDashboardPage.tsx** 🏠 (1652 lignes)
```typescript
export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [myProperties, setMyProperties] = useState([...])
  
  return (...)
}
```
- **Rôle** : Interface complète du propriétaire
- **Contenu** :
  - 6 onglets (Vue d'ensemble, Propriétés, Contrats, Paiements, Maintenance, Rapports)
  - Statistiques avec graphiques
  - Gestion des propriétés
  - Génération de PDF (rapports, historique)
  - Données mock : `myProperties`, `contracts`, `maintenanceList`
- **État** :
  - `activeTab` : onglet actif
  - `myProperties` : liste des propriétés
  - `stats` : statistiques calculées
- **Fonctions clés** :
  - `formatPrice()` : formate les prix en GNF
  - Fonctions onClick pour générer les PDFs

### **13. TenantDashboardPage.tsx** 👤 (1131 lignes)
```typescript
export default function TenantDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [paymentHistory, setPaymentHistory] = useState([...])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  
  return (...)
}
```
- **Rôle** : Interface complète du locataire
- **Contenu** :
  - 5 onglets (Vue d'ensemble, Paiements, Maintenance, Contrat, Messages)
  - Système de paiement avec 6 méthodes
  - Génération automatique de reçus PDF
  - Historique des paiements avec téléchargement
  - Paiements anticipés
- **État** :
  - `activeTab` : onglet actif
  - `paymentHistory` : historique des paiements
  - `showPaymentModal` : affichage du modal de paiement
  - `selectedPayment` : paiement sélectionné
  - `selectedPaymentMethod` : méthode choisie
  - `isProcessing` : état de traitement
- **Fonctions clés** :
  - `generateReceipt()` : génère un reçu PDF
  - `handlePaymentClick()` : ouvre le modal
  - `handleProcessPayment()` : traite le paiement
  - `formatPrice()` : formate les prix
- **Données mock** :
  - `tenantProperty` : infos du logement
  - `paymentHistory` : 6 mois de paiements
  - `maintenanceRequests` : demandes de maintenance

### **14. PropertyCard.tsx** 🏘️
```typescript
export default function PropertyCard({ property }) {
  return (
    <div className="...">
      {/* Affiche une propriété */}
    </div>
  )
}
```
- **Rôle** : Composant réutilisable d'affichage de propriété
- **Props** : Reçoit un objet `property`
- **Affiche** :
  - Image
  - Titre et adresse
  - Prix
  - Caractéristiques (chambres, surface, etc.)
  - Boutons d'action
- **Utilité** : Évite la duplication de code

### **15. AIAdvisor.tsx** 🤖
```typescript
export default function AIAdvisor() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  
  const sendMessage = async () => {
    // Appel à l'API Gemini
  }
  
  return (...)
}
```
- **Rôle** : Chatbot intelligent avec Google Gemini
- **Fonctionnalités** :
  - Interface de chat
  - Envoie les messages à l'API Gemini
  - Affiche les réponses
  - Historique des conversations
- **État** :
  - `messages` : tableau des messages
  - `input` : texte en cours de saisie
  - `isLoading` : indicateur de chargement
- **Utilité** : Assistant virtuel pour conseiller les utilisateurs

### **16. Logo.tsx** 🎨
```typescript
export default function Logo() {
  return (
    <div className="...">
      <span>K</span>
    </div>
  )
}
```
- **Rôle** : Composant du logo Kushtati
- **Affichage** : Lettre "K" stylisée
- **Utilité** : Logo réutilisable dans toute l'app

---

## **📁 DOSSIER services/**

### **17. geminiService.ts** 🔌
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(API_KEY)

export async function getGeminiResponse(prompt: string) {
  // Appel à l'API
  return response
}
```
- **Rôle** : Service pour communiquer avec Google Gemini AI
- **Fonctions** :
  - `getGeminiResponse()` : envoie une question, reçoit une réponse
  - Configuration de l'API
  - Gestion des erreurs
- **Utilité** : Centralise la logique d'appel à l'API
- **Utilisé par** : `AIAdvisor.tsx`

---

## **🗂️ DOSSIERS GÉNÉRÉS**

### **node_modules/** 📚
- **Contenu** : Toutes les bibliothèques téléchargées
- **Taille** : Très lourd (plusieurs Go)
- **Généré par** : `npm install`
- **Ne pas modifier** : Géré automatiquement par npm

### **dist/** 📦
- **Contenu** : Code compilé pour la production
- **Généré par** : `npm run build`
- **Utilité** : Version optimisée à déployer sur un serveur

### **.venv/** 🐍
- **Contenu** : Environnement virtuel Python
- **État** : Inutilisé pour ce projet (React/TypeScript)
- **Raison de sa présence** : Peut-être créé par erreur ou pour tests futurs

---

## **🔄 FLUX DE L'APPLICATION**

```
1. Navigateur charge index.html
   ↓
2. index.html charge index.tsx
   ↓
3. index.tsx lance App.tsx
   ↓
4. App.tsx affiche la page actuelle :
   - HomePage (accueil)
   - LoginPage (connexion)
   - AddPropertyPage (ajout propriété)
   - OwnerDashboardPage (si owner)
   - TenantDashboardPage (si tenant)
   ↓
5. Les composants utilisent :
   - PropertyCard pour afficher propriétés
   - AIAdvisor pour le chatbot
   - Logo pour le branding
   ↓
6. Services utilisés :
   - geminiService pour l'IA
   - jsPDF pour les PDFs
```

---

## **💻 TECHNOLOGIES UTILISÉES**

### **1. TypeScript** 📘
- **Rôle** : Langage de programmation principal
- **Utilité** : 
  - Détecte les erreurs avant l'exécution
  - Autocomplétion intelligente
  - Code plus fiable et maintenable
  - Définit les types (Property, Payment, Contract, etc.)

### **2. React** ⚛️
- **Rôle** : Framework pour construire l'interface utilisateur
- **Utilité** :
  - Crée des composants réutilisables
  - Gère l'affichage dynamique
  - Gère l'état (données en mémoire)

### **3. Vite** ⚡
- **Rôle** : Serveur de développement + outil de build
- **Utilité** :
  - Démarre le serveur en quelques secondes
  - Recharge automatiquement (HMR)
  - Compile TypeScript en JavaScript
  - Optimise le code pour la production

### **4. Tailwind CSS** 🎨
- **Rôle** : Framework CSS pour le design
- **Utilité** :
  - Stylise rapidement sans écrire de CSS
  - Design cohérent et responsive
  - Classes prêtes à l'emploi

### **5. jsPDF** 📄
- **Rôle** : Génération de documents PDF
- **Utilité** :
  - Crée les reçus de paiement
  - Génère les rapports mensuels
  - Crée l'historique des paiements
  - Tout se fait dans le navigateur

### **6. Google Gemini AI** 🤖
- **Rôle** : Chatbot intelligent
- **Utilité** :
  - Conseille les utilisateurs
  - Répond aux questions sur l'immobilier
  - Assistant virtuel dans l'application

### **7. Lucide React** 🎯
- **Rôle** : Bibliothèque d'icônes
- **Utilité** :
  - Fournit tous les icônes (Home, Download, Calendar, etc.)
  - Icônes modernes et cohérents

---

## **💾 DONNÉES ACTUELLES**

### **État actuel**
Toutes les données sont **en dur** dans le code (mock data) :

- **OwnerDashboardPage.tsx** : 
  - `myProperties` : liste des propriétés
  - `contracts` : liste des contrats
  - `maintenanceList` : demandes de maintenance

- **TenantDashboardPage.tsx** : 
  - `tenantProperty` : infos du logement
  - `paymentHistory` : historique des paiements (6 mois)
  - `maintenanceRequests` : demandes de maintenance

### **Limitations actuelles**
- ❌ Pas de base de données
- ❌ Pas de serveur backend
- ❌ Pas d'authentification réelle
- ❌ Les données ne sont pas sauvegardées
- ❌ Tout s'efface au rechargement de la page

### **Pour avoir un vrai système**
Il faudra ajouter :
1. **Backend** (Node.js/Express, Python/Django, etc.)
2. **Base de données** (PostgreSQL, MongoDB, MySQL, etc.)
3. **API REST** pour connecter le frontend au backend
4. **Authentification réelle** (JWT, sessions, etc.)
5. **Système de paiement réel** (intégration Orange Money, MTN, etc.)

---

## **🎯 FONCTIONNALITÉS COMPLÈTES**

### **Interface Propriétaire** 🏠
- ✅ Dashboard avec 6 onglets fonctionnels
- ✅ Statistiques en temps réel avec graphiques
- ✅ Gestion des propriétés, contrats et maintenance
- ✅ **Téléchargement d'historique des paiements** (PDF professionnel)
- ✅ Génération de rapports mensuels et déclarations fiscales
- ✅ Rappels automatiques

### **Interface Locataire** 👤
- ✅ Dashboard avec 5 onglets
- ✅ **Système de paiement complet** avec 6 méthodes :
  - 💳 Carte bancaire
  - 🏦 Virement
  - 📱 Orange Money / MTN Money
  - 💰 PayPal
  - 💵 Espèces
- ✅ **Paiements anticipés** (possibilité de payer en avance)
- ✅ **Génération automatique de reçus PDF** après chaque paiement
- ✅ **Téléchargement de l'historique complet** (PDF)
- ✅ Alertes visuelles (retards/avances)
- ✅ Gestion des demandes de maintenance

### **Design** 🎨
- ✅ Couleurs : Slate (#334155) + Amber (#f59e0b)
- ✅ Images de fond sur toutes les pages
- ✅ Interface responsive et moderne
- ✅ Logo Kushtati intégré dans tous les PDFs

---

## **🚀 COMMANDES UTILES**

### **Installation**
```bash
npm install
```
Télécharge toutes les dépendances

### **Développement**
```bash
npm run dev
```
Lance le serveur de développement sur http://localhost:3000 (ou 3001)

### **Build Production**
```bash
npm run build
```
Compile le projet pour la production dans le dossier `dist/`

### **Preview Production**
```bash
npm run preview
```
Teste la version de production localement

---

## **📊 TABLEAU RÉCAPITULATIF**

| Fichier | Rôle | Quand le modifier |
|---------|------|-------------------|
| `index.html` | Page de base | Rarement |
| `index.tsx` | Lance React | Jamais |
| `App.tsx` | Navigation | Ajout de pages |
| `types.ts` | Types | Nouveaux modèles de données |
| `OwnerDashboardPage.tsx` | Interface proprio | Nouvelles fonctionnalités proprio |
| `TenantDashboardPage.tsx` | Interface locataire | Nouvelles fonctionnalités locataire |
| `PropertyCard.tsx` | Affichage propriété | Changement de design |
| `AIAdvisor.tsx` | Chatbot | Améliorer l'IA |
| `geminiService.ts` | API Gemini | Configuration API |
| `package.json` | Dépendances | Ajout de bibliothèques |
| Configs | Configuration | Changements techniques |

---

## **📞 CONTACT & COPYRIGHT**

- **Projet** : Kushtati Immo
- **Année** : 2025
- **Email** : ib362392@gmail.com
- **GitHub** : kushtati
- **Téléphone** : +224 623 93 63 13
- **Localisation** : Conakry, Guinée

---

**© 2025 Kushtati Immo - Gestion Immobilière pour la Guinée 🇬🇳**
