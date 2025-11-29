# 🚀 Déploiement Rapide - Kushtati Immo

## ⚡ Guide Ultra-Rapide (5 minutes)

### **Option 1 : Vercel (Recommandé)**

1. **Créer compte GitHub** (si vous n'en avez pas)
   - Aller sur [github.com](https://github.com)
   - Sign up

2. **Créer un nouveau repository**
   - Cliquer "New repository"
   - Nom : `kushtati-immo`
   - Public
   - Create repository

3. **Pousser le code**
   ```bash
   cd "C:\Users\ib362\Documents\perso\kushtati immo"
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/VOTRE_USERNAME/kushtati-immo.git
   git branch -M main
   git push -u origin main
   ```

4. **Déployer sur Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Sign up avec GitHub
   - "New Project"
   - Import `kushtati-immo`
   - Deploy (tout est automatique !)

✅ **Terminé ! Votre site est en ligne !**

URL : `https://kushtati-immo.vercel.app`

---

## 📋 Checklist Pré-Déploiement

Avant de déployer, vérifiez :

- [ ] Code fonctionne localement (`npm run dev`)
- [ ] Build réussi (`npm run build`)
- [ ] Pas d'erreurs dans la console
- [ ] Toutes les fonctionnalités testées

---

## 🎯 Commandes Essentielles

```bash
# Tester le build
npm run build

# Tester le build localement
npm run preview

# Si tout fonctionne, déployer !
git add .
git commit -m "Ready for production"
git push

# Vercel déploiera automatiquement
```

---

## 🔑 Configuration Importante

### **Variables d'environnement sur Vercel**

1. Aller dans votre projet sur Vercel
2. Settings → Environment Variables
3. Ajouter :
   - **Name** : `VITE_GEMINI_API_KEY`
   - **Value** : Votre clé API Gemini

4. Redeploy le projet

---

## 📱 Accès au Site

Après déploiement, votre site sera sur :

```
https://kushtati-immo.vercel.app
```

Vous pouvez aussi ajouter un domaine personnalisé :
```
https://kushtati-immo.com
```

---

## ✅ Vérification Post-Déploiement

Testez ces éléments :

1. **Page d'accueil** - Charge correctement ?
2. **Login** - Fonctionne ?
3. **Dashboard propriétaire** - Tous les onglets ?
4. **Dashboard locataire** - Paiements fonctionnels ?
5. **PDFs** - Se génèrent et téléchargent ?
6. **Mobile** - Responsive ?

---

## 🆘 Problème ?

### **Build échoue**
```bash
# Nettoyer et rebuilder
rm -rf node_modules dist .vite
npm install
npm run build
```

### **Page blanche**
- Vérifier la console navigateur (F12)
- Vérifier les logs Vercel
- Vérifier que `dist/` contient des fichiers

### **API Gemini ne fonctionne pas**
- Vérifier que la variable `VITE_GEMINI_API_KEY` est définie
- Redéployer après ajout de la variable

---

## 📚 Documentation Complète

Pour plus de détails : [HEBERGEMENT_EN_LIGNE.md](HEBERGEMENT_EN_LIGNE.md)

---

**© 2025 Kushtati Immo 🇬🇳**
