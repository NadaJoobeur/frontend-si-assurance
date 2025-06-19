import { useState } from 'react'
import viteLogo from '/vite.svg'
import '../styles/App.css'
import { Box, Heading, Text, Link, VStack, Image, Button } from '@chakra-ui/react';
import { envoyerDonnees } from './routes/exemples';

const App: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleClick = async () => {
    try {
      const data = await envoyerDonnees();
      console.log(data.message)
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage('Erreur lors de la communication avec le backend.');
      console.error(error);
    }
  };

  return (
    <Box textAlign="center" p={10}>
      <VStack >
        <Image src={viteLogo} alt="logo" boxSize="120px" className="App-logo" />
        <Heading as="h1" size="lg">
          Bienvenue sur React + Chakra UI
        </Heading>
        <Text>
          Modifie <code>src/App.tsx</code> et sauvegarde pour recharger.
        </Text>
        <Link
          href="https://chakra-ui.com"
          isExternal
          color="teal.400"
          fontWeight="bold"
        >
          Découvre Chakra UI 🚀
        </Link>
        {/* Bouton pour envoyer la requête */}
        <Button colorScheme="teal" onClick={handleClick}>
          Envoyer requête au backend
        </Button>
        {/* Afficher la réponse du backend */}
        {responseMessage && (
          <Text mt={4} fontWeight="bold" color="green.500">
            {responseMessage}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default App
