import { Flight } from '../types';

export function calculateMaxPrice(flights: Flight[]): number {
  if (!flights?.length) return 1000;

  const prices = flights.map(flight => {
    if (flight.type === 'outbound') {
      const returnFlight = flights.find(
        f => f.type === 'return' && f.linkedFlightId === flight.id
      );
      return returnFlight ? flight.price + returnFlight.price : flight.price;
    }
    return flight.type === 'return' ? 0 : flight.price;
  });

  // S'assurer qu'il y a au moins un prix valide
  const validPrices = prices.filter(p => p > 0);
  if (validPrices.length === 0) return 1000;

  // Arrondir au multiple de 100 supérieur
  const maxPrice = Math.max(...validPrices);
  return Math.ceil(maxPrice / 100) * 100;
}

export function getFlightPairPrice(outbound: Flight, returnFlight?: Flight): number {
  return returnFlight ? outbound.price + returnFlight.price : outbound.price;
}