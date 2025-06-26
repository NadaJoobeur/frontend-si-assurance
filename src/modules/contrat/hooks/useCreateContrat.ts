import { useMutation } from '@tanstack/react-query';
import { createContrat } from '../api/contratApi';
import type { NouveauContratPayload } from '../types/Contrat';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const useCreateContrat = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: NouveauContratPayload) => createContrat(data),
    onSuccess: () => {
      toast({
        title: 'Contrat créé',
        description: 'Le contrat a été créé avec succès',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Redirection après succès
      navigate('/contrat/add');
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Échec de la création du contrat: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};