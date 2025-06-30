import { useQuery } from '@tanstack/react-query';
import { getAgences } from '../api/AgenceApi';
import type { AgenceFormData } from '../types/Agence';

export const useAgences = () => {
  return useQuery<AgenceFormData[], Error>({
    queryKey: ['agences'],
    queryFn: () => getAgences(),
  });
};
