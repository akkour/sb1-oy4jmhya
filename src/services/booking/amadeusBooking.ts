import AmadeusClient from '../api/amadeusClient';
import { Flight } from '../../types';

export class AmadeusBookingService {
  private readonly client: ReturnType<typeof AmadeusClient.getInstance>;

  constructor() {
    this.client = AmadeusClient.getInstance();
  }

  async createFlightOrder(flight: Flight, passengers: any[]) {
    try {
      // Vérifier si l'API Amadeus permet la réservation directe
      const response = await this.client.createOrder({
        data: {
          type: 'flight-order',
          flightOffers: [flight],
          travelers: passengers
        }
      });

      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw new Error('La réservation directe n\'est pas disponible pour le moment');
    }
  }

  async getFlightPrice(flight: Flight) {
    try {
      const response = await this.client.priceFlight({
        data: {
          type: 'flight-offers-pricing',
          flightOffers: [flight]
        }
      });

      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération du prix:', error);
      throw error;
    }
  }
}