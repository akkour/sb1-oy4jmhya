import { Flight, FlightPair } from '../types';

export function groupFlightPairs(flights: Flight[]): Map<string, FlightPair> {
  const flightPairs = new Map<string, FlightPair>();
  
  flights.forEach(flight => {
    if (flight.type === 'return') return;

    const returnFlight = flight.type === 'outbound' 
      ? flights.find(f => f.type === 'return' && f.linkedFlightId === flight.id)
      : undefined;

    flightPairs.set(flight.id, { outbound: flight, return: returnFlight });
  });

  return flightPairs;
}

export function getFlightPairPrice(pair: FlightPair): number {
  return pair.return 
    ? pair.outbound.price + pair.return.price 
    : pair.outbound.price;
}