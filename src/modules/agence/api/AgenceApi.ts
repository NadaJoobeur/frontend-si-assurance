import type { Agence } from '../types/Agence';
import axiosClient from '../../../shared/api/axiosClient'
import type { ApiResponse } from '../../contrat/types/ApiResponses';

export const createAgence = (data:  Agence) => {
  return axiosClient.post('/agences/addAgence', data);
};
export const getAgences = async (): Promise<Agence []> => {
  const { data } = await axiosClient.get(`/agences/listAgence`)
  return data
}

export const deleteAgence = async (code_agence: string): Promise<void> => {
   await axiosClient.delete(`/agences/DeleteAgence/${code_agence}`)

}

export const updateAgence = async (
 code_agence: string,
  data: Partial<Omit<Agence, 'id'>>
): Promise<boolean> => {
  const res = await axiosClient.patch(`agences/UpdateAgence/${ code_agence}`, data)
  return res.data
}

export const getDetailAgence = async (code_agence: string): Promise<ApiResponse<Agence>> => {
  const response = await axiosClient.get(`/agences/${code_agence}/details`);
  return response.data; 
};