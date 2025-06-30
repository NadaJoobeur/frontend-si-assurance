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
  useToast,Modal,
  Divider,
  VStack
} from '@chakra-ui/react';
import { ChevronLeftIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useAgenceDetail } from '../hooks/useAgenceDetail';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import { useDeleteAgence } from '../hooks/useDeleteAgence';

const AgenceDetailPage = () => {
  const { code_agence } = useParams<{ code_agence: string }>();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: deleteAgence } = useDeleteAgence();
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
const bgcolor= useColorModeValue('gray.200', 'gray.600')
  const { data: agenceData, isLoading, isError, error } = useAgenceDetail(code_agence || '');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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

  const agence = agenceData;

  if (!agence) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Agence non trouvée</Text>
      </Flex>
    );
  }

  const handleDelete = () => {
    setIsDeleting(true);
    if (code_agence) {
      deleteAgence(code_agence, {
        onSuccess: () => {
          toast({
            title: 'Succès',
            description: 'Agence supprimée avec succès',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          navigate('/agences/list');
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

  return (
    <Flex minH="100vh" _focus={{ outline: "none" }}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" ml={{ base: 0, md: 60 }}>
        <Box flex="1" p={{ base: 1, md: 8 }} w="full"  mx="auto">
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
              <Heading size="lg" flex={1}>Agence {agence.nom_agence}</Heading>
              <Badge
                colorScheme={agence.statut === 'active' ? 'green' : 'red'}
                px={2}
                py={1}
                borderRadius="full"
                fontSize="md"
              >
                {agence.statut === 'active' ? 'Active' : 'Inactive'}
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
                onClick={() => navigate(`/agences/edit/${agence.code_agence}`)}
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
        label="CODE AGENCE" 
        value={agence.code_agence}
        valueProps={{ fontFamily: 'monospace', fontWeight: 'bold' }}
      />
      <InfoItem 
        label="NOM" 
        value={agence.nom_agence}
        valueProps={{ fontSize: 'lg' }}
      />
      <InfoItem 
        label="VILLE" 
        value={agence.ville} 
      />
    </VStack>

    {/* Colonne 2 - Contact et statut */}
    <VStack spacing={4} align="stretch">
      <InfoItem 
        label="TÉLÉPHONE" 
        value={agence.telephone}
      />
      <InfoItem 
        label="EMAIL" 
        value={agence.email}
        valueProps={{ 
          as: 'a', 
          href: `mailto:${agence.email}`,
          color: 'blue.500',
          textDecoration: 'underline'
        }}
      />
      <InfoItem 
        label="STATUT" 
        value={
          <Badge 
            colorScheme={agence.statut === 'active' ? 'green' : 'orange'}
            variant="subtle"
            px={3}
            py={1}
            borderRadius="full"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            {agence.statut}
          </Badge>
        }
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
                Êtes-vous sûr de vouloir supprimer l'agence {' '}
                <Box as="span" fontWeight="bold">
                  {agence.nom_agence} ({agence.code_agence})
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


// Composant InfoItem moderne
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

export default AgenceDetailPage;