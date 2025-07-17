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
import type { Devis } from '../types/Devis';

type Props = {
  devisData: Devis;
  onClick?: () => void;
  onDelete?: (id: number) => Promise<void>;
  onEdit?: (id: number) => void;
};

const DevisItem = ({ devisData, onClick, onDelete, onEdit }: Props) => {
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
      await onDelete(devisData.id);
    }
    onClose();
  };

  // Fonction pour obtenir le badge en fonction du statut
  const getStatusBadge = (statut: Devis['statut']) => {
    switch (statut) {
      case 'VALIDÉ':
        return { color: 'green', text: 'Validé' };
      case 'EN_ATTENTE':
        return { color: 'yellow', text: 'En attente' };
      case 'EXPIRÉ':
        return { color: 'red', text: 'Expiré' };
      case 'ANNULÉ':
        return { color: 'gray', text: 'Annulé' };
      default:
        return { color: 'gray', text: 'Inconnu' };
    }
  };

  const status = getStatusBadge(devisData.statut);

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
            Devis #{devisData.id}
          </Text>
         
          <HStack mt={2} spacing={2}>
            <Badge colorScheme={status.color}>
              {status.text}
            </Badge>
            <Badge colorScheme="blue">
              {devisData.typeFractionnement}
            </Badge>
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
              if (onEdit) onEdit(devisData.id);
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
              Supprimer le devis
            </AlertDialogHeader>

            <AlertDialogBody>
              Êtes-vous sûr de vouloir supprimer le devis #{devisData.id} ?
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
                isDisabled={devisData.statut !== 'EN_ATTENTE'}
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

export default DevisItem;