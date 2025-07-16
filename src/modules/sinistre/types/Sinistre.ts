// src/types/Sinistre.ts
export interface SinistreBase {
  numeroContrat: string;
  numeroSinistre: string;
  numeroImmatriculation?: string| null;
  statut: 'OUVERT' | 'EN_COURS' | 'VALIDÉ' | 'ANNULÉ' | 'RÉGLÉ';
  dateSinistre: Date | string;
  OptionReparation :'Garage Agréé'| 'Remboursement'| 'Remorquage'| 'Véhicule de remplacement'| 'Pas de réparation'| 'Expertise seule';
  motifRejet?: string | null;
  lieuSinistre?: string | null;
  conducteur?: string | null;
  typeConducteur?:'Assuré'| 'Conjoint'| 'Conducteur occasionnel' | 'Tiers'| 'Jeune conducteur'| 'Conducteur non assuré';
  identifiantPrincipal: string;
}

export interface Sinistre extends SinistreBase {
  id: number; // Seule différence avec SinistreBase
  createdAt?: Date;
  updatedAt?: Date;
}

// Pour la création (sans id ni timestamps)
export type SinistreFormData = Omit<SinistreBase, 'numeroSinistre'> & {
  numeroSinistre?: string; 
};

// Pour les updates (avec id mais sans timestamps)
export type SinistreUpdateData = SinistreBase & { 
  id: number;
};

// Optionnel: type pour les résultats de recherche/filtrage
export interface SinistreFilter {
  numeroContrat?: string;
  numeroSinistre?: string;
  statut?: string;
  dateDebut?: Date | string;
  dateFin?: Date | string;
  identifiantPrincipal?: string;
}