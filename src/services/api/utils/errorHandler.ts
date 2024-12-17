export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const ERROR_MESSAGES: Record<string, string> = {
  'INVALID_CLIENT': 'Erreur d\'authentification avec l\'API',
  'RATE_LIMIT_EXCEEDED': 'Trop de requêtes, veuillez réessayer dans quelques instants',
  'INVALID_PARAMETERS': 'Paramètres de recherche invalides',
  'SERVICE_UNAVAILABLE': 'Le service est temporairement indisponible',
  'RESOURCE_NOT_FOUND': 'Aucun vol trouvé pour ces critères',
  'DEFAULT': 'Une erreur est survenue lors de la recherche'
};

export function handleApiError(error: any): never {
  console.error('API Error:', error);
  
  if (error.response) {
    const { statusCode, code, message } = error.response;
    const errorMessage = message || ERROR_MESSAGES[code] || ERROR_MESSAGES.DEFAULT;
    throw new ApiError(errorMessage, statusCode, code);
  }
  
  if (error instanceof Error) {
    throw new ApiError(
      error.message,
      500,
      'INTERNAL_ERROR'
    );
  }
  
  throw new ApiError(
    ERROR_MESSAGES.DEFAULT,
    500,
    'UNKNOWN_ERROR'
  );
}