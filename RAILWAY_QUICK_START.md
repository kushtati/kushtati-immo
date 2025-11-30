# 🚀 Guide Rapide - Déploiement Railway en 10 Minutes

## ⚡ Déploiement Ultra-Rapide (Interface Web)

### Étape 1 : Créer un compte Railway (2 min)
1. Aller sur https://railway.app
2. Cliquer sur **"Start a New Project"**
3. Se connecter avec GitHub

### Étape 2 : Déployer le Backend (3 min)
1. Cliquer sur **"Deploy from GitHub repo"**
2. Autoriser Railway à accéder à vos repos
3. Sélectionner le repo `kushtati-immo-api` (ou créer un nouveau repo)
4. Railway détecte automatiquement Node.js
5. Ajouter les variables d'environnement :
   ```
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=votre_secret_jwt_super_securise_ici_minimum_32_caracteres
   FRONTEND_URL=https://kushtati-immo.up.railway.app
   ```
6. Cliquer sur **"Deploy"**
7. ⏳ Attendre 2-3 minutes
8. ✅ Noter l'URL générée (ex: `https://kushtati-backend.up.railway.app`)

### Étape 3 : Ajouter le Volume SQLite (1 min)
1. Dans le service backend, aller dans **Settings → Volumes**
2. Cliquer sur **"New Volume"**
3. Mount Path : `/app/database`
4. Cliquer sur **"Add"**
5. Le service redémarrera automatiquement

### Étape 4 : Déployer le Frontend (3 min)
1. Dans le projet, cliquer sur **"New"** → **"GitHub Repo"**
2. Sélectionner le repo `kushtati immo`
3. Ajouter la variable d'environnement :
   ```
   VITE_API_URL=https://kushtati-backend.up.railway.app/api
   ```
   (Remplacer par l'URL réelle du backend de l'étape 2)
4. Cliquer sur **"Deploy"**
5. ⏳ Attendre 2-3 minutes
6. ✅ Noter l'URL générée (ex: `https://kushtati-immo.up.railway.app`)

### Étape 5 : Mettre à jour FRONTEND_URL (1 min)
1. Retourner dans le service **backend**
2. Aller dans **Variables**
3. Modifier `FRONTEND_URL` avec l'URL du frontend de l'étape 4
4. Railway redémarrera le backend automatiquement

### Étape 6 : Tester ! (1 min)
1. Ouvrir l'URL du frontend dans le navigateur
2. Appuyer sur **F12** → Console
3. Vérifier : `✅ 8 propriétés chargées depuis l'API`
4. Tester les filtres et la recherche

---

## 🎯 URLs à Noter

| Service | URL | Utilisation |
|---------|-----|-------------|
| **Backend API** | https://kushtati-backend.up.railway.app | API REST |
| **Frontend** | https://kushtati-immo.up.railway.app | Site web |

---

## 📋 Variables d'Environnement Complètes

### Backend
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=changez_ceci_par_un_secret_super_securise_32_caracteres_minimum
DATABASE_PATH=./database/kushtati.db
FRONTEND_URL=https://kushtati-immo.up.railway.app
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

### Frontend
```env
VITE_API_URL=https://kushtati-backend.up.railway.app/api
```

---

## ⚠️ Checklist Avant Déploiement

### Backend
- [ ] Fichier `package.json` avec script `"start": "node src/server.js"`
- [ ] `src/server.js` utilise `process.env.PORT`
- [ ] CORS configuré pour accepter l'URL Railway du frontend
- [ ] SQLite database path configuré
- [ ] Script de seed dans le build

### Frontend
- [ ] Fichier `.env.production` avec `VITE_API_URL`
- [ ] `services/api.ts` utilise `import.meta.env.VITE_API_URL`
- [ ] Script `"build": "vite build"` dans `package.json`
- [ ] Pas d'URLs localhost en dur dans le code

---

## 🐛 Résolution Rapide des Problèmes

### ❌ Backend ne démarre pas
**Solution** : Vérifier les logs Railway
- Aller dans **Deployments** → Cliquer sur le dernier déploiement
- Lire les erreurs dans les logs
- Vérifier que `PORT` n'est pas en dur dans le code

### ❌ Frontend affiche 6 propriétés au lieu de 8
**Solution** : API non connectée
1. Ouvrir F12 → Console
2. Chercher les erreurs CORS ou network
3. Vérifier que `VITE_API_URL` est correct
4. Vérifier que `FRONTEND_URL` est correct dans le backend
5. Redéployer les deux services

### ❌ Erreur CORS
**Solution** : Mettre à jour la configuration CORS backend
1. Vérifier que `FRONTEND_URL` correspond exactement à l'URL Railway du frontend
2. Pas de slash `/` à la fin de l'URL
3. Utiliser HTTPS, pas HTTP
4. Redéployer le backend

### ❌ Base de données vide
**Solution** : Le seed ne s'est pas exécuté
1. Vérifier le build command dans Railway
2. Ajouter `node src/scripts/seed.js` avant le start
3. Ou créer un fichier `nixpacks.toml` (voir documentation complète)
4. Redéployer

---

## 💰 Coûts Estimés

### Plan Hobby (Gratuit)
- **$5 de crédit gratuit** par mois
- Suffisant pour :
  - 2 services (backend + frontend)
  - Trafic modéré (< 100k requêtes/mois)
  - Développement et tests

### Si vous dépassez
- **$0.000231/GB-hour** pour les ressources
- Environ **$2-5/mois** pour une petite application
- **$20/mois** Plan Pro avec $10 de crédit inclus

---

## 🔒 Sécurité Important !

### ⚠️ Avant de mettre en production
1. **Changer le JWT_SECRET** :
   ```bash
   # Générer un secret sécurisé
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   
2. **Vérifier CORS** :
   - Ne pas utiliser `origin: '*'`
   - Lister uniquement les domaines autorisés
   
3. **HTTPS Activé** :
   - Railway active automatiquement HTTPS
   - Vérifier que les URLs commencent par `https://`

---

## 📊 Monitoring

### Voir les métriques
1. Dans Railway Dashboard, cliquer sur un service
2. Onglet **Metrics** :
   - CPU Usage
   - Memory Usage
   - Network Traffic
   - Requests/sec

### Logs en temps réel
1. Onglet **Deployments**
2. Cliquer sur le déploiement actif
3. Les logs s'affichent automatiquement

---

## 🎉 C'est Déployé !

Votre plateforme Kushtati Immo est maintenant accessible en ligne !

### Partager l'URL
```
🏠 Kushtati Immo
Plateforme immobilière pour la Guinée

🌐 https://kushtati-immo.up.railway.app
```

### Prochaines améliorations
- [ ] Ajouter un domaine personnalisé (ex: kushtati-immo.com)
- [ ] Configurer les emails (SendGrid, Mailgun)
- [ ] Ajouter Google Analytics
- [ ] Mettre en place un système de backup
- [ ] Optimiser les performances (CDN, caching)

---

**Besoin d'aide ?**
- Documentation complète : `RAILWAY_DEPLOYMENT.md`
- Script automatique : `deploy-railway.ps1`
- Discord Railway : https://discord.gg/railway
- Support : https://railway.app/help
