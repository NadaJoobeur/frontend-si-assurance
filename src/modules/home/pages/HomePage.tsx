import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  Badge,
  Progress,
  HStack,
  Divider,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { FiTrendingUp, FiUsers, FiFileText, FiDollarSign} from 'react-icons/fi'
import Sidebar from '../../../shared/components/Sidebar'
import Footer from '../../../shared/components/Footer'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axiosClient  from "../../../shared/api/axiosClient";

const HomePage = () => {
  const pageBg = useColorModeValue('gray.50', 'gray.900')
  const sidebarBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.600')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.100', 'gray.700')

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosClient.get('/dashboard/data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setData(response.data)
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des données')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <Flex minH="100vh" bg={pageBg} direction="row">
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
          // eslint-disable-next-line react-hooks/rules-of-hooks
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          zIndex="1000"
        >
          <Sidebar />
        </Box>
        <Flex 
          flex="1" 
          direction="column" 
          minH="100vh"
          ml="220px"
          justify="center"
          align="center"
        >
          <Spinner size="xl" />
          <Text mt={4}>Chargement des données...</Text>
        </Flex>
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex minH="100vh" bg={pageBg} direction="row">
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
          // eslint-disable-next-line react-hooks/rules-of-hooks
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          zIndex="1000"
        >
          <Sidebar />
        </Box>
        <Flex 
          flex="1" 
          direction="column" 
          minH="100vh"
          ml="220px"
          justify="center"
          align="center"
        >
          <Alert status="error" maxW="container.md">
            <AlertIcon />
            {error}
          </Alert>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex minH="100vh" bg={pageBg} direction="row">
      {/* Sidebar */}

        <Sidebar />

      {/* Contenu principal avec flex column */}
      <Flex 
        flex="1" 
        direction="column" 
        minH="100vh"
        ml="260px" // Pour compenser la largeur de la sidebar
      >
        {/* En-tête */}
        <Box 
          // eslint-disable-next-line react-hooks/rules-of-hooks
          bg={useColorModeValue('white', 'gray.800')}
          p={2}
          borderBottom="1px solid"
          // eslint-disable-next-line react-hooks/rules-of-hooks
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Heading size="lg" fontWeight="semibold">
            Tableau de bord
          </Heading>
          <Text color={textColor} fontSize="sm" mt={1}>
            Aperçu global de votre activité
          </Text>
        </Box>

        {/* Contenu principal */}
        <Box flex="1" p={6}>
          <Container maxW="container.xl">
            {/* Cartes de statistiques */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
              <StatCard 
                title="Contrats" 
                value={data.contracts.total} 
                change={data.contracts.change}
                trend={data.contracts.trend}
                icon={FiFileText}
                color="blue"
                onClick={() => navigate('/contrat/list')}
              />
              <StatCard 
                title="Clients" 
                value={data.clients.total} 
                change={data.clients.change}
                trend={data.clients.trend}
                icon={FiUsers}
                color="green"
                onClick={() => navigate('/person/list')}
              />
              <StatCard 
                title="Paiements (€)" 
                value={data.payments.total} 
                change={data.payments.change}
                trend={data.payments.trend}
                icon={FiDollarSign}
                color="purple"
                onClick={() => navigate('/paiement/list')}
              />
              <StatCard 
                title="Sinistres" 
                value={data.claims.total} 
                change={data.claims.change}
                trend={data.claims.trend}
                icon={FiTrendingUp}
                color="orange"
               onClick={() => navigate('/sinistre/list')}

              />
            </SimpleGrid>

            {/* Graphiques */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
              <ChartCard title="Nouveaux contrats par mois">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.contractData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3182CE" fill="#3182CE" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Paiements mensuels (€)">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.paymentData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#805AD5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </SimpleGrid>

            {/* Dernières activités et calendrier */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              <Box 
                bg={cardBg} 
                p={6} 
                borderRadius="lg" 
                border="1px solid" 
                borderColor={cardBorder}
                boxShadow="sm"
              >
                <Heading size="md" mb={4}>Événements à venir</Heading>
                <VStack spacing={4} align="stretch">
                  {data.upcomingEvents.map((event: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; time: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                    <Box key={event.id}>
                      <HStack justify="space-between">
                        <Text fontWeight="medium">{event.title}</Text>
                        <Badge colorScheme="blue" px={2} py={1}>
                          {event.date} à {event.time}
                        </Badge>
                      </HStack>
                      <Divider mt={2} />
                    </Box>
                  ))}
                </VStack>
              </Box>

              <Box 
                bg={cardBg} 
                p={6} 
                borderRadius="lg" 
                border="1px solid" 
                borderColor={cardBorder}
                boxShadow="sm"
              >
                <Heading size="md" mb={4}>Objectifs mensuels</Heading>
                <VStack spacing={5} align="stretch">
                  <GoalProgress 
                    title="Nouveaux contrats" 
                    current={data.contracts.monthly} 
                    target={40} 
                    color="blue"
                  />
                  <GoalProgress 
                    title="Nouveaux clients" 
                    current={data.clients.monthly} 
                    target={20} 
                    color="green"
                  />
                  <GoalProgress 
                    title="Paiements (€)" 
                    current={data.payments.monthly} 
                    target={10000} 
                    color="purple"
                  />
                </VStack>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Footer */}
        <Box 
          borderTop="1px solid" 
          // eslint-disable-next-line react-hooks/rules-of-hooks
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Footer />
        </Box>
      </Flex>
    </Flex>
  )
}

// Composant de carte statistique
const StatCard = ({ title, value, change, trend, icon, color, onClick  }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.100', 'gray.700')

  return (
      <Box 
      bg={cardBg} 
      p={4} 
      borderRadius="lg" 
      border="1px solid" 
      borderColor={cardBorder}
      boxShadow="sm"
      cursor={onClick ? 'pointer' : 'default'} 
      onClick={onClick} 
      _hover={onClick ? { bg: `${color}.50`, transform: 'scale(1.02)' } : {}} 
      transition="all 0.2s"
    >
      <Stat>
        <HStack justify="space-between">
          <StatLabel color="gray.500">{title}</StatLabel>
          <Icon as={icon} color={`${color}.400`} boxSize={5} />
        </HStack>
        <StatNumber fontSize="2xl" mt={2} mb={1}>
          {value.toLocaleString()}
        </StatNumber>
        <StatHelpText>
          <StatArrow type={trend === 'up' ? 'increase' : 'decrease'} />
          {change}% ce mois-ci
        </StatHelpText>
      </Stat>
    </Box>
  )
}

// Composant de carte graphique
const ChartCard = ({ title, children }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box 
      bg={cardBg} 
      p={6} 
      borderRadius="lg" 
      border="1px solid" 
      borderColor={cardBorder}
      boxShadow="sm"
    >
      <Heading size="md" mb={4}>{title}</Heading>
      {children}
    </Box>
  )
}

// Composant de progression d'objectif
const GoalProgress = ({ title, current, target, color }) => {
  const percent = Math.min(Math.round((current / target) * 100), 100)

  return (
    <Box>
      <HStack justify="space-between" mb={1}>
        <Text fontSize="sm">{title}</Text>
        <Text fontSize="sm" fontWeight="medium">
          {current.toLocaleString()} / {target.toLocaleString()}
        </Text>
      </HStack>
      <Progress 
        value={percent} 
        colorScheme={color} 
        size="sm" 
        borderRadius="full"
      />
      <Text fontSize="xs" textAlign="right" mt={1}>
        {percent}% de l'objectif
      </Text>
    </Box>
  )
}

export default HomePage