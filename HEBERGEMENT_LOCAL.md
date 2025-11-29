# Guide d'Hébergement Local - Kushtati Immo

## 🚀 Déploiement Local Complet

---

## **Prérequis**

Avant de commencer, assurez-vous d'avoir :
- ✅ Node.js 18+ installé
- ✅ npm ou yarn installé
- ✅ Git (optionnel, pour le versioning)

---

## **📥 ÉTAPE 1 : Installation**

### **1.1 - Vérifier les dépendances**
```bash
# Vérifier Node.js
node --version

# Vérifier npm
npm --version
```

### **1.2 - Installer les packages**
```bash
cd "C:\Users\ib362\Documents\perso\kushtati immo"
npm install
```

---

## **🔧 ÉTAPE 2 : Configuration**

### **2.1 - Variables d'environnement (optionnel)**
Créez un fichier `.env` à la racine :
```env
VITE_GEMINI_API_KEY=votre_cle_api_gemini
VITE_PORT=3000
```

### **2.2 - Vérifier la configuration Vite**
Le fichier `vite.config.ts` est déjà configuré pour :
- ✅ Port : 3000 (ou suivant disponible)
- ✅ Host : 0.0.0.0 (accessible sur le réseau local)
- ✅ Ouverture automatique du navigateur

---

## **▶️ ÉTAPE 3 : Lancer l'Application**

### **Mode Développement**

#### **Option 1 : Lancement simple**
```bash
npm run dev
```

#### **Option 2 : Avec accès réseau**
```bash
npm run host
```

#### **Option 3 : Manuel avec PowerShell**
```powershell
cd "C:\Users\ib362\Documents\perso\kushtati immo"
npm run dev
```

### **Ce qui se passe :**
1. Vite compile le code TypeScript
2. Le serveur démarre sur http://localhost:3000
3. Le navigateur s'ouvre automatiquement
4. Hot Module Replacement (HMR) activé

---

## **🌐 ÉTAPE 4 : Accès au Site**

### **Depuis votre PC**
```
http://localhost:3000
```

### **Depuis un autre appareil sur le même réseau**
Trouvez votre adresse IP locale :

**Windows PowerShell :**
```powershell
ipconfig
```
Cherchez "Adresse IPv4" (ex: 192.168.1.100)

Puis accédez depuis un autre appareil :
```
http://192.168.1.100:3000
```

### **Adresses réseau affichées par Vite**
Quand vous lancez `npm run dev`, Vite affiche :
```
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.100.6:3000/
```
Utilisez l'adresse "Network" pour accéder depuis d'autres appareils.

---

## **📦 ÉTAPE 5 : Build Production (optionnel)**

### **5.1 - Compiler pour la production**
```bash
npm run build
```

Cela crée un dossier `dist/` avec :
- Code optimisé et minifié
- Assets compilés
- Prêt pour le déploiement

### **5.2 - Tester la version production**
```bash
npm run preview
```

Serveur de preview sur http://localhost:4173

---

## **🔍 ÉTAPE 6 : Vérification**

### **Checklist de fonctionnement**

#### **Interface Propriétaire :**
- [ ] Dashboard s'affiche
- [ ] 6 onglets fonctionnels
- [ ] Statistiques visibles
- [ ] PDF se génèrent (rapports, historique)
- [ ] Chatbot répond

#### **Interface Locataire :**
- [ ] Dashboard s'affiche
- [ ] 5 onglets fonctionnels
- [ ] Modal de paiement s'ouvre
- [ ] Reçu PDF se génère après paiement
- [ ] Historique PDF se télécharge

#### **Navigation :**
- [ ] Page d'accueil charge
- [ ] Login fonctionne
- [ ] Switch entre Owner/Tenant ok
- [ ] Background images visibles

---

## **🛠️ Commandes Utiles**

### **Développement**
```bash
# Démarrer le serveur
npm run dev

# Démarrer avec accès réseau
npm run host

# Voir les logs détaillés
npm run dev -- --debug
```

### **Production**
```bash
# Build
npm run build

# Preview build
npm run preview
```

