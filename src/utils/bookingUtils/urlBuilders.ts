import { Flight } from '../../types/flight';
import { getAirlineInfo } from '../airlineUtils';
import { cabinClassMapping } from './cabinClassMapping';

export function buildSkyscannerUrl(flight: Flight, returnFlight?: Flight): string {
  const baseUrl = 'https://www.skyscanner.fr/transport/vols';
  const cabinClass = cabinClassMapping[flight.class]?.skyscanner || 'economy';
  
  const params = new URLSearchParams({
    from: flight.departure.airport,
    to: flight.arrival.airport,
    date: flight.departure.time.split('T')[0],
    adults: '1',
    cabinclass: cabinClass
  });

  if (returnFlight) {
    params.append('return', returnFlight.departure.time.split('T')[0]);
  }

  return `${baseUrl}?${params.toString()}`;
}

export function buildKayakUrl(flight: Flight, returnFlight?: Flight): string {
  const baseUrl = 'https://www.kayak.fr/flights';
  const cabinClass = cabinClassMapping[flight.class]?.kayak || 'economy';
  
  const params = new URLSearchParams({
    origin: flight.departure.airport,
    destination: flight.arrival.airport,
    depart: flight.departure.time.split('T')[0],
    travelers: '1',
    cabin: cabinClass
  });

  if (returnFlight) {
    params.append('return', returnFlight.departure.time.split('T')[0]);
  }

  return `${baseUrl}?${params.toString()}`;
}

export function buildDirectBookingUrl(flight: Flight, returnFlight?: Flight): string {
  const airline = getAirlineInfo(flight.airline);
  const baseUrl = airline.directBookingUrl || airline.bookingUrl;
  
  const params = new URLSearchParams({
    origin: flight.departure.airport,
    destination: flight.arrival.airport,
    date: flight.departure.time.split('T')[0],
    ...(returnFlight && { returnDate: returnFlight.departure.time.split('T')[0] }),
    cabin: flight.class,
    adults: '1'
  });

  return `${baseUrl}?${params.toString()}`;
}