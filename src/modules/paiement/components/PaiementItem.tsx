import React from 'react';
import {
  Box,
  Text,
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
import { FaTrash } from 'react-icons/fa';
import type { Paiement } from '../types/paiementTypes';

type Props = {
  paiementData: Paiement;
  onClick?: () => void;
  onDelete?: (id: number) => Promise<void>;
};

const PaiementItem = ({ paiementData, onClick, onDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Style hover unifié et subtil
  const hoverStyle = {
    bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.100'),
    transition: 'background-color 0.2s ease'
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  const confirmDelete = async () => {
    if (onDelete) {
      await onDelete(paiementData.id);
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
        _hover={onClick ? hoverStyle : {}}
        onClick={onClick}
        display="flex"
        alignItems="center"
      >
        <Box flex="1">
          <Text fontWeight="bold" fontSize="lg">
            Paiement ID: {paiementData.id}
          </Text>
          <Text fontSize="sm" mt={1}>
            Montant: {paiementData.depositAmount} {paiementData.currency}
          </Text>
        </Box>

        <Spacer />

        <HStack spacing={2}>
          <IconButton
            aria-label="Supprimer"
            icon={<FaTrash />}
            size="sm"
            colorScheme="red"
            onClick={handleDeleteClick}
          />
        </HStack>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer le paiement
            </AlertDialogHeader>

            <AlertDialogBody>
              Es-tu sûr de vouloir supprimer ce paiement ID: {paiementData.id} ?
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

export default PaiementItem;