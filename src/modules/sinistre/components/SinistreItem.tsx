import React from 'react';
import { 
  Box, 
  Text, 
  Badge, 
  HStack, 
  IconButton, 
  Spacer, 
  useDisclosure, 
  AlertDialog, 
  AlertDialogOverlay, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogBody, 
  AlertDialogFooter, 
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import type { Sinistre } from '../types/Sinistre';

type Props = {
  sinistreData: Sinistre;
  onClick?: () => void;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string) => void;
};

const SinistreItem = ({ sinistreData, onClick, onDelete, onEdit }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Style hover unifié et subtil
  const hoverStyle = {
    bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.100'),
    transition: 'background-color 0.2s ease'
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  const confirmDelete = async () => {
    if (onDelete) {
      await onDelete(sinistreData.numeroSinistre);
    }
    onClose();
  };

  // Fonction pour obtenir le badge en fonction du statut
  const getStatusBadge = (statut: Sinistre['statut']) => {
    switch (statut) {
      case 'VALIDÉ':
        return { color: 'green', text: 'Validé' };
      case 'OUVERT':
        return { color: 'blue', text: 'Ouvert' };
      case 'EN_COURS':
        return { color: 'yellow', text: 'En cours' };
      case 'ANNULÉ':
        return { color: 'red', text: 'Annulé' };
      case 'RÉGLÉ':
        return { color: 'purple', text: 'Réglé' };
      default:
        return { color: 'gray', text: 'Inconnu' };
    }
  };

  const status = getStatusBadge(sinistreData.statut);

  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        shadow="sm"
        cursor={onClick ? 'pointer' : 'default'}
        _hover={onClick ? hoverStyle : {}}
        onClick={onClick}
        display="flex"
        alignItems="center"
      >
        <Box flex="1">
          <Text fontWeight="bold" fontSize="lg">
            #{sinistreData.numeroSinistre}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Contrat: {sinistreData.numeroContrat}
          </Text>
         
          <HStack mt={2} spacing={2}>
            <Badge colorScheme={status.color}>
              {status.text}
            </Badge>
            <Badge colorScheme="orange">
              {sinistreData.OptionReparation}
            </Badge>
            <Text fontSize="sm">
              {new Date(sinistreData.dateSinistre).toLocaleDateString()}
            </Text>
          </HStack>
        </Box>

        <Spacer />

        <HStack spacing={2}>
          <IconButton
            aria-label="Modifier"
            icon={<FaEdit />}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit(sinistreData.numeroSinistre);
            }}
          />
          
          <IconButton
            aria-label="Supprimer"
            icon={<FaTrash />}
            size="sm"
            colorScheme="red"
            onClick={handleDeleteClick}
          />
        </HStack>
      </Box>

      {/* Boîte de dialogue de confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer le sinistre
            </AlertDialogHeader>

            <AlertDialogBody>
              Êtes-vous sûr de vouloir supprimer le sinistre {sinistreData.numeroSinistre} ?
              Cette action est irréversible.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button 
                colorScheme="red" 
                onClick={confirmDelete} 
                ml={3}
                isDisabled={sinistreData.statut !== 'OUVERT'}
              >
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default SinistreItem;