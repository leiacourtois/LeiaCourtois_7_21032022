# Installation
## Base de données
Ces logiciels doivent être installés :
1. NPM
2. NodeJS
3. MySQL
4. PHPmyAdmin (extrêment recommandé pour plus de facilité)

Ouvrir le fichier .env dans le dossier Backend et y placer les informations requises (la BDD, l'utilisateur et le MDP).

##Lancement
### Frontend
Suivre ces étapes à partir du dossier parent
```
cd frontend
npm install
npm run serve
```

### Backend
Suivre ces étapes à partir du dossier parent
```
cd backend
npm install
nodemon server
```

## Si modifications prévues dans le BACKEND
1. Commenter les lignes 17 à 21 dans le fichier app.js
2. Décommenter la ligne 9 dans models/index.js
