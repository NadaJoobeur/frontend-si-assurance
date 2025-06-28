import { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Tag,
  TagLabel,
  useColorModeValue,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { SearchIcon ,CloseIcon} from '@chakra-ui/icons';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import { packs, garantiesOptionnelles } from '../../../shared/utils/packs';


const PacksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const inputBg = useColorModeValue('white', 'gray.800');
  const inputColor = useColorModeValue('gray.800', 'white');
  const placeholderColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const filteredPacks = useMemo(() => {
    if (searchTerm.trim() === '') return packs;
    return packs.filter(pack => 
      pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredGaranties = useMemo(() => {
    if (searchTerm.trim() === '') return garantiesOptionnelles;
    return garantiesOptionnelles.filter(g => 
      g.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Box minH="100vh" bg={bgColor} display="flex">
      <Box w="260px" flexShrink={0}>
        <Sidebar />
      </Box>

      <Flex flex="1" direction="column" minH="100vh">
        <Box flex="1" px={{ base: 4, md: 10 }} py={10} overflowY="auto">
          <Heading
            fontWeight="bold"
            fontSize={{ base: '2xl', md: '3xl' }}
            textAlign="center"
            mb={8}
            color={headingColor}
          >
            Nos Packs d'Assurance Auto
          </Heading>

       <Flex justify="center" mb={8} position="relative">
  <InputGroup maxW="600px">
    <Input
      placeholder="Rechercher un pack ou une garantie..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      borderRadius="full"
      size="lg"
      bg={inputBg}
      color={inputColor}
      _placeholder={{ 
        color: placeholderColor,
        fontSize: { base: 'sm', md: 'md' }
      }}
      shadow="md"
      pr="4.5rem"
      _focus={{
        borderColor: 'blue.500',
        boxShadow: '0 0 0 1px rgba(66, 153, 225, 0.6)'
      }}
      transition="all 0.2s ease"
    />
    
    {/* Bouton de recherche */}
    <InputRightElement width="4.5rem" h="full">
      <IconButton
        aria-label="Rechercher"
        icon={<SearchIcon />}
        size="lg"
        h="full"
        w="full"
        borderTopRightRadius="full"
        borderBottomRightRadius="full"
        colorScheme="blue"
        _hover={{ 
          bg: 'blue.600',
          transform: 'scale(1.02)'
        }}
        _active={{
          bg: 'blue.700',
          transform: 'scale(0.98)'
        }}
      />
    </InputRightElement>

    {/* Bouton de reset positionné correctement */}
    {searchTerm && (
      <IconButton
        aria-label="Effacer la recherche"
        icon={<CloseIcon boxSize={3} />}
        position="absolute"
        right="4.5rem"
        top="50%"
        transform="translateY(-50%)"
        size="sm"
        rounded="full"
        colorScheme="gray"
        variant="ghost"
        onClick={() => setSearchTerm('')}
        zIndex="1"
      />
    )}
  </InputGroup>
</Flex>

          <Tabs 
            variant="enclosed" 
            index={activeTab} 
            onChange={setActiveTab}
            mb={8}
          >
            <TabList>
              <Tab _selected={{ color: 'white', bg: 'blue.600' }}>Packs Standard</Tab>
              <Tab _selected={{ color: 'white', bg: 'blue.600' }}>Garanties Optionnelles</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <Accordion allowMultiple>
                  {filteredPacks.map(pack => (
                    <AccordionItem key={pack.code} mb={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                      <AccordionButton 
                        bg={cardBg}
                        _hover={{ bg:hoverBg }}
                        p={4}
                      >
                        <Box flex="1" textAlign="left">
                          <Heading size="md">{pack.name}</Heading>
                          <Text fontSize="sm" color="gray.500">{pack.description}</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4} bg={cardBg}>
                        <Text fontWeight="bold" mb={3}>Garanties incluses :</Text>
                        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                          {pack.garanties.map(g => (
                            <Box 
                              key={g.code} 
                              borderWidth="1px" 
                              borderRadius="lg" 
                              p={4}
                              borderColor={borderColor}
                            >
                              <Text fontWeight="semibold">{g.libelle}</Text>
                              <Text>Capital : {g.capital}</Text>
                              <Text>Franchise : {g.franchise}</Text>
                              <Tag mt={1} colorScheme="blue"><TagLabel>{g.code}</TagLabel></Tag>
                            </Box>
                          ))}
                        </SimpleGrid>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabPanel>

              <TabPanel px={0}>
                <Box 
                  p={6} 
                  borderRadius="xl" 
                  bg={cardBg}
                  shadow="md"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {filteredGaranties.map(g => (
                      <Box 
                        key={g.code} 
                        borderWidth="1px" 
                        borderRadius="lg" 
                        p={4}
                        borderColor={borderColor}
                      >
                        <Text fontWeight="semibold">{g.libelle}</Text>
                        <Text>Capital : {g.capital}</Text>
                        <Text>Franchise : {g.franchise}</Text>
                        <Tag mt={1} colorScheme="green"><TagLabel>{g.code}</TagLabel></Tag>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        <Box borderTop="1px solid" borderColor={borderColor}>
          <Footer />
        </Box>
      </Flex>
    </Box>
  );
};

export default PacksPage;