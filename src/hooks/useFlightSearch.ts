import { useState } from 'react';
import { SearchData, Flight } from '../types';
import FlightApi from '../services/api/flightApi';
import { ApiError } from '../services/utils/errorHandler';

export function useFlightSearch() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchFlights = async (searchData: SearchData) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await FlightApi.searchFlights(searchData);
      setFlights(results);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Une erreur inattendue est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    flights,
    loading,
    error,
    searchFlights
  };
}