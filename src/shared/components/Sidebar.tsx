import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Avatar,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import { RiShakeHandsFill } from 'react-icons/ri'

const Sidebar = () => {
  const [username, setUsername] = useState('')
  const [activePath, setActivePath] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) setUsername(storedName)

    setActivePath(location.pathname)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleNavClick = (path: string) => {
    setActivePath(path)
    navigate(path)
  }

  const bgGradient = useColorModeValue(
    'linear(to-r, blue.400, teal.400)',
    'linear(to-r, blue.600, teal.600)'
  )
  const borderColor = useColorModeValue('#CBD5E0', '#4A5568') // gris clair/sombre
  const inactiveColor = useColorModeValue('gray.700', 'gray.300');

  const navItems = [
    { label: 'Accueil', path: '/homePage' },
    { label: 'Personne', path: '/person/list' },
    { label: 'Garantie', path: '/garantie' },
    { label: "Gestion d'agence", path: '/agences/list' },
    { label: 'Devis', path: '/devis/list' },
    { label: 'Contrat', path: '/contrat/list' },

  ]

  return (
    <Box
      w="250px"
      h="100vh"
      bg={useColorModeValue('blue.50', 'gray.900')}
      borderRight="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="fixed"
      top="0"
      left="0"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      px={4}
      py={6}
    >
      {/* Logo + Utilisateur + Nav */}
      <VStack align="start" spacing={6} flex="1" overflowY="auto">
        {/* Logo */}
        <HStack
          spacing={3}
          cursor="pointer"
          onClick={() => handleNavClick('/homePage')}
          userSelect="none"
        >
          <Icon as={RiShakeHandsFill} w={6} h={6} color="blue.600" />
          <Text fontSize="xl" color="blue.600" fontWeight="bold">
            CoreAssure
          </Text>
        </HStack>

      <Box w="full" px={3}>
        <hr
          style={{
            borderColor: useColorModeValue('#CBD5E0', '#4A5568'), 
            borderWidth: '1px',
            marginBottom: '12px',
            marginTop: 0,
          }}
        />
        <HStack spacing={3} userSelect="none">
          <Box
            bgGradient={bgGradient}
            p="1.5px"
            borderRadius="full"
            display="inline-block"
          >
            <Avatar size="sm" name={username || 'Utilisateur'} bg="white" color="gray.800" />
          </Box>
          <Text fontSize="lg" color="blue.600" noOfLines={1}>
            {username || 'Utilisateur'}
          </Text>
        </HStack>
        <hr
          style={{
            borderColor: useColorModeValue('#CBD5E0', '#4A5568'),
            borderWidth: '1px',
            marginTop: '12px',
            marginBottom: 0,
          }}
        />
      </Box>

        {/* Navigation Links */}
        <VStack align="start" spacing={4} mt={2} w="full" flex="1">
          {navItems.map((item) => {
            const isActive = activePath === item.path
            return (
              <Text
                key={item.path}
                cursor="pointer"
                fontSize="md"
                fontWeight={isActive ? 'bold' : 'medium'}
                onClick={() => handleNavClick(item.path)}
                color={isActive ? 'blue.600' : inactiveColor}
                w="full"
                px={3}
                py={2}
                borderLeft={isActive ? '4px solid' : '4px solid transparent'}
                borderColor={isActive ? 'blue.600' : 'transparent'}
                _hover={{
                  color: 'blue.600',
                  borderColor: 'blue.600',
                  bg:borderColor,
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleNavClick(item.path)
                  }
                }}
              >
                {item.label}
              </Text>
            )
          })}
        </VStack>
      </VStack>

      {/* Bouton déconnexion en bas */}
      <Box mt={6} pt={4} borderTop="1px solid" borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Button
          leftIcon={<FiLogOut />}
          variant="outline"
          colorScheme="red"
          size="md"
          w="full"
          onClick={handleLogout}
          _hover={{ bg: 'red.50' }}
          aria-label="Se déconnecter"
        >
          Se déconnecter
        </Button>
      </Box>
    </Box>
  )
}

export default Sidebar ;
