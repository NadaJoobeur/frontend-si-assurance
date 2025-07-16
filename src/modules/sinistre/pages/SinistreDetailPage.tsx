import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Flex,
  Badge,
  useDisclosure,
  IconButton,
  SimpleGrid,
  useColorModeValue,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Modal,
  Divider,
  VStack
} from '@chakra-ui/react';
import { ChevronLeftIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailSinistre } from '../hooks/useDetailSinistre';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import { useDeleteSinistre } from '../hooks/useDeleteSinistre';
import type { Sinistre } from '../types/Sinistre';

const SinistreDetailPage = () => {
  const { numeroSinistre } = useParams<{ numeroSinistre: string }>();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: deleteSinistre } = useDeleteSinistre();
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  const bgcolor = useColorModeValue('gray.200', 'gray.600');
  
  const { data: sinistreResponse, isLoading, isError, error } = useDetailSinistre(numeroSinistre || '');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const sinistre = sinistreResponse?.data;
  console.log(sinistre)
  console.log(sinistreResponse)
  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text color="red.500">Erreur: {error?.message}</Text>
      </Flex>
    );
  }

  if (!sinistre) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Sinistre non trouvé</Text>
      </Flex>
    );
  }

  const handleDelete = () => {
    setIsDeleting(true);
    if (sinistre.id) {
      deleteSinistre(sinistre.numeroSinistre , {
        onSuccess: () => {
        
          navigate('/sinistre/list');
        },
        onError: () => {
          toast({
            title: 'Erreur',
            description: 'Échec de la suppression',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
          setIsDeleting(false);
        }
      });
    }
  };

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

  const status = getStatusBadge(sinistre.statut);

  return (
    <Flex minH="100vh" _focus={{ outline: "none" }}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" ml={{ base: 0, md: 60 }}>
        <Box flex="1" p={{ base: 1, md: 8 }} w="full" mx="auto">
          <Box 
            bg={cardBg} 
            borderRadius="lg" 
            boxShadow="md" 
            p={{ base: 2, md: 4 }}
            mb={2}
            w="full"
            minH="70vh"
          >
            <Flex align="center" mb={2} gap={2}>
              <IconButton
                aria-label="Retour"
                icon={<ChevronLeftIcon />}
                onClick={() => navigate(-1)}
              />
              <Heading size="lg" flex={1}>Sinistre {sinistre.numeroSinistre}</Heading>
              <Badge
                colorScheme={status.color}
                px={2}
                py={1}
                borderRadius="full"
                fontSize="md"
              >
                {status.text}
              </Badge>
              <IconButton
                aria-label="Modifier"
                colorScheme="teal"
                variant="solid"
                size="md"
                boxShadow="md"
                _hover={{ bg: 'teal.600', transform: 'translateY(-2px)' }}
                _active={{ bg: 'teal.700' }}
                icon={<EditIcon />}
                onClick={() => navigate(`/sinistre/edit/${sinistre.numeroSinistre}`)}
              />
              <IconButton
                aria-label="Supprimer"
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="solid"
                onClick={onOpen}
                size="md"
                boxShadow="md"
                _hover={{ bg: 'red.600' }}
                isDisabled={sinistre.statut !== 'OUVERT'}
              />
            </Flex>
            <Divider borderColor={dividerColor} my={5} borderWidth="2px" /> 
            
            <Box 
              borderWidth="1px"
              borderRadius="lg"
              p={6}
              mb={6}
              borderColor={bgcolor}
            >
              <SimpleGrid 
                columns={{ base: 1, md: 2 }} 
                spacing={6}
              >
                {/* Colonne 1 - Informations principales */}
                <VStack spacing={4} align="stretch">
                  <InfoItem 
                    label="NUMÉRO SINISTRE" 
                    value={sinistre.numeroSinistre}
                    valueProps={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                  />
                  <InfoItem 
                    label="CONTRAT" 
                    value={sinistre.numeroContrat}
                    valueProps={{ fontSize: 'lg' }}
                  />
                  <InfoItem 
                    label="DATE SINISTRE" 
                    value={new Date(sinistre.dateSinistre).toLocaleDateString()} 
                  />
                  <InfoItem 
                    label="IMMATRICULATION" 
                    value={sinistre.numeroImmatriculation || '-'} 
                  />
                  <InfoItem 
                    label="LIEU" 
                    value={sinistre.lieuSinistre || '-'} 
                  />
                </VStack>

                {/* Colonne 2 - Détails supplémentaires */}
                <VStack spacing={4} align="stretch">
                  <InfoItem 
                    label="OPTION RÉPARATION" 
                    value={sinistre.OptionReparation}
                  />
                  <InfoItem 
                    label="CONDUCTEUR" 
                    value={sinistre.conducteur || '-'}
                  />
                  <InfoItem 
                    label="TYPE CONDUCTEUR" 
                    value={sinistre.typeConducteur || '-'}
                  />
                  <InfoItem 
                    label="MOTIF REJET" 
                    value={sinistre.motifRejet || '-'}
                  />
                  <InfoItem 
                    label="IDENTIFIANT" 
                    value={sinistre.identifiantPrincipal}
                    valueProps={{ 
                      fontFamily: 'monospace',
                      color: 'blue.500'
                    }}
                  />
                </VStack>
              </SimpleGrid>
            </Box>
          </Box>
        </Box>

        <Box borderTop="2px solid" borderColor={borderColor}>
          <Footer />
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent rounded="2xl" boxShadow="xl">
            <ModalHeader>Confirmer la suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg">
                Êtes-vous sûr de vouloir supprimer le sinistre {' '}
                <Box as="span" fontWeight="bold">
                  {sinistre.numeroSinistre}
                </Box>
                ? Cette action est irréversible.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isDeleting}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={handleDelete} isLoading={isDeleting}>
                Supprimer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

const InfoItem = ({ 
  label, 
  value,
  valueProps = {}
}: { 
  label: string; 
  value: React.ReactNode;
  valueProps?: Record<string, unknown>
}) => (
  <Box>
    <Text 
      fontSize="xs" 
      color="gray.500"
      letterSpacing="wider"
      textTransform="uppercase"
      mb={1}
    >
      {label}
    </Text>
    <Text
      fontSize="md"
      {...valueProps}
    >
      {value || '-'}
    </Text>
  </Box>
);

export default SinistreDetailPage;