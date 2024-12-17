import { config } from '../../../config/environment';

export const amadeusConfig = {
  clientId: config.amadeus.clientId,
  clientSecret: config.amadeus.clientSecret,
  hostname: config.amadeus.hostname,
  isProduction: config.amadeus.isProduction
} as const;