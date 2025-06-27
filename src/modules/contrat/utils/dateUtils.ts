// src/utils/dateUtils.ts
export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Non spécifié';
  return new Date(dateString).toLocaleDateString('fr-FR');
};