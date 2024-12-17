import { config } from '../../config/environment';

class AmadeusAdapter {
  private token: string | null = null;
  private tokenExpiration: number = 0;
  private tokenPromise: Promise<string> | null = null;

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly hostname: string
  ) {}

  private async authenticate(): Promise<string> {
    try {
      const response = await fetch(`https://${this.hostname}/v1/security/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }).toString(),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Authentication error response:', error);
        throw new Error(error.error_description || 'Failed to authenticate');
      }

      const data = await response.json();
      this.token = data.access_token;
      this.tokenExpiration = Date.now() + ((data.expires_in - 60) * 1000); // Expire 1 minute early
      return this.token;
    } catch (error) {
      console.error('Amadeus authentication error:', error);
      throw new Error('Failed to authenticate with Amadeus API');
    }
  }

  private async getToken(): Promise<string> {
    try {
      // If we have a valid token, return it
      if (this.token && Date.now() < this.tokenExpiration) {
        return this.token;
      }

      // If we're already getting a token, wait for that promise
      if (this.tokenPromise) {
        return this.tokenPromise;
      }

      // Otherwise, get a new token
      this.tokenPromise = this.authenticate();
      const token = await this.tokenPromise;
      return token;
    } catch (error) {
      this.token = null;
      this.tokenExpiration = 0;
      throw error;
    } finally {
      this.tokenPromise = null;
    }
  }

  public async searchFlightOffers(params: Record<string, string>) {
    try {
      const token = await this.getToken();
      
      const queryString = new URLSearchParams(params).toString();
      const url = `https://${this.hostname}/v2/shopping/flight-offers?${queryString}`;
      
      console.log('Making request to:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Flight search error:', error);
        throw {
          response: {
            statusCode: response.status,
            code: error.errors?.[0]?.code || 'UNKNOWN_ERROR',
            description: error.errors?.[0]?.detail || 'Une erreur est survenue lors de la recherche'
          }
        };
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching flight offers:', error);
      throw error;
    }
  }
}

class AmadeusClient {
  private static instance: AmadeusAdapter | null = null;

  private constructor() {}

  public static getInstance(): AmadeusAdapter {
    if (!this.instance) {
      const { clientId, clientSecret, hostname } = config.amadeus;

      if (!clientId || !clientSecret) {
        console.error('Missing Amadeus credentials:', { clientId, clientSecret });
        throw new Error('Les clés API Amadeus ne sont pas configurées');
      }

      this.instance = new AmadeusAdapter(clientId, clientSecret, hostname);
    }

    return this.instance;
  }

  public static resetInstance(): void {
    this.instance = null;
  }
}

export default AmadeusClient;