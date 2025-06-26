/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/contrat/pages/ContratsPage.tsx

import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Spinner,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  SimpleGrid,
  IconButton,
  Tooltip,
  Button
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContrats } from '../hooks/useContrats';
import ContratItem from '../components/ContratItem';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import { DeleteContrat } from '../api/contratApi';

const ContratsPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [idUser, setIdUser] = useState(() => localStorage.getItem('idUser') || '');
  const [searchTerm, setSearchTerm] = useState('');

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const inputBg = useColorModeValue('white', 'gray.800');
  const inputColor = useColorModeValue('gray.800', 'white');
  const placeholderColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const storedId = localStorage.getItem('idUser');
    if (storedId) {
      setIdUser(storedId);
    }
  }, []);

  const { data = [], isLoading, error, refetch } = useContrats(idUser);

  const filteredData = useMemo(() => {
    if (searchTerm.trim() === '') return data;
    return data.filter((contrat) =>
      contrat.numeroContrat?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const handleSearch = () => {
    if (filteredData.length === 0 && searchTerm.trim() !== '') {
      toast({
        title: "Aucun résultat",
        description: `Aucun contrat trouvé pour "${searchTerm}"`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DeleteContrat(id);
      toast({
        title: 'Contrat supprimé',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (error: any) {
      toast({
        title: 'Erreur lors de la suppression',
        description: error.message || 'Une erreur est survenue.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!idUser) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="teal.400" />
        <Text ml={4} fontSize="lg" color="gray.500">
          Chargement de l'identifiant utilisateur...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text fontSize="lg" color="red.500">
          Erreur lors du chargement : {error.message}
        </Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} display="flex" _focus={{ outline: "none" }}>
      <Box w="260px" flexShrink={0}>
        <Sidebar />
      </Box>

      <Flex flex="1" direction="column" minH="100vh">
        <Box flex="1" px={{ base: 4, md: 10 }} py={10} overflowY="auto">
          <Heading
            fontWeight="bold"
            fontSize={{ base: '2xl', md: '3xl' }}
            textAlign="center"
            mb={8}
            color={headingColor}
          >
            Liste des Contrats
          </Heading>

          <Flex justify="center" mb={8} position="relative">
            <InputGroup maxW="600px">
              <Input
                placeholder="Rechercher un contrat par numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                borderRadius="full"
                size="lg"
                bg={inputBg}
                color={inputColor}
                _placeholder={{ 
                  color: placeholderColor,
                  fontSize: { base: 'sm', md: 'md' }
                }}
                shadow="md"
                pr="4.5rem"
                _focus={{
                  borderColor: 'blue.500',
                  boxShadow: '0 0 0 1px rgba(66, 153, 225, 0.6)'
                }}
                transition="all 0.2s ease"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              
              <InputRightElement width="4.5rem" h="full">
                <IconButton
                  aria-label="Rechercher"
                  icon={<SearchIcon />}
                  size="lg"
                  h="full"
                  w="full"
                  borderTopRightRadius="full"
                  borderBottomRightRadius="full"
                  colorScheme="blue"
                  _hover={{ 
                    bg: 'blue.600',
                    transform: 'scale(1.02)'
                  }}
                  _active={{
                    bg: 'blue.700',
                    transform: 'scale(0.98)'
                  }}
                  onClick={handleSearch}
                />
              </InputRightElement>

              {searchTerm && (
                <IconButton
                  aria-label="Effacer la recherche"
                  icon={<CloseIcon boxSize={3} />}
                  position="absolute"
                  right="4.5rem"
                  top="50%"
                  transform="translateY(-50%)"
                  size="sm"
                  rounded="full"
                  colorScheme="gray"
                  variant="ghost"
                  onClick={() => setSearchTerm('')}
                  zIndex="1"
                />
              )}
            </InputGroup>
          </Flex>

          {isLoading ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" color="teal.400" />
              <Text ml={4} fontSize="lg" color="gray.500">
                Chargement des contrats...
              </Text>
            </Flex>
          ) : filteredData.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filteredData.map((contratData, index) => (
                <ContratItem
                  key={contratData.numeroContrat ?? `contrat-${index}`}
                  contratData={contratData}
                  onClick={() =>
                    contratData.numeroContrat &&
                    navigate(`/contrat/detail/${contratData.numeroContrat}`)
                  }
                  onDelete={handleDelete}
                  onEdit={(numeroContrat) => navigate(`/contrat/edit/${numeroContrat}`)}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" fontSize="lg" mt={10} color="gray.500">
              {searchTerm.trim() === '' ? 'Aucun contrat trouvé.' : 'Aucun résultat pour votre recherche.'}
            </Text>
          )}
        </Box>

        <Box borderTop="1px solid" borderColor={borderColor}>
          <Footer />
        </Box>
      </Flex>

      <Tooltip label="Ajouter un contrat" placement="left" hasArrow>
        <Button
          onClick={() => navigate('/contrat/add')}
          colorScheme="green"
          size="lg"
          rounded="full"
          shadow="xl"
          position="fixed"
          bottom="40px"
          right="40px"
          leftIcon={<AddIcon />}
          _hover={{ transform: 'scale(1.1)' }}
          zIndex={1000}
        >
          Ajouter
        </Button>
      </Tooltip>
    </Box>
  );
};

export default ContratsPage;