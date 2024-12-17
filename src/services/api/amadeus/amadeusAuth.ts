import { config } from '../../../config/environment';

export class AmadeusAuth {
  private token: string | null = null;
  private tokenExpiration: number = 0;
  private tokenPromise: Promise<string> | null = null;

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly hostname: string
  ) {}

  public async getToken(): Promise<string> {
    if (this.token && Date.now() < this.tokenExpiration) {
      return this.token;
    }

    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    this.tokenPromise = this.authenticate();
    try {
      const token = await this.tokenPromise;
      return token;
    } finally {
      this.tokenPromise = null;
    }
  }

  private async authenticate(): Promise<string> {
    try {
      console.log('Authenticating with Amadeus...', {
        hostname: this.hostname,
        hasClientId: !!this.clientId,
        hasClientSecret: !!this.clientSecret
      });

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
      this.tokenExpiration = Date.now() + ((data.expires_in - 60) * 1000);
      return this.token;
    } catch (error) {
      console.error('Amadeus authentication error:', error);
      throw new Error('Failed to authenticate with Amadeus API');
    }
  }
}

let instance: AmadeusAuth | null = null;

export function getAmadeusAuth(): AmadeusAuth {
  if (!instance) {
    const { clientId, clientSecret, hostname } = config.amadeus;
    
    if (!clientId || !clientSecret) {
      throw new Error('Missing Amadeus API credentials');
    }
    
    instance = new AmadeusAuth(clientId, clientSecret, hostname);
  }
  
  return instance;
}