
import type { NouveauContratPayload, GarantieContratData,ProfilVehiculeData } from '../types/Contrat';

export type ContratDetailResponse = {
  success: boolean;
  data: {
    contrat: NouveauContratPayload;
    garanties:  GarantieContratData[];
    profilsVehicule: ProfilVehiculeData [];
  };
};
