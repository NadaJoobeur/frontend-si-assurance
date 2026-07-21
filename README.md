# Frontend SI Assurance

Frontend d'un système d'information Assurance, développé en React et TypeScript. L'application couvre la gestion des assurés, des contrats, des devis, des garanties, des agences, des paiements et des sinistres, avec authentification par token JWT.

## Sommaire

- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Modules et fonctionnalités](#modules-et-fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Scripts disponibles](#scripts-disponibles)
- [Configuration de l'API](#configuration-de-lapi)
- [Points d'attention](#points-dattention)

## Stack technique

| Domaine | Outil |
|---|---|
| Framework UI | React 19 |
| Langage | TypeScript |
| Build tool | Vite |
| Routage | React Router v7 |
| UI Kit | Chakra UI + Emotion |
| Data fetching / cache | TanStack Query (React Query) |
| Client HTTP | Axios |
| Formulaires | React Hook Form |
| Visualisation de données | Recharts |
| Qualité de code | ESLint + typescript-eslint |

## Architecture

Le projet suit une organisation **modulaire par domaine métier** (feature-based), plutôt qu'un découpage classique par type de fichier :

```text
src/
├── app/
│   ├── App.tsx           # Composant racine
│   ├── main.tsx          # Point d'entrée
│   ├── routes/           # Déclaration des routes (AppRouter.tsx)
│   └── theme/            # Thème Chakra UI
├── modules/
│   ├── auth/              # Authentification (login, signup)
│   ├── personne/          # Gestion des assurés
│   ├── contrat/           # Gestion des contrats
│   ├── devis/              # Gestion des devis
│   ├── garantie/            # Packs de garanties
│   ├── agence/               # Gestion des agences
│   ├── paiement/              # Gestion des paiements
│   ├── sinistre/               # Gestion des sinistres
│   ├── ownerProfile/            # Profil du propriétaire de contrat
│   └── home/                     # Page d'accueil
└── shared/
    ├── api/               # Client Axios centralisé
    ├── components/         # Composants réutilisables
    ├── store/               # État partagé
    └── utils/                # Fonctions utilitaires
```

Chaque module suit la même sous-structure : `api/` (appels réseau), `components/`, `hooks/`, `pages/`, `types/`.

## Modules et fonctionnalités

### Authentification (`auth`)
- Connexion (`/login`)
- Inscription (`/signup`)

### Assurés (`personne`)
- Liste des assurés (`/person/list`)
- Ajout (`/person/add`)
- Détail (`/person/detail/:numeroIdentification`)
- Modification (`/person/edit/:numeroIdentification`)

### Contrats (`contrat`)
- Liste (`/contrat/list`)
- Création (`/contrat/add`)
- Détail (`/contrat/detail/:numeroContrat`)
- Modification (`/contrat/edit/:numeroContrat`)

### Devis (`devis`)
- Liste (`/devis/list`)
- Création (`/devis/add`)
- Détail (`/devis/detail/:id_devis`)
- Modification (`/devis/edit/:id_devis`)
- Transformation d'un devis en contrat (`/devis/to/contrat/:id`)

### Garanties (`garantie`)
- Packs de garanties (`/garantie`)

### Agences (`agence`)
- Liste (`/agences/list`)
- Création (`/agence/add`)
- Détail (`/agences/detail/:code_agence`)
- Modification (`/agences/edit/:code_agence`)

### Paiements (`paiement`)
- Liste (`/paiement/list`)
- Création (`/paiement/add`)
- Détail (`/paiement/detail/:id`)

### Sinistres (`sinistre`)
- Liste (`/sinistre/list`)
- Création (`/sinistre/add`)
- Détail (`/sinistre/detail/:numeroSinistre`)
- Modification (`/sinistre/edit/:numeroSinistre`)

### Profil (`ownerProfile`)
- Profil du propriétaire de contrat (`/owner/profile`)

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
git clone https://github.com/NadaJoobeur/frontend-si-assurance.git
cd frontend-si-assurance
npm install
```

## Scripts disponibles

```bash
npm run dev       # démarre le serveur de développement Vite
npm run build     # build de production
npm run preview   # prévisualise le build de production
npm run lint      # exécute ESLint
```

## Configuration de l'API

Le client Axios (`src/shared/api/axiosClient.ts`) pointe par défaut vers :

```
http://localhost:3000
```

Il ajoute automatiquement le token JWT stocké côté client aux requêtes sortantes, et redirige vers `/login` en cas de réponse `401`.

> À faire évoluer : externaliser cette URL via une variable d'environnement Vite (`import.meta.env.VITE_API_BASE_URL`) plutôt que de la coder en dur, pour permettre de basculer facilement entre environnements (local, staging, production).

## Points d'attention

- Le token d'authentification est actuellement stocké dans `localStorage` et loggé en clair dans la console lors de chaque requête (à des fins de debug) — à retirer avant toute mise en production, et à remplacer idéalement par un stockage plus sûr (cookie `httpOnly`) pour limiter l'exposition aux attaques XSS.
- L'URL de l'API backend est actuellement codée en dur dans `axiosClient.ts`.

## Auteurs

- **NadaJoobeur**
