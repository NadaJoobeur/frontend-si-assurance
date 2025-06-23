import axiosClient from '../../../shared/api/axiosClient'
import type { Personne } from '../types/personne'

// ownerId est obligatoire pour plusieurs routes, numeroIdentification correspond à l'id unique de la personne

export const getPersonnes = async (ownerId: string): Promise<Personne[]> => {
  const { data } = await axiosClient.get(`personnes/listPerson/${ownerId}`)
  return data
}

export const getPersonneByNumeroIdentification = async (numeroIdentification: string): Promise<Personne> => {
  const { data } = await axiosClient.get(`personnes/${numeroIdentification}/details`)
  return data
}

export const addPersonne = async (ownerId: string, personne: Omit<Personne, 'id'>): Promise<Personne> => {
  const { data } = await axiosClient.post(`personnes/addPerson/${ownerId}`, personne)
  return data
}

export const updatePersonne = async (
  numeroIdentification: string,
  data: Partial<Omit<Personne, 'id'>>
): Promise<boolean> => {
  const res = await axiosClient.patch(`personnes/${numeroIdentification}/modificationMoyenContact`, data)
  return res.data
}

export const deletePersonne = async (numeroIdentification: string): Promise<void> => {
  await axiosClient.delete(`personnes/deletePerson/${numeroIdentification}`)
}

export const checkBlacklist = async (id: string): Promise<boolean> => {
  const res = await axiosClient.get(`personnes/${id}/blackListee`)
  return res.data.blacklist
}

export const checkPersonExist = async (numeroIdentification: string): Promise<boolean> => {
  const { data } = await axiosClient.get(`personnes/${numeroIdentification}/existence-client`)
  return data
}
