import { useMemo } from 'react';
import { Flight, FlightFilters } from '../types';
import { filterFlightPairs } from '../utils/flightFilters';
import { groupFlightPairs } from '../utils/flightPairs';
import { sortFlights } from '../utils/flightSorting';

export function useFlightFilters(flights: Flight[], filters: FlightFilters) {
  return useMemo(() => {
    if (!flights?.length) return [];

    // Grouper les vols par paires
    const flightPairs = groupFlightPairs(flights);
    
    // Appliquer les filtres
    const filteredPairs = filterFlightPairs(flightPairs, filters);

    // Convertir les paires en liste de vols
    const filteredFlights: Flight[] = [];
    filteredPairs.forEach(pair => {
      filteredFlights.push(pair.outbound);
      if (pair.return) {
        filteredFlights.push(pair.return);
      }
    });

    // Trier les vols
    return sortFlights(filteredFlights, flights, filters.sort);
  }, [flights, filters]);
}