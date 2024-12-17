import { getAmadeusAuth } from './amadeusAuth';
import { handleApiError } from '../utils/errorHandler';
import { amadeusConfig } from './amadeusConfig';

export class AmadeusClient {
  private auth = getAmadeusAuth();

  public async searchFlightOffers(params: Record<string, string>) {
    try {
      const token = await this.auth.getToken();
      const queryString = new URLSearchParams(params).toString();
      const url = `https://${amadeusConfig.hostname}/v2/shopping/flight-offers?${queryString}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw handleApiError({
          statusCode: response.status,
          code: error.errors?.[0]?.code,
          message: error.errors?.[0]?.detail
        });
      }

      return response.json();
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

let instance: AmadeusClient | null = null;

export function getAmadeusClient(): AmadeusClient {
  if (!instance) {
    instance = new AmadeusClient();
  }
  return instance;
}