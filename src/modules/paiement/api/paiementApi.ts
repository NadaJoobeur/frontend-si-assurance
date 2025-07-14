import api from "../../../shared/api/axiosClient";
import axios from 'axios';
import type { NouveauPaiementPayload } from '../types/paiementTypes';

export const getPaiements = async () => {
  const response = await api.get("/paiements");
  return response.data;
};


export const createPaiement = async (payload: NouveauPaiementPayload) => {
  const res = await axios.post('/paiements', payload);
  return res.data;
};

