import { useMutation } from '@tanstack/react-query';
import { createDevis } from '../api/devisApi';
import type { NouveauDevisPayload } from '../types/Devis';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const useCreateDevis = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: NouveauDevisPayload) =>createDevis(data),
    onSuccess: () => {
      toast({
        title: 'Devis créé',
        description: 'Le devis a été créé avec succès',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Redirection après succès
      navigate('/devis/add');
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Échec de la création du devis: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};