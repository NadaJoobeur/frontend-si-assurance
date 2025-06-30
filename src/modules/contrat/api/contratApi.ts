import type { NouveauContratPayload,ContratFormData } from '../types/Contrat';
import axiosClient from '../../../shared/api/axiosClient'
import type { ApiResponse } from '../types/ApiResponses';

export const createContrat = (data: NouveauContratPayload) => {
  return axiosClient.post('/contrats/addContrat', data);
};

export const getContrat = async (ownerId: string): Promise<ContratFormData []> => {
  const { data } = await axiosClient.get(`/contrats/listContrat/${ownerId}`)
  return data
}

export const DeleteContrat = async (numeroContrat: string): Promise<void> => {
   await axiosClient.delete(`/contrats/DeleteContrat/${numeroContrat}`)

}

export const updateContrat = async (
 numeroContrat: string,
  data: Partial<Omit<NouveauContratPayload, 'id'>>
): Promise<boolean> => {
  const res = await axiosClient.patch(`contrats/UpdateContrat/${numeroContrat}`, data)
  return res.data
}

export const getDetailContrat = async (numeroContrat: string): Promise<ApiResponse<NouveauContratPayload>> => {
  console.log('Requête détail contrat pour:', numeroContrat);
  const response = await axiosClient.get(`/contrats/${numeroContrat}/details`);
  console.log('Réponse API:', response.data);
  return response.data; // ici response.data devrait contenir { success: true, data: {...} }
};