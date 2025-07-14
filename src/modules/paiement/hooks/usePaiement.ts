import { useQuery } from "@tanstack/react-query";
import { getPaiements } from "../api/paiementApi";
import type { Paiement } from '../types/paiementTypes';


export const usePaiements = () => {
  return useQuery<Paiement[], Error>({
    queryKey: ['paiements'],
    queryFn: getPaiements,
  });
};
