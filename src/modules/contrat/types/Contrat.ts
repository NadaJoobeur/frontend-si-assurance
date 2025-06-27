export interface ContratFormData {
  numeroContrat: string;
  branche: string;
  codeBranche: string;
  offreCommerciale: string;
  codeOffreCommerciale: string;
  immatriculation: string;
  statutContrat: string;
  primeAnnuelle: string;
  echeanceContractuelle: string;
  codeAgence: string;
  libelleAgence: string;
  dateExpiration: string;
  dateEffet: string;
  fractionnement: string;
  nature: string;
  indicateurSouscripteur: boolean;
  indicateurAssure: boolean;
  numeroIdentification: string; // Clé d'identification du client
}

export interface GarantieContratData {
  libelleGarantie: string;
  codeGarantie: string;
  capitalAssure?: string;
  franchise?: string;
  rangAffichage?: number;
}

export interface ProfilVehiculeData {
  numeroImmatriculation?: string;
  ChargeUtile?: string;
  poidsTotalEnCharge?: string;
  nombreDePlaces?: string;
  datePremiereMise?: string;
  typeVehicule?: string;
  natureVehicule?: string;
  valeurVenale?: string;
  dateObtentionPermis?: string;
  numeroSerie?: string;
  bonusMalus?: string;
  indicSouscObligatoire?: string;
  marque?: string;
  constructeur?: string;
  puissanceFiscale?: string;
  valeurCatalogue?: string;
}


export interface NouveauContratPayload {
  contrat: ContratFormData;
  garanties: GarantieContratData[];
  profilVehicule: ProfilVehiculeData;

}

