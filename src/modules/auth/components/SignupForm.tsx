import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Text,
  Flex,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdPerson, MdEmail, MdLock } from 'react-icons/md'
import { useSignup } from '../hooks/useSignup'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const signupMutation = useSignup()

  useEffect(() => {
    if (signupMutation.isSuccess) {
      navigate('/login')
    }
  }, [signupMutation.isSuccess, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signupMutation.mutate({ name, email, password })
  }

  const bgForm = useColorModeValue('white', 'gray.700')
  const bgPage = useColorModeValue('blue.50', 'gray.900')

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgPage} p={6}>
      <Flex
        maxW="1100px"
        w="full"
        bg={bgForm}
        boxShadow="xl"
        borderRadius="lg"
        overflow="hidden"
      >
        {/* Image à gauche */}
        <Box
           flex="1"
          display={{ base: 'none', md: 'block' }}
          bgImage="url('../../../../public/image/login.jpg')"  // <-- mets ici le chemin de ton image
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
         
        />

        {/* Formulaire à droite */}
        <Box flex="1" p={10}>
        <VStack spacing={6}>
          <Heading mb={6} textAlign="center" color="#214081" fontSize="2xl">
            Créer un compte
          </Heading>
            </VStack>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Nom</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.400" fontSize="20px">
                    <MdPerson />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.400" fontSize="20px">
                    <MdEmail />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Mot de passe</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.400" fontSize="20px">
                    <MdLock />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              {signupMutation.isError && (
                <Alert status="error" rounded="md" w="100%">
                  <AlertIcon />
                  Erreur lors de l'inscription.
                </Alert>
              )}

              <Button
                bg="#214081"
                color="white"
                w="100%"
                type="submit"
                _hover={{ bg: '#1b3368' }}
                isLoading={signupMutation.isPending}
              >
                S'inscrire
              </Button>

              <Text fontSize="sm" color="gray.600" textAlign="center" pt={2}>
                Vous avez déjà un compte ?{' '}
                <Button variant="link" colorScheme="blue" onClick={() => navigate('/login')}>
                  Se connecter
                </Button>
              </Text>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Flex>
  )
}

export default SignupForm