### **Maintenance**
```bash
# Nettoyer et réinstaller
rm -rf node_modules
npm install

# Nettoyer le cache Vite
rm -rf .vite
npm run dev
```

---

## **📊 Structure des Ports**

| Service | Port | URL |
|---------|------|-----|
| Dev Server | 3000 | http://localhost:3000 |
| Preview | 4173 | http://localhost:4173 |
| Alternative (si 3000 occupé) | 3001 | http://localhost:3001 |

---

## **🐛 Dépannage**

### **Problème : Port déjà utilisé**
```
Error: Port 3000 is already in use
```

**Solution :**
- Vite change automatiquement de port (3001, 3002, etc.)
- Ou tuez le processus sur le port 3000 :
```powershell
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### **Problème : Erreur de compilation**
```
Error: Cannot find module...
```

**Solution :**
```bash
npm install
```

### **Problème : Page blanche**
**Solution :**
1. Vérifier la console du navigateur (F12)
2. Vérifier les logs du terminal
3. Essayer :
```bash
rm -rf node_modules .vite
npm install
npm run dev
```

### **Problème : Images ne s'affichent pas**
**Solution :**
- Vérifier que les URLs d'images Unsplash sont accessibles
- Vérifier la connexion internet

### **Problème : PDF ne se génère pas**
**Solution :**
- Vérifier que jsPDF est installé : `npm list jspdf`
- Vérifier la console navigateur pour les erreurs

---

## **📱 Accès Mobile**

### **Depuis un smartphone/tablette sur le même WiFi :**

1. Lancez le serveur : `npm run dev`
2. Notez l'adresse "Network" affichée
3. Sur votre mobile, ouvrez le navigateur
4. Entrez l'adresse : `http://192.168.X.X:3000`

**Exemple :**
```
➜  Network: http://192.168.100.6:3000/
```
Sur mobile : allez sur `http://192.168.100.6:3000`

---

## **🔒 Sécurité Locale**

### **Points de sécurité :**
- ✅ Accessible uniquement sur votre réseau local
- ✅ Pas d'exposition à internet
- ✅ Aucune donnée n'est stockée (tout en mémoire)
- ⚠️ API Key Gemini exposée dans le code (changez-la avant production)

### **Pour sécuriser davantage :**
1. Utilisez un fichier `.env` pour les clés API
2. Ne partagez jamais votre clé Gemini
3. Activez le pare-feu Windows pour limiter l'accès

---

## **📈 Prochaines Étapes**

### **Phase actuelle : Hébergement Local ✅**
- Application fonctionnelle localement
- Accessible sur le réseau local
- Idéal pour démonstration et tests

### **Phase suivante : Backend (à venir)**
- Créer une API REST
- Base de données (PostgreSQL/MongoDB)
- Authentification réelle
- Sauvegarde des données

### **Phase finale : Déploiement Cloud**
- Héberger sur Vercel/Netlify (frontend)
- Héberger sur Railway/Render (backend)
- Nom de domaine personnalisé
- HTTPS activé

---

## **✅ Checklist Finale**

Avant de considérer l'hébergement local comme terminé :

- [ ] `npm install` réussi
- [ ] `npm run dev` démarre sans erreur
- [ ] Application accessible sur http://localhost:3000
- [ ] Toutes les pages se chargent
- [ ] Interface propriétaire fonctionnelle
- [ ] Interface locataire fonctionnelle
- [ ] PDFs se génèrent correctement
- [ ] Chatbot répond (avec clé API valide)
- [ ] Accessible depuis un autre appareil (optionnel)

---

## **🆘 Support**

Si vous rencontrez des problèmes :

1. **Vérifier les logs** dans le terminal
2. **Vérifier la console** du navigateur (F12)
3. **Relire la documentation** : `DOCUMENTATION.md`
4. **Réinstaller** : 
```bash
rm -rf node_modules
npm install
```

---

## **📞 Contact**

**Kushtati Immo**
- Email : ib362392@gmail.com
- GitHub : kushtati
- Tel : +224 623 93 63 13

---

**© 2025 Kushtati Immo - Guide d'Hébergement Local 🇬🇳**
