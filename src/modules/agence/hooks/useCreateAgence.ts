import { useMutation } from '@tanstack/react-query';
import { createAgence  } from '../api/AgenceApi';
import type { Agence } from '../types/Agence';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const useCreateAgence = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Agence) =>  createAgence(data),
    onSuccess: () => {
      toast({
        title: 'Agence créé',
        description: "L'agence' a été créé avec succès",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Redirection après succès
      navigate('/agence/add');
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Échec de la création d'agence': ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};