# 🚀 Guide de Déploiement Railway - Kushtati Immo

## 📋 Prérequis

1. **Compte Railway** : Créer un compte sur [railway.app](https://railway.app)
2. **Railway CLI** (optionnel) : `npm install -g @railway/cli`
3. **GitHub Repository** : Pousser votre code sur GitHub

---

## 🏗️ Architecture de Déploiement

```
┌─────────────────────────────────────────────────────────┐
│                   RAILWAY PLATFORM                       │
│                                                          │
│  ┌────────────────────┐      ┌────────────────────┐   │
│  │  Backend Service    │      │  Frontend Service   │   │
│  │  Node.js + Express  │◄────►│  Static Site        │   │
│  │  Port: $PORT        │      │  nginx              │   │
│  └────────────────────┘      └────────────────────┘   │
│           ▲                                             │
│           │                                             │
│  ┌────────▼─────────┐                                  │
│  │  SQLite Volume    │                                  │
│  │  Persistent       │                                  │
│  └──────────────────┘                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 ÉTAPE 1 : Préparer les Projets

### Backend (kushtati-immo-api)

#### 1.1 Créer `.env.example`

Créer un fichier `.env.example` dans `kushtati-immo-api/` :

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Secret (CHANGER EN PRODUCTION)
JWT_SECRET=votre_secret_jwt_super_securise_ici_32_caracteres_minimum

# Database
DATABASE_PATH=./database/kushtati.db

# CORS (domaine frontend Railway)
FRONTEND_URL=https://votre-frontend.railway.app

# Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

#### 1.2 Modifier `src/server.js` pour Railway

Ajouter la configuration pour Railway au début du fichier :

```javascript
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// CORS configuration pour production
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      FRONTEND_URL,
      /\.railway\.app$/  // Permet tous les sous-domaines Railway
    ];
    
    // Permet les requêtes sans origin (Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

#### 1.3 Créer `railway.json` pour le backend

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### 1.4 Créer `nixpacks.toml` pour le backend

```toml
[phases.setup]
nixPkgs = ["nodejs-20_x"]

[phases.install]
cmds = ["npm ci --production"]

[phases.build]
cmds = ["node src/scripts/seed.js"]

[start]
cmd = "node src/server.js"
```

### Frontend (kushtati immo)

#### 1.5 Créer `.env.example` pour le frontend

```env
# API Backend URL
VITE_API_URL=https://votre-backend.railway.app/api
```

#### 1.6 Modifier `services/api.ts`

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
```

#### 1.7 Créer `railway.json` pour le frontend

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

#### 1.8 Créer `nixpacks.toml` pour le frontend

```toml
[phases.setup]
nixPkgs = ["nodejs-20_x", "nginx"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "nginx -c /app/nginx.conf -g 'daemon off;'"
```

#### 1.9 Adapter `nginx.conf` pour Railway

```nginx
worker_processes 1;
error_log /dev/stderr info;
pid /tmp/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    access_log /dev/stdout;
    
    # Temporary directories
    client_body_temp_path /tmp/client_temp;
    proxy_temp_path       /tmp/proxy_temp;
    fastcgi_temp_path     /tmp/fastcgi_temp;
    uwsgi_temp_path       /tmp/uwsgi_temp;
    scgi_temp_path        /tmp/scgi_temp;
    
    sendfile on;
    keepalive_timeout 65;
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    server {
        listen $PORT;
        server_name _;
        root /app/dist;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Pas de proxy dans Railway, le backend est séparé
        # Les appels API se feront directement vers le domaine backend
    }
}
```

---

## 🚀 ÉTAPE 2 : Déployer sur Railway

### Via l'Interface Web Railway

#### 2.1 Déployer le Backend

1. Aller sur [railway.app](https://railway.app)
2. Cliquer sur **"New Project"**
3. Sélectionner **"Deploy from GitHub repo"**
4. Choisir le repository (ou créer un nouveau repo avec le code backend)
5. Railway détectera automatiquement Node.js

**Variables d'environnement à configurer** :
```
PORT=5000
NODE_ENV=production
JWT_SECRET=changez_ceci_par_un_secret_super_securise_32_caracteres_minimum
DATABASE_PATH=./database/kushtati.db
FRONTEND_URL=https://votre-frontend.railway.app
```

6. Cliquer sur **"Deploy"**
7. Attendre le déploiement (2-3 minutes)
8. Copier l'URL du backend (ex: `https://kushtati-backend.railway.app`)

#### 2.2 Ajouter un Volume pour SQLite

1. Dans le projet Railway, aller dans **Settings** → **Volumes**
2. Cliquer sur **"Add Volume"**
3. Mount Path : `/app/database`
4. Cliquer sur **"Add"**

