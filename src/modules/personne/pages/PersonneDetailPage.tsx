import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  Divider,
  Spinner,
  IconButton,
  useColorModeValue,
  SimpleGrid
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

import { useDetailPersonne } from '../hooks/usePersonne';
import { useDeletePersonne } from '../hooks/useDeletePersonne';
import Navbar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';

const PersonneDetailPage = () => {
  // Hooks et état
  const { numeroIdentification } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, isLoading } = useDetailPersonne(numeroIdentification!);

  // Couleurs du thème
  const theme = {
    borderColor: useColorModeValue('blue.500', 'blue.300'),
    textColor: useColorModeValue('gray.800', 'gray.100'),
    cardBg: useColorModeValue('white', 'gray.800'),
    pageBg: useColorModeValue('gray.50', 'gray.900'),
    dividerColor: useColorModeValue('blue.300', 'blue.600')
  };

  // Handlers
  const handleEdit = () => navigate(`/person/edit/${numeroIdentification}`);
  
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

  // Composants réutilisables
  const InfoBox = ({ label, value }: { label: string; value?: string | number | boolean }) => (
    <Box
      p={5}
      rounded="xl"
      border="1px solid"
      borderColor={theme.borderColor}
      _hover={{ 
        borderColor: useColorModeValue('blue.600', 'blue.400'), 
        transform: 'scale(1.02)', 
        transition: 'all 0.3s ease' 
      }}
      userSelect="none"
      height="90%"
    >
      <Text fontWeight="bold" >
        {label}: <Text as="span" fontWeight="normal">{value?.toString() || '-'}</Text>
      </Text>
    </Box>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <>
      <Divider borderColor={theme.dividerColor} />
      <Heading size="md" mb={1} textTransform="uppercase" letterSpacing="wider" color={theme.borderColor}>
        {title}
      </Heading>
    </>
  );

  const ContactItem = ({ children }: { children: React.ReactNode }) => (
    <Box
      p={2}
      mb={1}
      rounded="md"
      border="1px solid"
      borderColor={theme.borderColor}
      _hover={{ 
        borderColor: useColorModeValue('blue.600', 'blue.400'), 
        transform: 'scale(1.02)', 
        transition: 'all 0.25s ease' 
      }}
    >
      {children}
    </Box>
  );

  // Rendu principal
  return (
    <Box minH="100vh" bg={theme.pageBg} display="flex" flexDirection="column">
      <Navbar />

      <Flex flex="1" justify="center" align="center" py={{ base: 10, md: 16 }} px={4}>
        <Box
          maxW="container.md"
          w="full"
          border="2px solid"
          borderColor={theme.borderColor}
          rounded="3xl"
          p={{ base: 8, md: 10 }}
          boxShadow="lg"
          bg={theme.cardBg}
          color={theme.textColor}
        >
          {isLoading ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" thickness="4px" color={theme.textColor} />
            </Flex>
          ) : data ? (
            <>
              {/* En-tête avec nom et actions */}
              <Flex justify="space-between" align="center" mb={8} flexWrap="wrap" gap={4}>
                <Heading
                  fontSize={{ base: '3xl', md: '5xl' }}
                  fontWeight="extrabold"
                  flex="1"
                  minW={{ base: '100%', md: 'auto' }}
                  textShadow="0 2px 8px rgba(0,0,0,0.1)"
                  color={theme.textColor}
                >
                  {data.nom} {data.prenom}
                </Heading>

                <Box
                  display="flex"
                  alignItems="center"
                  px={5}
                  py={2}
                  bg={data.blackList ? 'red.600' : 'green.600'}
                  color="white"
                  fontWeight="semibold"
                  fontSize="md"
                  rounded="full"
                  boxShadow="md"
                  userSelect="none"
                  _hover={{
                    bg: data.blackList ? 'red.500' : 'green.500',
                    transform: 'scale(1.07)',
                    transition: 'all 0.25s ease-in-out',
                  }}
                >
                  {data.blackList ? <WarningIcon mr={3} /> : <CheckCircleIcon mr={3} />}
                  {data.blackList ? 'Blacklisté' : 'Non blacklisté'}
                </Box>

                <HStack spacing={4}>
                  <IconButton
                    aria-label="Modifier"
                    icon={<EditIcon />}
                    colorScheme="teal"
                    variant="solid"
                    onClick={handleEdit}
                    size="md"
                    boxShadow="md"
                    _hover={{ bg: 'teal.600' }}
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
                </HStack>
              </Flex>

              <Stack spacing={6}>
                {/* Informations principales - disposition deux par deux */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                  {[
                    { label: 'Identifiant', value: numeroIdentification },
                    { label: 'Raison Sociale', value: data.raisonSociale },
                    { label: 'Activité', value: data.activite },
                    { label: 'Date de Naissance', value: data.dateDeNaissance },
                  ].map((info) => (
                    <InfoBox key={info.label} label={info.label} value={info.value} />
                  ))}
                </SimpleGrid>

                              {/* Adresses */}
                              <SectionHeader title="Adresses" />
              {data.listeAdresse?.map((adresse, idx) => (
                <ContactItem key={idx}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                    <Text><strong>Numéro Rue:</strong> {adresse.numRue || '-'}</Text>
                    <Text><strong>Nom Rue:</strong> {adresse.nomRue || '-'}</Text>
                    <Text><strong>Code Postal:</strong> {adresse.codePostal || '-'}</Text>
                    <Text><strong>Délégation:</strong> {adresse.delegation || '-'}</Text>
                    <Text><strong>Contact par défaut:</strong> {adresse.contactParDefaut ? 'Oui' : 'Non'}</Text>
                  </SimpleGrid>
                </ContactItem>
              )) ?? <Text>Aucune adresse enregistrée.</Text>}

             
                {/* Téléphones */}
                  <SectionHeader title="Téléphones" />
                  {(data.listeTelephone ?? []).length > 0 ? (
                    (data.listeTelephone ?? []).map((tel, idx) => (
                      <ContactItem key={idx}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                          <Text><strong>Numéro:</strong> {tel.numeroTelephone || '-'}</Text>
                          <Text><strong>Type:</strong> {tel.typeTelephone || '-'}</Text>
                          <Text><strong>Contact par défaut:</strong> {tel.contactParDefaut ? 'Oui' : 'Non'}</Text>
                        </SimpleGrid>
                      </ContactItem>
                    ))
                  ) : (
                    <Text>Aucun téléphone enregistré.</Text>
                  )}

                  {/* Emails */}
                  <SectionHeader title="Emails" />
                  {(data.listeMails ?? []).length > 0 ? (
                    (data.listeMails ?? []).map((mail, idx) => (
                      <ContactItem key={idx}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                          <Text><strong>Adresse mail:</strong> {mail.adresseMail || '-'}</Text>
                          <Text><strong>Contact par défaut:</strong> {mail.contactParDefaut ? 'Oui' : 'Non'}</Text>
                        </SimpleGrid>
                      </ContactItem>
                    ))
                  ) : (
                    <Text>Aucun email enregistré.</Text>
                  )}
              </Stack>
            </>
          ) : (
            <Text
              textAlign="center"
              fontSize="xl"
              fontWeight="semibold"
              py={20}
            >
              Personne non trouvée.
            </Text>
          )}
        </Box>
      </Flex>

      <Footer />

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
                {data?.nom} {data?.prenom}
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
  );
};

export default PersonneDetailPage;