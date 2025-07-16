import axiosClient from "../../../shared/api/axiosClient";
import type { ApiResponse } from "../../contrat/types/ApiResponses";
import type { Sinistre, SinistreFormData } from "../types/Sinistre";


export const createSinistre = (data: SinistreFormData) => {
  return axiosClient.post('/sinistres/addSinistre', data);
};

export const getSinistres = async (): Promise<Sinistre[]> => {
  const { data } = await axiosClient.get(`/sinistres/listSinistres`);
  return data;
}

export const DeleteSinistre = async (numeroSinistre: string): Promise<void> => {
   await axiosClient.delete(`/sinistres/DeleteSinistre/${numeroSinistre}`)
}
export const getDetailSinistre = async (numeroSinistre: string): Promise<ApiResponse<Sinistre>> => {
  const response = await axiosClient.get(`/sinistres/${numeroSinistre}/details`);
  console.log('Réponse API:', response);
  return response.data; 
};

export const updateSinistre = async (
 numeroSinistre: string,
  data: Partial<Omit<Sinistre, 'id'>>
): Promise<boolean> => {
  const res = await axiosClient.patch(`sinistres/UpdateSinistre/${numeroSinistre}`, data)
  return res.data
}