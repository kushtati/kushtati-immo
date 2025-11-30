# Script de Déploiement Railway - Kushtati Immo
# Usage: .\deploy-railway.ps1

param(
    [Parameter(Mandatory=$false)]
    [string]$Environment = "production"
)

function Write-Header {
    param($Title)
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  $Title" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
}

function Write-Step {
    param($StepNumber, $Description)
    Write-Host "`n📋 Étape $StepNumber : $Description" -ForegroundColor Yellow
}

function Write-Success {
    param($Message)
    Write-Host "   ✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param($Message)
    Write-Host "   ❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "   ℹ️  $Message" -ForegroundColor Cyan
}

Write-Header "🚀 DÉPLOIEMENT RAILWAY - KUSHTATI IMMO"

# Vérifier que Railway CLI est installé
Write-Step 1 "Vérification des prérequis"
try {
    $railwayVersion = railway version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Railway CLI installé"
    } else {
        throw "Railway CLI non trouvé"
    }
} catch {
    Write-Error "Railway CLI n'est pas installé"
    Write-Info "Installation: npm install -g @railway/cli"
    Write-Info "Ou suivez le guide: https://docs.railway.app/develop/cli"
    exit 1
}

# Vérifier l'authentification Railway
Write-Step 2 "Vérification de l'authentification Railway"
try {
    railway whoami 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Authentifié sur Railway"
    } else {
        throw "Non authentifié"
    }
} catch {
    Write-Error "Non authentifié sur Railway"
    Write-Info "Lancez: railway login"
    exit 1
}

# Menu de déploiement
Write-Header "CHOIX DU SERVICE À DÉPLOYER"
Write-Host "`n1. Backend seulement" -ForegroundColor White
Write-Host "2. Frontend seulement" -ForegroundColor White
Write-Host "3. Backend ET Frontend" -ForegroundColor White
Write-Host "4. Annuler" -ForegroundColor White

$choice = Read-Host "`nVotre choix (1-4)"

switch ($choice) {
    "1" {
        Write-Header "DÉPLOIEMENT DU BACKEND"
        
        Write-Step 3 "Navigation vers le dossier backend"
        $backendPath = "..\kushtati-immo-api"
        if (Test-Path $backendPath) {
            Set-Location $backendPath
            Write-Success "Dossier backend trouvé"
        } else {
            Write-Error "Dossier backend introuvable: $backendPath"
            exit 1
        }
        
        Write-Step 4 "Vérification des fichiers requis"
        $requiredFiles = @("package.json", "src/server.js")
        foreach ($file in $requiredFiles) {
            if (Test-Path $file) {
                Write-Success "$file présent"
            } else {
                Write-Error "$file manquant"
                exit 1
            }
        }
        
        Write-Step 5 "Déploiement sur Railway"
        Write-Info "Ceci peut prendre quelques minutes..."
        railway up
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Backend déployé avec succès !"
            Write-Info "Vérifiez l'URL du backend dans Railway Dashboard"
        } else {
            Write-Error "Échec du déploiement backend"
            exit 1
        }
    }
    
    "2" {
        Write-Header "DÉPLOIEMENT DU FRONTEND"
        
        Write-Step 3 "Vérification de la variable VITE_API_URL"
        if (Test-Path ".env.production") {
            $envContent = Get-Content ".env.production" -Raw
            if ($envContent -match "VITE_API_URL=https://") {
                Write-Success "Variable VITE_API_URL configurée"
            } else {
                Write-Error "VITE_API_URL non configurée dans .env.production"
                Write-Info "Modifiez .env.production avec l'URL du backend Railway"
                exit 1
            }
        } else {
            Write-Error "Fichier .env.production manquant"
            Write-Info "Copiez .env.railway.example vers .env.production"
            exit 1
        }
        
        Write-Step 4 "Build du frontend"
        Write-Info "Compilation avec Vite..."
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Build réussi"
        } else {
            Write-Error "Échec du build"
            exit 1
        }
        
        Write-Step 5 "Déploiement sur Railway"
        Write-Info "Ceci peut prendre quelques minutes..."
        railway up
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Frontend déployé avec succès !"
            Write-Info "Vérifiez l'URL du frontend dans Railway Dashboard"
        } else {
            Write-Error "Échec du déploiement frontend"
            exit 1
        }
    }
    
    "3" {
        Write-Header "DÉPLOIEMENT COMPLET"
        Write-Info "Le backend sera déployé en premier, puis le frontend"
        Write-Host "`nAppuyez sur Entrée pour continuer..." -ForegroundColor Yellow
        Read-Host
        
        # Déployer backend
        Write-Step 3 "Déploiement du Backend"
        $backendPath = "..\kushtati-immo-api"
        if (Test-Path $backendPath) {
            Push-Location
            Set-Location $backendPath
            railway up
            $backendSuccess = ($LASTEXITCODE -eq 0)
            Pop-Location
            
            if ($backendSuccess) {
                Write-Success "Backend déployé"
            } else {
                Write-Error "Échec du déploiement backend"
                exit 1
            }
        } else {
            Write-Error "Dossier backend introuvable"
            exit 1
        }
        
        # Attendre un peu
        Write-Info "Attente de 5 secondes..."
        Start-Sleep -Seconds 5
        
        # Déployer frontend
        Write-Step 4 "Déploiement du Frontend"
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            railway up
            
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Frontend déployé"
            } else {
                Write-Error "Échec du déploiement frontend"
                exit 1
            }
        } else {
            Write-Error "Échec du build frontend"
            exit 1
        }
        
        Write-Header "DÉPLOIEMENT TERMINÉ"
        Write-Success "Backend et Frontend déployés avec succès !"
    }
    
    "4" {
        Write-Host "`nAnnulé par l'utilisateur" -ForegroundColor Yellow
        exit 0
    }
    
    default {
        Write-Error "Choix invalide"
        exit 1
    }
}

# Instructions finales
Write-Header "PROCHAINES ÉTAPES"
Write-Host "`n1. Aller sur https://railway.app/dashboard" -ForegroundColor White
Write-Host "2. Cliquer sur votre projet Kushtati Immo" -ForegroundColor White
Write-Host "3. Copier les URLs générées pour backend et frontend" -ForegroundColor White
Write-Host "4. Mettre à jour les variables d'environnement:" -ForegroundColor White
Write-Host "   - Backend: FRONTEND_URL = URL du frontend" -ForegroundColor Cyan
Write-Host "   - Frontend: VITE_API_URL = URL du backend + /api" -ForegroundColor Cyan
Write-Host "5. Redéployer si nécessaire pour appliquer les changements" -ForegroundColor White
Write-Host "`n6. Tester l'application en production !" -ForegroundColor Green

Write-Host "`n📚 Documentation complète: RAILWAY_DEPLOYMENT.md`n" -ForegroundColor Cyan
