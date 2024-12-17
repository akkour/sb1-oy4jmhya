import { Flight } from '../../../types';

export function calculateMaxPrice(flights: Flight[]): number {
  if (flights.length === 0) return 1000;

  const prices = flights.map(flight => {
    if (flight.type === 'outbound') {
      const returnFlight = flights.find(
        f => f.type === 'return' && f.linkedFlightId === flight.id
      );
      return returnFlight ? flight.price + returnFlight.price : flight.price;
    }
    return flight.type === 'return' ? 0 : flight.price;
  });

  const maxPrice = Math.max(...prices.filter(p => p > 0));
  return Math.ceil(maxPrice / 100) * 100;
}