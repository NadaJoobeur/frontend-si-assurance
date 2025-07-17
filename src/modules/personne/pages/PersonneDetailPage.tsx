import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Stack,
  Divider,
  useDisclosure,
  IconButton,
  SimpleGrid,
  Tag,
  TagLabel,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Spinner,
  HStack,
  VStack,
 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, EditIcon, DeleteIcon,} from '@chakra-ui/icons';
import { FaMapMarkerAlt, FaHashtag, FaRoad, FaEnvelopeOpenText, FaPhoneAlt,  FaMobileAlt, FaEnvelope } from 'react-icons/fa';

import { useContratsClient } from '../hooks/useContratsClient';

import { useDetailPersonne } from '../hooks/usePersonne';
import { useDeletePersonne } from '../hooks/useDeletePersonne';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';

const PersonneDetailPage = () => {
  const { numeroIdentification } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: personneData, isLoading } = useDetailPersonne(numeroIdentification!);
console.log(personneData)
  // Couleurs du thème
  const cardBg = useColorModeValue('white', 'gray.700');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
const bgBx=useColorModeValue('white', 'gray.700')
  // Handlers
  const handleEdit = () => navigate(`/person/edit/${numeroIdentification}`);
  const { contrats, loading: loadingContrats } = useContratsClient(numeroIdentification!);

  const { mutate: deletePersonne } = useDeletePersonne();
  const handleDelete = () => {
    setIsDeleting(true);
    if (numeroIdentification) {
      deletePersonne({ numeroIdentification });
      toast({
        title: 'Succès',
        description: 'Personne supprimée.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate(`/person/list`);
    } else {
      toast({
        title: 'Erreur',
        description: 'Identifiant invalide.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (!personneData) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Personne non trouvée</Text>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" ml={{ base: 0, md: 60 }}>
        {/* Contenu principal */}
        <Box flex="1" p={{ base: 4, md: 8 }} w="full" maxW="none" mx="auto">
       

          {/* Carte principale */}
          <Box 
            bg={cardBg} 
            borderRadius="lg" 
            boxShadow="md" 
            p={{ base: 2, md: 4 }}
            mb={2}
            w="full"
            minH="70vh"
          >
               {/* Header avec bouton retour */}
          <Flex align="center" mb={2} gap={2}>
            <IconButton
              aria-label="Retour"
              icon={<ChevronLeftIcon />}
              onClick={() => navigate(-1)}
            />
            <Heading size="lg" flex={1}>
              {personneData.nom} {personneData.prenom}
            </Heading>
            
            <Badge
              colorScheme={personneData.blackList ? 'red' : 'green'}
              px={2}
              py={1}
              borderRadius="full"
              fontSize="md"
            >
              {personneData.blackList ? 'Blacklisté' : 'Non blacklisté'}
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
              onClick={handleEdit}
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
            {/* Informations principales */}
            <SimpleGrid columns={{ base: 1, md: 4, lg: 4 }} spacing={1} mb={3}>
              <InfoItem label="Identifiant" value={numeroIdentification} />
              <InfoItem label="Raison Sociale" value={personneData.raisonSociale} />
              <InfoItem label="Activité" value={personneData.activite} />
              <InfoItem label="Date de Naissance" value={personneData.dateDeNaissance} />
            </SimpleGrid>

            <Divider borderColor={dividerColor} my={5} borderWidth="2px" />

            {/* Onglets Adresses / Téléphones / Emails */}
            <Tabs variant="enclosed" colorScheme="blue" size="lg">
             <TabList>
                <Tab fontSize="md">Adresses</Tab>
                <Tab fontSize="md">Téléphones</Tab>
                <Tab fontSize="md">Emails</Tab>
                <Tab fontSize="md">Contrats</Tab>
            </TabList>

              <TabPanels mt={2}>
                {/* Adresses */}
                <TabPanel>
                 {(personneData.listeAdresse || []).length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1}>
                     {(personneData.listeAdresse || []).map((adresse, idx) => (
                            <Box
                key={idx}
                p={5}
                borderWidth="1.5px"
                borderRadius="md"
                borderColor="gray.300"
                boxShadow="sm"
                _hover={{ boxShadow: 'md', transform: 'scale(1.03)', transition: 'all 0.3s ease' }}
                bg={bgBx}
              >
                <Flex justify="space-between" align="center" mb={3}>
                  <Flex align="center" gap={2}>
                    <FaMapMarkerAlt color="#3182ce" />
                    <Text fontSize="lg" fontWeight="semibold">
                      Adresse {idx + 1}
                    </Text>
                  </Flex>
                  {adresse.contactParDefaut && (
                    <Tag colorScheme="blue" size="sm" fontWeight="semibold">
                      Par défaut
                    </Tag>
                  )}
                </Flex>

                <Stack spacing={3} pl={1}>
                  <InfoItem1
                    label="Numéro Rue"
                    value={adresse.numRue}
                    icon={<FaHashtag color="#3182ce" />}
                  />
                  <InfoItem1
                    label="Nom Rue"
                    value={adresse.nomRue}
                    icon={<FaRoad color="#3182ce" />}
                  />
                  <InfoItem1
                    label="Code Postal"
                    value={adresse.codePostal}
                    icon={<FaEnvelopeOpenText color="#3182ce" />}
                  />
                </Stack>
              </Box>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Text fontSize="lg" color="gray.500" mt={4}>
                      Aucune adresse enregistrée
                    </Text>
                  )}
                </TabPanel>

                {/* Téléphones */}
                <TabPanel>
                  {(personneData.listeTelephone || []).length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1}>
                      {(personneData.listeTelephone || []).map((tel, idx) => (
                                      <Box
                    key={idx}
                    p={5}
                    borderWidth="1.5px"
                    borderRadius="md"
                    borderColor="gray.300"
                    boxShadow="sm"
                    _hover={{ boxShadow: 'md', transform: 'scale(1.03)', transition: 'all 0.3s ease' }}
                    bg={bgBx}
                  >
                    <Flex justify="space-between" align="center" mb={3}>
                      <Flex align="center" gap={2}>
                        <FaPhoneAlt color="#3182ce" />
                        <Text fontSize="lg" fontWeight="semibold">
                          Téléphone {idx + 1}
                        </Text>
                      </Flex>
                      {tel.contactParDefaut && (
                        <Tag colorScheme="blue" size="sm" fontWeight="semibold">
                          Par défaut
                        </Tag>
                      )}
                    </Flex>

                    <Stack spacing={3} pl={1}>
                                        <InfoItem1
                      label="Téléphone"
                      value={tel.numeroTelephone}
                      icon={<FaMobileAlt color="#3182ce" />}
                    />
                      <InfoItem1
                        label="Type"
                        value={tel.typeTelephone}
                        icon={<FaMobileAlt color="#3182ce" />}
                      />
                    </Stack>
                  </Box>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Text fontSize="lg" color="gray.500" mt={4}>
                      Aucun téléphone enregistré
                    </Text>
                  )}
                </TabPanel>

                {/* Emails */}
                <TabPanel>
                 {(personneData.listeMails || []).length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1}>
                    {(personneData.listeMails || []).map((mail, idx) => (
                    <Box
                      key={idx}
                      p={4}
                      borderWidth="2px"
                      borderRadius="lg"
                      borderColor={dividerColor}
                      _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                    >
                      <Flex justify="space-between" mb={2} alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">
                          Email {idx + 1}
                        </Text>
                        {mail.contactParDefaut && (
                          <Tag colorScheme="blue" size="md">
                            <TagLabel>Par défaut</TagLabel>
                          </Tag>
                        )}
                      </Flex>
                      <Stack spacing={3}>
                        <InfoItem1 
                          label="Adresse mail" 
                          value={mail.adresseMail} 
                          icon={<FaEnvelope color="#3182ce" />} 
                        />
                      </Stack>
                    </Box>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Text fontSize="lg" color="gray.500" mt={4}>
                      Aucun email enregistré
                    </Text>
                  )}
                </TabPanel>
               <TabPanel>
  {loadingContrats ? (
    <Flex justify="center" py={10}>
      <Spinner size="xl" />
    </Flex>
  ) : contrats.length > 0 ? (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {contrats.map((contrat) => (
        <Link 
          key={contrat.numeroContrat}
          to={`/contrat/detail/${contrat.numeroContrat}`}
          style={{ textDecoration: 'none' }}
        >
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            _hover={{ 
              boxShadow: 'lg',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease'
            }}
            cursor="pointer"
          >
            <Flex justify="space-between" mb={2}>
              <Heading size="md">{contrat.numeroContrat}</Heading>
              <Badge colorScheme={contrat.statutContrat === 'ACTIF' ? 'green' : 'red'}>
                {contrat.statutContrat}
              </Badge>
            </Flex>
            
            <Stack spacing={2}>
              <InfoItem label="Branche" value={contrat.branche} />
              <InfoItem label="Prime Annuelle" value={contrat.primeAnnuelle} />
              <InfoItem label="Date Effet" value={contrat.dateEffet} />
              <InfoItem label="Date Expiration" value={contrat.dateExpiration} />
            </Stack>
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  ) : (
    <Text fontSize="lg" color="gray.500" mt={4}>
      Aucun contrat trouvé
    </Text>
  )} 
</TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>

        {/* Footer */}
        <Box borderTop="2px solid" borderColor={borderColor}>
          <Footer />
        </Box>

        {/* Modal de confirmation de suppression */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent rounded="2xl" boxShadow="xl">
            <ModalHeader>Confirmer la suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg">
                Êtes-vous sûr de vouloir supprimer{' '}
                <Box as="span" fontWeight="bold">
                  {personneData.nom} {personneData.prenom}
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

// Composant InfoItem réutilisable
const InfoItem = ({ label, value }: { label: string; value?: string | number | boolean | null }) => (
  <Box mb={4}>
    <Text fontSize="md" color="gray.500" mb={2}>
      {label}
    </Text>
    <Text fontSize="lg" fontWeight="medium">
      {value?.toString() ?? '-'}
    </Text>
  </Box>
);
const InfoItem1 = ({ label, value, icon }: { label: string; value: string | number|null|undefined; icon?: React.ReactElement }) => (
  <HStack spacing={3} p={3} bg="gray.50" borderRadius="md" boxShadow="sm" minW="200px">
    {icon && <Box color="blue.500">{icon}</Box>}
    <VStack spacing={0} align="start">
      <Text fontWeight="semibold" fontSize="sm" color="gray.600">{label}</Text>
      <Text fontSize="md" fontWeight="medium" color="gray.800">{value || 'N/A'}</Text>
    </VStack>
  </HStack>
)
export default PersonneDetailPage;