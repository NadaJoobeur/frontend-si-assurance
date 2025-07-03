import type { ContratFormData, GarantieContratData, PackData, ProfilVehiculeData } from "../../contrat/types/Contrat";

export interface Devis {
  id: number;
  dateCreation: string;         // format : 'YYYY-MM-DD'
  dateEffet: string;            // format : 'YYYY-MM-DD'
  dateExpiration: string;       // format : 'YYYY-MM-DD'
  typeFractionnement: string;
  typeRenouvellement: string;
  statut: 'EN_ATTENTE' | 'VALIDÉ' | 'EXPIRÉ' | 'ANNULÉ';
}

export interface DevisFormData {
  dateCreation: string;
  dateEffet: string;
  dateExpiration: string;
  typeFractionnement: string;
  typeRenouvellement: string;
  statut?: 'EN_ATTENTE' | 'VALIDÉ' | 'EXPIRÉ' | 'ANNULÉ';
}

export interface ResultatDevis {
  montantPrimeNette: number;
  montantComission?: number;
  montantFrais?: number;
  montantTaxe?: number;
  montantPrimeTotal: number;
}


export interface NouveauDevisPayload {
  devis: DevisFormData;
  garanties: GarantieContratData[];
  profilVehicule: ProfilVehiculeData;
  pack: PackData;

}

export interface detailsDevisPayload {
  devis: Devis;
  garanties: GarantieContratData[];
  profilVehicule: ProfilVehiculeData;
  pack: PackData;
  resultat:ResultatDevis;

}

// Nouveau type pour la réponse de création de contrat à partir de devis
export interface ContratFromDevisResponse {
  success: boolean;
  numeroContrat: string;
  dateCreationContrat: string;
}

// Nouveau type pour les paramètres de création
export interface CreateContratFromDevisParams {
  id_devis: number;
  data: {
    contrat: Omit<ContratFormData, 'dateEffet' | 'dateExpiration' | 'fractionnement'> & {
      // Ces champs sont déjà dans le devis
      dateEffet?: string;
      dateExpiration?: string;
      fractionnement?: string;
    };
    garanties?: GarantieContratData[]; // Optionnel car déjà dans le devis
    profilVehicule?: ProfilVehiculeData; // Optionnel car déjà dans le devis
    pack: Omit<PackData, 'id_devis'> & {
      id_devis: number; // Obligatoire
      numeroContrat?: string; // Généré côté serveur
    };
  };
}

export type StrictContratFormData = {
  [K in keyof ContratFormData]-?: ContratFormData[K];
};

export interface ContratCreationPayload {
  id_devis: number;
  contrat: StrictContratFormData;
  garanties: GarantieContratData[];
  profilVehicule: ProfilVehiculeData;
  pack: PackData;
}