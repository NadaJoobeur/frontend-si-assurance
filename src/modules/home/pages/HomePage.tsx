import React from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import Sidebar from '../../../shared/components/Sidebar'
import Footer from '../../../shared/components/Footer'

const HomePage = () => {
  const pageBg = useColorModeValue('gray.50', 'gray.900')
  const sidebarBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.600')
  const textColor = useColorModeValue('gray.700', 'gray.200')

  return (
    <Flex minH="100vh" bg={pageBg} direction="row">
      {/* Sidebar */}
      <Box
        as="aside"
        position="fixed"
        top="0"
        left="0"
        h="100vh"
        w="220px"
        bg={sidebarBg}
        backdropFilter="blur(10px)"
        boxShadow="md"
        borderRight="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        zIndex="1000"
      >
        <Sidebar />
      </Box>

      {/* Contenu principal avec flex column */}
      <Flex 
        flex="1" 
        direction="column" 
        minH="100vh"
        ml="220px" // Pour compenser la largeur de la sidebar
      >
        {/* Contenu principal qui prend tout l'espace disponible */}
        <Box flex="1" display="flex" flexDirection="column" justifyContent="center">
          <Container maxW="container.md" textAlign="center">
            <VStack spacing={6}>
              <Heading
                fontWeight="hairline"
                fontSize={{ base: '4xl', md: '6xl' }}
                letterSpacing="wide"
                lineHeight="1.1"
              >
                Bienvenue sur CoreAssure
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: '2xl' }}
                opacity={0.85}
                fontWeight="light"
                maxW="lg"
                mx="auto"
                color={textColor}
              >
                Votre plateforme simple et efficace pour gérer contrats, devis, sinistres et paiements.
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Footer collé en bas sans espace */}
        <Box 
          borderTop="1px solid" 
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Footer />
        </Box>
      </Flex>
    </Flex>
  )
}

export default HomePage