#### 2.3 Déployer le Frontend

1. Dans le même projet Railway, cliquer sur **"New Service"**
2. Sélectionner **"Deploy from GitHub repo"**
3. Choisir le repository frontend
4. Railway détectera automatiquement Vite

**Variables d'environnement** :
```
VITE_API_URL=https://votre-backend.railway.app/api
```

5. Cliquer sur **"Deploy"**
6. Attendre le déploiement
7. Copier l'URL du frontend (ex: `https://kushtati-immo.railway.app`)

#### 2.4 Mettre à jour la variable FRONTEND_URL du backend

1. Retourner dans les settings du service backend
2. Modifier `FRONTEND_URL` avec l'URL du frontend obtenue
3. Railway redémarrera automatiquement le backend

---

## 🔧 ÉTAPE 3 : Configuration Post-Déploiement

### 3.1 Vérifier le Backend

```bash
curl https://votre-backend.railway.app/api/properties
```

Devrait retourner les 8 propriétés.

### 3.2 Vérifier le Frontend

Ouvrir `https://votre-frontend.railway.app` dans le navigateur.

### 3.3 Vérifier la Console

- Appuyer sur F12
- Vérifier qu'il n'y a pas d'erreurs CORS
- Vérifier le message : `✅ 8 propriétés chargées depuis l'API`

---

## 📊 Monitoring et Logs

### Voir les logs en temps réel

Dans Railway Dashboard :
1. Cliquer sur le service (backend ou frontend)
2. Aller dans l'onglet **"Deployments"**
3. Cliquer sur le déploiement actif
4. Les logs s'affichent en temps réel

### Métriques

Railway fournit automatiquement :
- CPU usage
- Memory usage
- Network traffic
- Request count

---

## 💰 Coûts Railway

### Plan Gratuit (Hobby)
- $5 de crédit gratuit par mois
- Pas de carte de crédit requise
- Suffisant pour développement/test

### Plan Pro
- $20/mois
- Crédit supplémentaire inclus
- Support prioritaire
- Domaines personnalisés illimités

---

## 🌐 Domaine Personnalisé (Optionnel)

### Ajouter un domaine

1. Dans Railway, aller dans **Settings** → **Domains**
2. Cliquer sur **"Add Domain"**
3. Entrer votre domaine (ex: `kushtati-immo.com`)
4. Configurer les DNS chez votre registrar :
   ```
   Type: CNAME
   Name: @
   Value: [fourni par Railway]
   ```

---

## 🔐 Sécurité en Production

### ✅ Checklist Sécurité

- [ ] JWT_SECRET changé (32+ caractères aléatoires)
- [ ] CORS configuré avec domaines spécifiques
- [ ] Variables d'environnement sécurisées
- [ ] HTTPS activé (automatique sur Railway)
- [ ] Rate limiting configuré
- [ ] Validation des inputs côté backend
- [ ] Sanitization des données utilisateur
- [ ] Headers de sécurité (helmet.js)

---

## 🐛 Troubleshooting

### Problème : Backend ne démarre pas

**Solution** :
- Vérifier les logs Railway
- Vérifier que `package.json` a un script `start`
- Vérifier que le PORT utilise `process.env.PORT`

### Problème : Frontend ne charge pas les données

**Solution** :
- Vérifier `VITE_API_URL` dans les variables d'environnement
- Vérifier les erreurs CORS dans la console
- Vérifier que `FRONTEND_URL` est correct dans le backend

### Problème : Base de données vide

**Solution** :
- Vérifier que le volume est monté sur `/app/database`
- Vérifier les logs : le seed script doit s'exécuter au build
- Re-déployer pour forcer l'exécution du seed

### Problème : Erreur 503 Service Unavailable

**Solution** :
- Vérifier que le service est en cours d'exécution
- Augmenter les resources (RAM) si nécessaire
- Vérifier les logs pour erreurs de mémoire

---

## 📚 Ressources

- [Documentation Railway](https://docs.railway.app)
- [Railway Templates](https://railway.app/templates)
- [Railway Discord](https://discord.gg/railway)
- [Status Railway](https://status.railway.app)

---

## 🎯 Prochaines Étapes après Déploiement

1. **Monitoring** : Configurer des alertes (Sentry, LogRocket)
2. **Analytics** : Ajouter Google Analytics ou Plausible
3. **CI/CD** : Configurer les déploiements automatiques sur push
4. **Backup** : Mettre en place une stratégie de backup SQLite
5. **CDN** : Considérer CloudFlare pour les assets statiques
6. **SEO** : Optimiser le référencement
7. **Performance** : Optimiser les images et le bundle JS

---

**Bon déploiement ! 🚀**
