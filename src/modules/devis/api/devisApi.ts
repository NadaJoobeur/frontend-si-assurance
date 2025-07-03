import axiosClient from '../../../shared/api/axiosClient'
import type { ApiResponse } from '../../contrat/types/ApiResponses';
import type { NouveauContratPayload } from '../../contrat/types/Contrat';
import type { detailsDevisPayload, Devis, NouveauDevisPayload } from '../types/Devis';

export const createDevis = (data: NouveauDevisPayload) => {
  return axiosClient.post('/devis/addDevis', data);
};
export const getDevis = async (): Promise<Devis []> => {
  const { data } = await axiosClient.get(`/devis/listDevis`)
  return data
}


export const DeleteDevis = async (id_devis: number): Promise<void> => {
   await axiosClient.delete(`/devis/DeleteDevis/${id_devis}`)

}
export const getDetailDevis = async (id_devis: number): Promise<ApiResponse<detailsDevisPayload>> => {
  const response = await axiosClient.get(`/devis/${id_devis}/details`);
  console.log('Réponse API:', response.data);
  return response.data; // ici response.data devrait contenir { success: true, data: {...} }
};
export const updateDevis = async (
 id_devis: number,
  data: Partial<Omit<NouveauDevisPayload, 'id'>>
): Promise<boolean> => {
  const res = await axiosClient.patch(`devis/UpdateDevis/${id_devis}`, data)

  return res.data
}

export const ContratFromDevis = async (
 id_devis :number,
  data: Partial<Omit<NouveauContratPayload, 'id'>>
): Promise<boolean> => {
    console.log(data)
  const res = await axiosClient.patch(`devis/contratFromDevis/${ id_devis }`, data)
  return res.data
}
