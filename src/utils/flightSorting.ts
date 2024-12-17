import { Flight } from '../types';

export function sortFlights(
  filteredFlights: Flight[], 
  allFlights: Flight[], 
  sortBy: string
): Flight[] {
  return [...filteredFlights].sort((a, b) => {
    const getPairPrice = (flight: Flight) => {
      if (flight.type === 'return') {
        const outbound = allFlights.find(f => f.id === flight.linkedFlightId);
        return outbound ? outbound.price + flight.price : flight.price;
      }
      const returnFlight = allFlights.find(
        f => f.type === 'return' && f.linkedFlightId === flight.id
      );
      return returnFlight ? flight.price + returnFlight.price : flight.price;
    };

    switch (sortBy) {
      case 'price':
        return getPairPrice(a) - getPairPrice(b);
      case 'duration':
        return compareDuration(a.duration, b.duration);
      case 'departure':
        return new Date(a.departure.time).getTime() - new Date(b.departure.time).getTime();
      case 'arrival':
        return new Date(a.arrival.time).getTime() - new Date(b.arrival.time).getTime();
      default:
        return 0;
    }
  });
}

function compareDuration(durationA: string, durationB: string): number {
  const [hoursA] = durationA.split('h').map(Number);
  const [hoursB] = durationB.split('h').map(Number);
  return (hoursA || 0) - (hoursB || 0);
}