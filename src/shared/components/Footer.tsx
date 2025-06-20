import React from 'react'
import { Box, Text, VStack,  useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.700', 'gray.300')

  return (
    <Box bg={bg} color={color} py={6} mt={10} as="footer" textAlign="center" fontSize="sm">
      <VStack spacing={2}>
        <Text>© {new Date().getFullYear()}CoreAssure. Tous droits réservés.</Text>
       
      </VStack>
    </Box>
  )
}

export default Footer
