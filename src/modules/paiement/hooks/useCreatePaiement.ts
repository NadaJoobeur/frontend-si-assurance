import { useMutation } from '@tanstack/react-query';
import { createPaiement } from '../api/paiementApi';
import type { NouveauPaiementPayload } from '../types/paiementTypes';

export const useCreatePaiement = () => {
  return useMutation({
    mutationFn: (newPaiement: NouveauPaiementPayload) =>
      createPaiement(newPaiement),
  });
};
