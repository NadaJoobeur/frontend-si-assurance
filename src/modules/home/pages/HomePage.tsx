import React from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react'
import Navbar from '../../../shared/components/NavBar'
import Footer from '../../../shared/components/Footer' // adapte le chemin selon ton projet

const HomePage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.400, teal.400)',
    'linear(to-r, blue.600, teal.600)'
  )
  const textColor = useColorModeValue('white', 'gray.100')

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} display="flex" flexDirection="column" justifyContent="space-between">
      <Navbar />

      <Box
        bgGradient={bgGradient}
        color={textColor}
        py={{ base: 20, md: 32 }}
        textAlign="center"
        boxShadow="md"
      >
        <Container maxW="container.md">
          <VStack spacing={6}>
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Bienvenue sur CoreAssure
            </Heading>
            <Text fontSize={{ base: 'md', md: 'xl' }} maxW="600px" opacity={0.9}>
              Votre plateforme simple et efficace pour gérer contrats, devis, sinistres et paiements.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default HomePage
