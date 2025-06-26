import React from 'react';
import { Box, Text, Badge, HStack, IconButton, Spacer, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import type { ContratFormData } from '../types/Contrat';

type Props = {
  contratData: ContratFormData;
  onClick?: () => void;
  onDelete?: (id: string) => Promise<void>; // Modifié pour accepter une Promise
  onEdit?: (id: string) => void;
};

const ContratItem = ({ contratData, onClick, onDelete, onEdit }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  const confirmDelete = async () => {
    if (onDelete) {
      await onDelete(contratData.numeroContrat);
    }
    onClose();
  };
  

  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        shadow="sm"
        cursor={onClick ? 'pointer' : 'default'}
        _hover={onClick ? { bg: 'blue.50' } : {}}
        onClick={onClick}
        display="flex"
        alignItems="center"
      >
        <Box flex="1">
          <Text fontWeight="bold" fontSize="lg">
            #{contratData.numeroContrat} — {contratData.branche} {contratData.libelleAgence}
          </Text>
          <Badge colorScheme={contratData.statutContrat ? 'green' : 'red'}>
            {contratData.statutContrat ? 'Actif' : 'Non Actif'}
          </Badge>
        </Box>

        <Spacer />

        <HStack spacing={2}>
          <IconButton
            aria-label="Modifier"
            icon={<FaEdit />}
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              if (onEdit) onEdit(contratData.numeroContrat) // ⚠️ change ici
            }}/>

  
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
              Supprimer le contrat
            </AlertDialogHeader>

            <AlertDialogBody>
              Êtes-vous sûr de vouloir supprimer le contrat {contratData.numeroContrat} ?
              Cette action est irréversible.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ContratItem;