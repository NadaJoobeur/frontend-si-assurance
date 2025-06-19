import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { useSignup } from '../hooks/useSignup'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const navigate = useNavigate()
  
  const signupMutation = useSignup()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signupMutation.mutate({ name, email, password })
  }

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center" size="md">Créer un compte</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nom</FormLabel>
            <Input
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {signupMutation.isError && (
            <Alert status="error">
              <AlertIcon />
              Erreur lors de l'inscription
            </Alert>
          )}
          <Button variant="link" mt={2} onClick={() => {navigate('/login')}}>
                   Tu as déja un compte ? se connecter
                  </Button>
          <Button
            colorScheme="green"
            type="submit"
            width="100%"
            isLoading={signupMutation.isPending}
          >
            S'inscrire
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default SignupForm
