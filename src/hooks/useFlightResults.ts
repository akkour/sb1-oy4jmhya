import { useState, useCallback } from 'react';
import { Flight, SearchData, FlightFilters } from '../types';
import FlightApi from '../services/api/flightApi';
import { calculateMaxPrice } from '../utils/priceUtils';

export function useFlightResults() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [filters, setFilters] = useState<FlightFilters>({
    maxPrice: 1000,
    stops: 'any',
    airlines: [],
    departureTime: 'any',
    duration: 24,
    sort: 'price'
  });

  const searchFlights = useCallback(async (searchData: SearchData) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await FlightApi.searchFlights(searchData);
      
      if (results.length === 0) {
        setError('Aucun vol trouvé pour votre recherche.');
        setFlights([]);
      } else {
        setFlights(results);
        // Calculer le prix maximum en fonction des résultats
        const maxPrice = calculateMaxPrice(results);
        setFilters(prev => ({ ...prev, maxPrice }));
      }
      
      setSearchPerformed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la recherche:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<FlightFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    const maxPrice = calculateMaxPrice(flights);
    setFilters({
      maxPrice,
      stops: 'any',
      airlines: [],
      departureTime: 'any',
      duration: 24,
      sort: 'price'
    });
  }, [flights]);

  return {
    flights,
    loading,
    error,
    searchPerformed,
    filters,
    searchFlights,
    updateFilters,
    resetFilters
  };
}