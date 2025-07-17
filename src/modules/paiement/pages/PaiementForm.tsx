import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  Flex,
  useToast,
  VStack,
  Collapse,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, AddIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import type { NouveauPaiementPayload } from '../types/paiementTypes';
import type { Agence } from '../../agence/types/Agence';

export interface PaiementFormProps {
  onSubmit: (data: NouveauPaiementPayload) => void;
  isLoading: boolean;
  agences: Agence[];
  isAgencesLoading: boolean;
  title: string;
}

export const PaiementForm: React.FC<PaiementFormProps> = ({
  onSubmit,
  isLoading,
  agences,
  isAgencesLoading,
  title,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [codeAgence, setCodeAgence] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [depositAmount, setDepositAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState('');
  const [listeQuittances, setListeQuittances] = useState([{
    numeroContrat: '',
    numeroQuittance: '',
    codeBranche: '',
    codeProduit: '',
    identificationClient: '',
    nomClient: '',
    primeTotale: '',
    isOpen: false,
  }]);

  const [currencies] = useState(['EUR', 'USD', 'TND']);

  const handleAddQuittance = () => {
    setListeQuittances([...listeQuittances, {
      numeroContrat: '',
      numeroQuittance: '',
      codeBranche: '',
      codeProduit: '',
      identificationClient: '',
      nomClient: '',
      primeTotale: '',
      isOpen: true,
    }]);
  };

  const toggleQuittance = (index: number) => {
    const updated = [...listeQuittances];
    updated[index].isOpen = !updated[index].isOpen;
    setListeQuittances(updated);
  };

  const handleQuittanceChange = (
    index: number,
    field: 'numeroContrat' | 'numeroQuittance' | 'codeBranche' | 'codeProduit' | 
           'identificationClient' | 'nomClient' | 'primeTotale',
    value: string
  ) => {
    const updated = [...listeQuittances];
    updated[index][field] = value;
    setListeQuittances(updated);
  };

  const handleFormSubmit = () => {
    if (!codeAgence || !transactionDate || !orderId || !orderNumber) {
      toast({
        title: 'Tous les champs obligatoires doivent être remplis',
        status: 'warning',
      });
      return;
    }

    const payload: NouveauPaiementPayload = {
      codeAgence,
      transactionDate,
      orderId,
      orderNumber,
      cardholderName,
      depositAmount: Number(depositAmount),
      currency,
      listeQuittances: listeQuittances.map(q => ({
        numeroContrat: q.numeroContrat,
        numeroQuittance: q.numeroQuittance,
        codeBranche: q.codeBranche,
        codeProduit: q.codeProduit,
        identificationClient: q.identificationClient,
        nomClient: q.nomClient,
        primeTotale: q.primeTotale,
      })),
    };

    onSubmit(payload);
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6}>
        <IconButton
          aria-label="Retour"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate(-1)}
          mr={2}
        />
        {title || "Création d'un nouveau paiement"}
      </Heading>

      <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={6}>
        <FormControl isRequired>
          <FormLabel>Agence</FormLabel>
          <Select
            placeholder="Sélectionner une agence"
            value={codeAgence}
            onChange={(e) => setCodeAgence(e.target.value)}
            isDisabled={isAgencesLoading}
          >
            {agences.map((ag) => (
              <option key={ag.id_agence} value={ag.id_agence}>
                {ag.nom_agence}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date de transaction</FormLabel>
          <Input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Order ID</FormLabel>
          <Input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Order Number</FormLabel>
          <Input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nom du porteur de carte</FormLabel>
          <Input
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Montant du dépôt</FormLabel>
          <Input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Devise</FormLabel>
          <Select
            placeholder="Sélectionner une devise"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Box mt={8}>
        <Heading size="sm" mb={4}>Liste des Quittances</Heading>
        
        <VStack spacing={4} align="stretch">
          {listeQuittances.map((q, index) => (
            <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
              <Flex 
                justify="space-between" 
                align="center"
                onClick={() => toggleQuittance(index)}
                cursor="pointer"
                p={2}
              >
                <Box fontWeight="bold">Quittance #{index + 1}</Box>
                <IconButton
                  aria-label={q.isOpen ? "Réduire" : "Développer"}
                  icon={q.isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  size="sm"
                  variant="ghost"
                />
              </Flex>

              <Collapse in={q.isOpen}>
                <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={4} p={4}>
                  <FormControl isRequired>
                    <FormLabel>Numéro Contrat</FormLabel>
                    <Input
                      value={q.numeroContrat}
                      onChange={(e) =>
                        handleQuittanceChange(index, 'numeroContrat', e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Numéro Quittance</FormLabel>
                    <Input
                      value={q.numeroQuittance}
                      onChange={(e) =>
                        handleQuittanceChange(index, 'numeroQuittance', e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Code Branche</FormLabel>
                    <Input
                      value={q.codeBranche}
                      onChange={(e) =>
                        handleQuittanceChange(index, 'codeBranche', e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Code Produit</FormLabel>
                    <Input
                      value={q.codeProduit}
                      onChange={(e) =>
                        handleQuittanceChange(index, 'codeProduit', e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Identification Client</FormLabel>
                    <Input
                      value={q.identificationClient}
                      onChange={(e) =>
                        handleQuittanceChange(index, 'identificationClient', e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Nom Client</FormLabel>
                    <Input
                      value={q.nomClient}
                      onChange={(e) =>
                        handleQuittanceChange(index, 'nomClient', e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Prime Totale</FormLabel>
                    <Input
                      type="number"
                      value={q.primeTotale}
                      onChange={(e) =>
                        handleQuittanceChange(index, 'primeTotale', e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Collapse>
            </Box>
          ))}
        </VStack>

        <Button
          leftIcon={<AddIcon />}
          mt={4}
          onClick={handleAddQuittance}
          colorScheme="blue"
          size="sm"
        >
          Ajouter une quittance
        </Button>
      </Box>

      <HStack justify="flex-end" mt={8} spacing={4}>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Annuler
        </Button>
        <Button
          colorScheme="blue"
          isLoading={isLoading}
          onClick={handleFormSubmit}
        >
          Créer Paiement
        </Button>
      </HStack>
    </Box>
  );
};