export interface ListeQuittance {
  numeroContrat: string;
  numeroQuittance: string;
  codeBranche: string;
  codeProduit: string;
  identifionClient: string;
  nomClient: string;
  primeTotal: number;
}

export interface Paiement {
  id: number;
  codeAgence: string;
  transactionDate: string; // ISO date string
  orderId: string;
  orderNumber: string;
  cardholderName: string;
  depositAmount: number;
  currency: string;
  listeQuittances: ListeQuittance[];
}

export interface ListeQuittancePayload {
  numeroContrat: string;
  numeroQuittance: string;
}

export interface NouveauPaiementPayload {
  codeAgence: string;
  transactionDate: string;
  orderId: string;
  orderNumber: string;
  cardholderName: string;
  depositAmount: number;
  currency: string;
  listeQuittances: ListeQuittancePayload[];
}