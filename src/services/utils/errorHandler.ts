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

export function handleApiError(error: any): never {
  console.error('API Error:', error);
  
  if (error.response) {
    const { statusCode, code, description } = error.response;
    const errorMessage = description || getErrorMessage(code);
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
    'Une erreur inattendue est survenue. Veuillez réessayer.',
    500,
    'UNKNOWN_ERROR'
  );
}

function getErrorMessage(code: string): string {
  const errorMessages: Record<string, string> = {
    'INVALID_CLIENT': 'Erreur d\'authentification avec l\'API',
    'RATE_LIMIT_EXCEEDED': 'Trop de requêtes, veuillez réessayer dans quelques instants',
    'INVALID_PARAMETERS': 'Paramètres de recherche invalides',
    'SERVICE_UNAVAILABLE': 'Le service est temporairement indisponible, veuillez réessayer plus tard',
    'RESOURCE_NOT_FOUND': 'Aucun vol trouvé pour ces critères',
    'DEFAULT': 'Une erreur est survenue lors de la recherche'
  };

  return errorMessages[code] || errorMessages.DEFAULT;
}