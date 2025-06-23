import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { checkPersonExist } from '../api/personneAPI';

export const useCheckPersonExist = (numeroIdentification?: string) => {
  const enabled = !!numeroIdentification;

  const query = useQuery<boolean, AxiosError>({
    queryKey: ['personne-exist', numeroIdentification],
    queryFn: () => checkPersonExist(numeroIdentification!),
    enabled,
    staleTime: 60000,
  });

  useEffect(() => {
    if (query.data !== undefined) {
      console.log('Vérification existence:', query.data);
    }
    if (query.error) {
      console.error('Erreur vérification existence:', query.error.response?.data || query.error.message);
    }
  }, [query.data, query.error, numeroIdentification]);

  return query;
};
