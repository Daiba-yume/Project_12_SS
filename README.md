# SportSee

Projet 12 - de la formation Openclassrooms - Développeur d'applications JS/React -

Objectif : Développez un tableau de bord d'analytics avec React

Ce projet, utilise :

- [React+Vite](https://vitejs.fr/guide/)
- [Recharts](https://recharts.org/en-US/guide)
- [SASS](https://sass-lang.com/install/)

## Description

Cette application permet aux utilisateurs de suivre le nombre de sessions réalisées ainsi que le nombre de calories brûlées.

### Liens utiles

- [Maquette figma](https://www.figma.com/design/BMomGVZqLZb811mDMShpLu/UI-design-Sportify-FR?node-id=0-1)

- [Backend](https://github.com/OpenClassrooms-Student-Center/SportSee)

- [Kanban](https://openclassrooms.notion.site/Tableau-de-bord-SportSee-6686aa4b5f44417881a4884c9af5669e)

### Installation

#### Configuration du fichier `.env`

Dans ce projet on peut basculer entre les données simulées et les données de l'API en fonction de la valeur de la variable VITE_USE_MOCKED_DATA dans le fichier .env.

1.Créez un fichier .env dans la racine du dossier Frontend avec cette variable : VITE_USE_MOCKED_DATA

2.Choisir le mode de données à utiliser :

- Pour utiliser les données mockées, il faut spécifier VITE_USE_MOCKED_DATA=true

- Pour utiliser les données provenant de l'API , il faut spécifier VITE_USE_MOCKED_DATA=false

#### Lancer le Backend

```bash
cd Backend
npm install
npm start
```

#### Lancer le Frontend

```bash
cd Frontend
npm install
npm run dev
```
