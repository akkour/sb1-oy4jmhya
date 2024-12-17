import { useState, useCallback } from 'react';
import { SearchState, SearchActions } from '../types';
import { searchFlights } from '../api/searchApi';
import { calculateMaxPrice } from '../utils/priceUtils';

const initialFilters = {
  maxPrice: 1000,
  stops: 'any',
  airlines: [],
  departureTime: 'any',
  duration: 24,
  sort: 'price'
};

const initialState: SearchState = {
  searchData: null,
  flights: [],
  loading: false,
  error: null,
  filters: initialFilters
};

export function useSearch(): [SearchState, SearchActions] {
  const [state, setState] = useState<SearchState>(initialState);

  const search = useCallback(async (searchData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await searchFlights(searchData);
      
      if (!results?.length) {
        setState(prev => ({
          ...prev,
          searchData,
          flights: [],
          loading: false,
          error: 'Aucun vol trouvé pour votre recherche.'
        }));
        return;
      }

      // Calculer le prix maximum en tenant compte des vols aller-retour
      const maxPrice = calculateMaxPrice(results);

      setState(prev => ({
        ...prev,
        searchData,
        flights: results,
        loading: false,
        error: null,
        filters: { 
          ...initialFilters,
          maxPrice 
        }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    }
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters }
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filters: {
        ...initialFilters,
        maxPrice: calculateMaxPrice(prev.flights)
      }
    }));
  }, []);

  const resetSearch = useCallback(() => {
    setState(initialState);
  }, []);

  return [
    state,
    { search, updateFilters, resetFilters, resetSearch }
  ];
}