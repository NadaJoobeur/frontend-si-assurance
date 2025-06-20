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
  useColorModeValue,
  InputLeftElement,
} from '@chakra-ui/react'
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import { MdEmail, MdLock } from 'react-icons/md' // icônes Material Design

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate('/homepage')
    }
  }, [loginMutation.isSuccess, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ email, password })
  }

  // Couleurs pour mode clair/sombre
  const bgForm = useColorModeValue('white', 'gray.700')
  const borderForm = useColorModeValue('gray.200', 'gray.600')

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('blue.50', 'gray.900')} px={4}>
      {/* Conteneur horizontal */}
      <Flex
        bg={bgForm}
        boxShadow="2xl"
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderForm}
        maxW="900px"
        w="100%"
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
            <Heading fontSize="2xl" textAlign="center" color="#214081">
              Connexion
            </Heading>
          </VStack>

          <form onSubmit={handleSubmit}>
            <VStack spacing={5} mt={6}>
              <FormControl isRequired>
                <FormLabel>Email </FormLabel>
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
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
              </FormControl>

              {loginMutation.isError && (
                <Alert status="error" rounded="md" w="100%">
                  <AlertIcon />
                  Email ou mot de passe incorrect.
                </Alert>
              )}

              <Button
                bg="#214081"
                colorScheme="blue"
                w="100%"
                type="submit"
                _hover={{ bg: '#1b3368' }}
                isLoading={loginMutation.isPending}
              >
                Se connecter
              </Button>

              <Text fontSize="sm" color="gray.600" textAlign="center">
                Vous n’avez pas de compte ?{' '}
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={() => navigate('/signup')}
                >
                  Créer un compte
                </Button>
              </Text>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Flex>
  )
}

export default LoginForm
