import { SearchData, Flight } from '../../../types';
import FlightApi from '../../../services/api/flightApi';

export async function searchFlights(searchData: SearchData): Promise<Flight[]> {
  try {
    return await FlightApi.searchFlights(searchData);
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
}