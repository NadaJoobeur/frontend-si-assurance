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
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
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
  const [searchId, setSearchId] = useState('')
  const [numeroIdentification, setNumeroIdentification] = useState<string | undefined>(undefined)

  const toast = useToast()
  const { mutate: deletePersonne } = useDeletePersonne()

  const {
    data: isBlacklisted,
    isLoading: isCheckingBlacklist,
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

  const handleCheckBlacklist = () => {
    if (!searchId.trim()) {
      toast({
        title: "ID requis",
        description: "Veuillez entrer un ID pour vérifier la blacklist.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }
    setNumeroIdentification(searchId.trim())
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

          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="center"
            gap={4}
            mb={8}
            flexWrap="wrap"
          >
            <InputGroup maxW="400px" w="full">
              <Input
                placeholder="Entrez le nom"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                borderRadius="full"
                size="lg"
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.800', 'white')}
                _placeholder={{ color: 'gray.500' }}
                shadow="sm"
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label="Chercher"
                  icon={<SearchIcon />}
                  colorScheme="teal"
                  size="sm"
                  onClick={handleSearch}
                  rounded="full"
                />
              </InputRightElement>
            </InputGroup>

            <InputGroup maxW="400px" w="full">
              <Input
                placeholder="Entrez l'ID pour blacklist"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                borderRadius="full"
                size="lg"
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.800', 'white')}
                _placeholder={{ color: 'gray.500' }}
                shadow="sm"
              />
              <Button
                onClick={handleCheckBlacklist}
                colorScheme="red"
                size="lg"
                isLoading={isCheckingBlacklist}
                loadingText="Vérification..."
                borderRadius="full"
                px={6}
                ml={2}
              >
                Black list
              </Button>
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
      </Flex>

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
        >
          Ajouter
        </Button>
      </Tooltip>
    </Box>
  )
}

export default PersonnesListPage
