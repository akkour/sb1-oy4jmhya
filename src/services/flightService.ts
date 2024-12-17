import { SearchData, Flight } from '../types';

// Cette interface pourra être étendue selon l'API choisie
interface FlightAPIResponse {
  flights: Flight[];
  // autres données potentielles comme la pagination, les métadonnées, etc.
}

export class FlightService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async searchFlights(searchData: SearchData): Promise<Flight[]> {
    try {
      const response = await fetch(`${this.baseUrl}/flights/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(searchData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche de vols');
      }

      const data: FlightAPIResponse = await response.json();
      return data.flights;
    } catch (error) {
      console.error('Erreur lors de la recherche de vols:', error);
      throw error;
    }
  }

  // Méthode pour récupérer les détails d'un vol spécifique
  async getFlightDetails(flightId: string): Promise<Flight> {
    try {
      const response = await fetch(`${this.baseUrl}/flights/${flightId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des détails du vol');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du vol:', error);
      throw error;
    }
  }

  // Méthode pour récupérer l'historique des prix
  async getPriceHistory(route: { from: string; to: string }): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/flights/price-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(route)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'historique des prix');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique des prix:', error);
      throw error;
    }
  }
}