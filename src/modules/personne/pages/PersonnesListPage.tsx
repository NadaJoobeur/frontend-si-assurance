import {
  Box,
  Heading,
  useColorModeValue,
  Button,
  Text,
  Spinner,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  IconButton,
  Tooltip,
  SimpleGrid,
} from '@chakra-ui/react'
import { AddIcon, SearchIcon, CloseIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePersonnes } from '../hooks/usePersonnes'
import { useDeletePersonne } from '../hooks/useDeletePersonne'
import { useCheckBlacklist } from '../hooks/useCheckBlacklist'
import PersonneItem from '../components/PersonneItem'
import Sidebar from '../../../shared/components/Sidebar'
import Footer from '../../../shared/components/Footer'

const PersonnesListPage = () => {
  const navigate = useNavigate()
  const [idUser, setIdUser] = useState('')

  useEffect(() => {
    const storedId = localStorage.getItem('idUser')
    if (storedId) {
      setIdUser(storedId)
    }
  }, [])

  const { data = [], isLoading } = usePersonnes(idUser)
  const [searchName, setSearchName] = useState('')
  const [numeroIdentification] = useState<string | undefined>(undefined)

  const toast = useToast()
  const { mutate: deletePersonne } = useDeletePersonne()

  const {
    data: isBlacklisted,
    error: blacklistError,
  } = useCheckBlacklist(numeroIdentification)

  const filteredData = data.filter((p) =>
    p.nom?.toLowerCase().includes(searchName.trim().toLowerCase())
  )

  const handleSearch = () => {
    if (!searchName.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez entrer un nom valide pour la recherche.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (filteredData.length === 0) {
      toast({
        title: "Personne introuvable",
        description: `Aucune personne avec le nom "${searchName.trim()}" trouvée.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (filteredData.length === 1) {
      navigate(`/person/detail/${filteredData[0].id}`)
    } else {
      toast({
        title: `${filteredData.length} personnes trouvées`,
        description: "Affichage de la liste filtrée ci-dessous.",
        status: "info",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (numeroIdentification !== undefined) {
      if (blacklistError) {
        toast({
          title: "Erreur lors de la vérification",
          description: blacklistError.response?.data?.message || blacklistError.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      } else if (isBlacklisted !== undefined) {
        toast({
          title: isBlacklisted ? "Personne blacklistée" : "Personne non blacklistée",
          status: isBlacklisted ? "error" : "success",
          duration: 4000,
          isClosable: true,
        })
      }
    }
  }, [isBlacklisted, blacklistError, numeroIdentification, toast])

  // Couleurs en fonction du mode
  const inputBg = useColorModeValue('white', 'gray.800')
  const inputColor = useColorModeValue('gray.800', 'white')
  const placeholderColor = useColorModeValue('gray.500', 'gray.400')

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} display="flex">
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
            color={useColorModeValue('gray.800', 'white')}
          >
            Liste des personnes
          </Heading>

          <Flex justify="center" mb={8} position="relative">
            <InputGroup maxW="600px">
              <Input
                placeholder="Rechercher une personne par nom..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
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
              
              {/* Bouton de recherche */}
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

              {/* Bouton de reset */}
              {searchName && (
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
                  onClick={() => setSearchName('')}
                  zIndex="1"
                />
              )}
            </InputGroup>
          </Flex>

          {isLoading ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" color="teal.400" />
              <Text ml={4} fontSize="lg" color="gray.500">
                Chargement en cours...
              </Text>
            </Flex>
          ) : filteredData.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="stretch">
              {filteredData.map((p) => (
                <PersonneItem
                  key={p.id}
                  personne={p}
                  onClick={() => navigate(`/person/detail/${p.id}`)}
                  onEdit={(id) => navigate(`/person/edit/${id}`)}
                  onDelete={(id) => deletePersonne({ numeroIdentification: id })}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" fontSize="lg" mt={10} color="gray.500">
              Aucune personne trouvée.
            </Text>
          )}
        </Box>

        <Box borderTop="1px solid" borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <Footer />
        </Box>

        <Tooltip label="Ajouter une personne" placement="left" hasArrow>
          <Button
            onClick={() => navigate('/person/add')}
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
      </Flex>
    </Box>
  )
}

export default PersonnesListPage