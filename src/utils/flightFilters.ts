import { FlightPair, FlightFilters } from '../types';
import { checkDepartureTime } from './timeUtils';
import { getDurationHours } from './durationUtils';
import { getFlightPairPrice } from './flightPairs';

export function filterFlightPairs(
  pairs: Map<string, FlightPair>, 
  filters: FlightFilters
): FlightPair[] {
  return Array.from(pairs.values()).filter(pair => 
    meetsAllCriteria(pair, filters)
  );
}

function meetsAllCriteria(pair: FlightPair, filters: FlightFilters): boolean {
  if (!pair?.outbound) return false;
  
  // Vérifier le prix total
  const totalPrice = getFlightPairPrice(pair);
  if (totalPrice > filters.maxPrice) return false;

  // Vérifier les compagnies aériennes
  if (filters.airlines.length > 0) {
    const pairAirlines = [pair.outbound.airline];
    if (pair.return) pairAirlines.push(pair.return.airline);
    if (!pairAirlines.some(airline => filters.airlines.includes(airline))) {
      return false;
    }
  }

  // Vérifier les escales
  if (!meetsStopsCriteria(pair.outbound.stops, filters.stops)) return false;
  if (pair.return && !meetsStopsCriteria(pair.return.stops, filters.stops)) return false;

  // Vérifier les heures de départ
  if (!checkDepartureTime(pair.outbound.departure.time, filters.departureTime)) return false;
  if (pair.return && !checkDepartureTime(pair.return.departure.time, filters.departureTime)) return false;

  // Vérifier la durée
  if (getDurationHours(pair.outbound.duration) > filters.duration) return false;
  if (pair.return && getDurationHours(pair.return.duration) > filters.duration) return false;

  return true;
}

function meetsStopsCriteria(stops: number, filterValue: string): boolean {
  switch (filterValue) {
    case 'direct': return stops === 0;
    case '1': return stops === 1;
    case '2': return stops >= 2;
    default: return true;
  }
}