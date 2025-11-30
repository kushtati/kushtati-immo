# Étape 1: Build de l'application React
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev incluses)
RUN npm install

# Copier tout le code source
COPY . .

# Build de l'application pour la production
RUN npm run build

# Étape 2: Serveur nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers buildés depuis l'étape 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
