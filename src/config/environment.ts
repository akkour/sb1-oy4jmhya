import { z } from 'zod';

const envSchema = z.object({
  VITE_AMADEUS_CLIENT_ID: z.string().min(1, 'Amadeus Client ID is required'),
  VITE_AMADEUS_CLIENT_SECRET: z.string().min(1, 'Amadeus Client Secret is required'),
});

function validateEnv() {
  try {
    return envSchema.parse({
      VITE_AMADEUS_CLIENT_ID: import.meta.env.VITE_AMADEUS_CLIENT_ID,
      VITE_AMADEUS_CLIENT_SECRET: import.meta.env.VITE_AMADEUS_CLIENT_SECRET,
    });
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Missing or invalid environment variables');
  }
}

const env = validateEnv();

export const config = {
  amadeus: {
    clientId: env.VITE_AMADEUS_CLIENT_ID,
    clientSecret: env.VITE_AMADEUS_CLIENT_SECRET,
    isProduction: import.meta.env.PROD,
    hostname: import.meta.env.PROD ? 'api.amadeus.com' : 'test.api.amadeus.com'
  }
} as const;