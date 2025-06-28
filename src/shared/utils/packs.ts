export const packs = [
  {
    code: 'RC',
    name: 'Pack RC',
    description: 'Le pack minimum légal couvrant la responsabilité civile du conducteur.',
    garanties: [
      { libelle: 'Responsabilité Civile', capital: 'Illimité', franchise: '0 TND', code: 'RC', rang: 1 },
      { libelle: 'Défense et recours', capital: '5 000 TND', franchise: '0 TND', code: 'DEFREC', rang: 2 },
      { libelle: 'Protection juridique de base', capital: '3 000 TND', franchise: '0 TND', code: 'JURIDBASE', rang: 3 },
    ]
  },
  {
    code: 'SECURITE',
    name: 'Pack Sécurité',
    description: 'Un niveau intermédiaire ajoutant des garanties importantes au pack RC.',
    garanties: [
      { libelle: 'Incendie', capital: '10 000 TND', franchise: '500 TND', code: 'INCENDIE', rang: 1 },
      { libelle: 'Vol', capital: '15 000 TND', franchise: '600 TND', code: 'VOL', rang: 2 },
      { libelle: 'Bris de glace', capital: '2 000 TND', franchise: '100 TND', code: 'BRISGLACE', rang: 3 },
      { libelle: 'Événements climatiques', capital: '10 000 TND', franchise: '800 TND', code: 'CLIMAT', rang: 4 },
      { libelle: 'Assistance standard', capital: '5 000 TND', franchise: '0 TND', code: 'ASSISTSTD', rang: 5 },
    ]
  },
  {
    code: 'SERENITE',
    name: 'Pack Sérénité',
    description: 'Le pack tous risques offrant la protection la plus complète.',
    garanties: [
      { libelle: 'Dommages tous accidents', capital: '30 000 TND', franchise: '1 500 TND', code: 'ACCIDENTS', rang: 1 },
      { libelle: 'Vandalisme', capital: '5 000 TND', franchise: '400 TND', code: 'VANDAL', rang: 2 },
      { libelle: 'Collision étendue', capital: '25 000 TND', franchise: '1 000 TND', code: 'COLLISION', rang: 3 },
      { libelle: 'Conducteur de base', capital: '10 000 TND', franchise: '200 TND', code: 'COND_BASE', rang: 4 },
    ]
  },
];


export const garantiesOptionnelles = [
  { libelle: 'Véhicule de remplacement', capital: '1 500 TND', franchise: '150 TND', code: 'VREMP',rang: 1  },
  { libelle: 'Garantie conducteur étendue', capital: '25 000 TND', franchise: '300 TND', code: 'CONDPLUS',rang: 2  },
  { libelle: 'Assistance 0 km étendue', capital: '8 000 TND', franchise: '0 TND', code: 'ASSISTPLUS',rang: 3 },
  { libelle: 'Vol partiel', capital: '5 000 TND', franchise: '300 TND', code: 'VOLPART',rang: 4  },
  { libelle: 'Dommages électriques', capital: '4 000 TND', franchise: '250 TND', code: 'ELECTRIQUE',rang: 5 },
  { libelle: "Accessoires non d'origine", capital: '2 500 TND', franchise: '200 TND', code: 'ACCNDOR',rang: 6 },
  { libelle: 'Bris de glace étendu', capital: '3 000 TND', franchise: '150 TND', code: 'BRGL_EXT',rang: 7 },
  { libelle: 'Catastrophes naturelles +', capital: '20 000 TND', franchise: '1 000 TND', code: 'CATPLUS',rang: 8 },
  { libelle: 'Protection juridique renforcée', capital: '10 000 TND', franchise: '0 TND', code: 'JURIDPLUS',rang: 9 },
  { libelle: 'Contenu du véhicule', capital: '2 000 TND', franchise: '250 TND', code: 'CONTENU' ,rang: 10},
];
