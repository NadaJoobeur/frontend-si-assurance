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
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLogin()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ email, password })
  }

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center" size="md">Se connecter</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
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
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {loginMutation.isError && (
            <Alert status="error">
              <AlertIcon />
              Erreur de connexion
            </Alert>
          )}
         <Button variant="link" mt={2} onClick={() => {navigate('/signup')}}>
          Tu n'as pas un compte ? Créer un compte
         </Button>
          <Button
            colorScheme="blue"
            type="submit"
            width="100%"
            isLoading={loginMutation.isPending}
             onClick={() => {navigate('/homepage')}}
          >
           
            Connexion
          </Button>
         
        </VStack>
      </form>
    </Box>
  )
}

export default LoginForm
