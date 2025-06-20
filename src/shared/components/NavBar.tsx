import React ,{useEffect, useState} from 'react'
import {
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  HStack,
  Box,
  useColorModeValue,Icon
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { RiShakeHandsFill } from "react-icons/ri";



const Navbar = () => {
const [username, setUsername] = useState('') // initial vide

useEffect(() => {
  const storedName = localStorage.getItem('username')
  if (storedName) {
    setUsername(storedName)
  }
}, [])

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleNavClick = (path: string) => {
    navigate(path)
  }
const bgGradient = useColorModeValue(
  'linear(to-r, blue.400, teal.400)',
  'linear(to-r, blue.600, teal.600)'
)
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px={8}
      py={4}
      bg={useColorModeValue('blue.50', 'gray.900')}
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="999"
    >
        <HStack
      spacing={2}
      cursor="pointer"
      onClick={() => navigate('/')}
      align="center"
    >
      <Icon as={RiShakeHandsFill} w={6} h={6} color="blue.600" />
      <Text
        fontSize="xl"
        
        color="blue.600"
        userSelect="none"
      >
        CoreAssure
      </Text>
    </HStack>

      <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
        {[
          { label: 'Accueil', path: '/' },
          { label: 'Personne', path: '/person' },
          { label: 'Contrat', path: '/contrat' },
          { label: 'Sinistre', path: '/sinistre' },
          { label: 'Devis', path: '/devis' },
          { label: 'Paiement', path: '/payment' },
          { label: 'Affaire Nouvelle', path: '/new-case' },
        ].map((item) => (
          <Text
            key={item.path}
            cursor="pointer"
            fontSize="sm"
            fontWeight="medium"
            position="relative"
            onClick={() => handleNavClick(item.path)}
            _after={{
              content: `""`,
              position: 'absolute',
              width: '0%',
              height: '2px',
              bottom: '-2px',
              left: '0',
              bg: 'blue.600',
              transition: 'width 0.3s ease',
            }}
            _hover={{
              color: 'blue.600',
              _after: { width: '100%' },
            }}
          >
            {item.label}
          </Text>
        ))}
      </HStack>

      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          _hover={{ bg: 'gray.100' }}
        >
          <HStack spacing={3}>
            <Box
              bgGradient={bgGradient}
              p="1.5px"
              borderRadius="full"
              display="inline-block"
            >
              <Avatar size="sm" name={username || 'Utilisateur'} bg="white" color="gray.800" />
            </Box>
            <Text
              display={{ base: 'none', md: 'inline' }}
              fontSize="sm"
              fontWeight="medium"
              color="blue.600"
            >
             {username || 'Utilisateur'}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default Navbar
