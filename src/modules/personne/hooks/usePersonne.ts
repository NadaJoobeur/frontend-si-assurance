import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { Personne } from '../types/personne';
import { getPersonneByNumeroIdentification } from '../api/personneAPI';

export const useDetailPersonne = (numeroIdentification?: string) => {
  const query = useQuery<Personne, AxiosError>({
    queryKey: ['personne', numeroIdentification],
    queryFn: () => getPersonneByNumeroIdentification(numeroIdentification!),
    enabled: !!numeroIdentification,
    staleTime: 60000,
  });

  useEffect(() => {
    if (query.data) {
      console.log(`Personne ${numeroIdentification} chargée ✅`, query.data);
    }
    if (query.error) {
      console.error(`Erreur chargement personne ${numeroIdentification} ❌`, query.error.response?.data || query.error.message);
    }
  }, [query.data, query.error, numeroIdentification]);

  return query;
};
