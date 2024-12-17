export const ERROR_MESSAGES = {
  INVALID_CLIENT: 'Erreur d\'authentification avec l\'API',
  RATE_LIMIT_EXCEEDED: 'Trop de requêtes, veuillez réessayer dans quelques instants',
  INVALID_PARAMETERS: 'Paramètres de recherche invalides',
  SERVICE_UNAVAILABLE: 'Le service est temporairement indisponible',
  RESOURCE_NOT_FOUND: 'Aucun vol trouvé pour ces critères',
  DEFAULT: 'Une erreur est survenue lors de la recherche',
  INVALID_DATE_FORMAT: 'Format de date invalide',
  INVALID_RESPONSE_FORMAT: 'Format de réponse API invalide',
  NETWORK_ERROR: 'Erreur de connexion au serveur',
} as const;