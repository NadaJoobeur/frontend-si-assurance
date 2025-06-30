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
  Button 
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import type { AgenceBase } from '../types/Agence';

type Props = {
  agenceData: AgenceBase;
  onClick?: () => void;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string) => void;
};

const AgenceItem = ({ agenceData, onClick, onDelete, onEdit }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  const confirmDelete = async () => {
    if (onDelete) {
      await onDelete(agenceData.code_agence);
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
            {agenceData.code_agence} — {agenceData.nom_agence}
          </Text>
          <HStack mt={1} spacing={2}>
            <Badge colorScheme={agenceData.statut === 'active' ? 'green' : 'red'}>
              {agenceData.statut === 'active' ? 'Active' : 'Inactive'}
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
              if (onEdit) onEdit(agenceData.code_agence);
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
              Supprimer l'agence
            </AlertDialogHeader>

            <AlertDialogBody>
              Êtes-vous sûr de vouloir supprimer l'agence {agenceData.nom_agence} ({agenceData.code_agence}) ?
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

export default AgenceItem;