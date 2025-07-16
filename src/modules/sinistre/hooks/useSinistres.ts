// src/hooks/useSinistres.ts
import { useQuery } from '@tanstack/react-query';
import { getSinistres } from '../api/SinistreApi';
import type { Sinistre } from '../types/Sinistre'; // Importez Sinistre, pas SinistreFormData

export const useSinistres = () => {
  return useQuery<Sinistre[], Error>({
    queryKey: ['sinistres'],
    queryFn: getSinistres,
  });
};