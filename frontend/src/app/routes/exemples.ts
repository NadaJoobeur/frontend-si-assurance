// src/root/exemple.ts
import axios from 'axios';

export const envoyerDonnees = async (): Promise<{ message: string }> => {
  const response = await axios.get('http://localhost:3000/', {

  });
  return response.data;
};
