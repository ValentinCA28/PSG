# Guide pour uploader votre projet sur GitHub

## Étape 1 : Installer Git (si ce n'est pas déjà fait)

1. Téléchargez Git depuis : https://git-scm.com/download/win
2. Installez Git en suivant les instructions de l'installateur
3. Redémarrez votre terminal/PowerShell après l'installation

## Étape 2 : Vérifier que Git est installé

Ouvrez PowerShell et tapez :
```powershell
git --version
```

Si Git est installé, vous verrez un numéro de version.

## Étape 3 : Configurer Git (première fois uniquement)

Si c'est la première fois que vous utilisez Git sur cet ordinateur, configurez votre nom et email :

```powershell
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

## Étape 4 : Initialiser le dépôt Git dans votre projet

Ouvrez PowerShell dans le dossier de votre projet et exécutez :

```powershell
cd "C:\Users\valen\Desktop\chase\Next.js-Development-Template-master"
git init
```

## Étape 5 : Ajouter tous les fichiers au dépôt

```powershell
git add .
```

## Étape 6 : Créer le premier commit

```powershell
git commit -m "Initial commit"
```

## Étape 7 : Créer un nouveau dépôt sur GitHub

1. Allez sur https://github.com
2. Connectez-vous à votre compte
3. Cliquez sur le bouton "+" en haut à droite
4. Sélectionnez "New repository"
5. Donnez un nom à votre dépôt (ex: "nextjs-template")
6. **Ne cochez PAS** "Initialize this repository with a README" (car vous avez déjà des fichiers)
7. Cliquez sur "Create repository"

## Étape 8 : Lier votre projet local à GitHub

GitHub vous donnera des instructions, mais voici les commandes à exécuter :

```powershell
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_NOM_DEPOT.git
```

Remplacez :
- `VOTRE_USERNAME` par votre nom d'utilisateur GitHub
- `VOTRE_NOM_DEPOT` par le nom que vous avez donné au dépôt

## Étape 9 : Pousser votre code sur GitHub

```powershell
git branch -M main
git push -u origin main
```

Si GitHub vous demande vos identifiants :
- **Username** : votre nom d'utilisateur GitHub
- **Password** : vous devrez utiliser un **Personal Access Token** (voir ci-dessous)

## Authentification GitHub (si nécessaire)

GitHub n'accepte plus les mots de passe pour Git. Vous devez créer un **Personal Access Token** :

1. Allez sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Cliquez sur "Generate new token (classic)"
3. Donnez un nom au token (ex: "Mon PC")
4. Sélectionnez les permissions : cochez au minimum `repo`
5. Cliquez sur "Generate token"
6. **Copiez le token** (vous ne pourrez plus le voir après)
7. Utilisez ce token comme mot de passe lors du `git push`

## Vérification

Allez sur votre dépôt GitHub, vous devriez voir tous vos fichiers !

## Commandes utiles pour la suite

- **Voir l'état des fichiers** : `git status`
- **Ajouter des fichiers modifiés** : `git add .`
- **Créer un commit** : `git commit -m "Description des changements"`
- **Envoyer sur GitHub** : `git push`
- **Récupérer les changements** : `git pull`


