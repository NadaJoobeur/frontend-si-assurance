// src/types/Agence.ts
export interface AgenceBase {
  code_agence: string;
  nom_agence: string;
  ville?: string;
  telephone?: string;
  email?: string;
  statut: string;
}

export interface Agence extends AgenceBase {
  id_agence: number; // Seule différence avec AgenceBase
}

export type AgenceFormData = AgenceBase; // Pour la création (sans id)
export type AgenceUpdateData = AgenceBase & { id_agence: number }; // Pour les updates