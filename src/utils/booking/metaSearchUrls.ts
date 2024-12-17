import { Flight } from '../../types';
import { format } from 'date-fns';

const CABIN_CLASS_MAPPING = {
  ECONOMY: { skyscanner: 'economy', kayak: 'e' },
  PREMIUM_ECONOMY: { skyscanner: 'premiumeconomy', kayak: 'p' },
  BUSINESS: { skyscanner: 'business', kayak: 'b' },
  FIRST: { skyscanner: 'first', kayak: 'f' }
};

export function buildSkyscannerUrl(flight: Flight, returnFlight?: Flight): string {
  const departDate = format(new Date(flight.departure.time), 'yyyy-MM-dd');
  const returnDate = returnFlight 
    ? format(new Date(returnFlight.departure.time), 'yyyy-MM-dd')
    : undefined;

  const cabinClass = CABIN_CLASS_MAPPING[flight.class]?.skyscanner || 'economy';
  
  const url = new URL('https://www.skyscanner.fr/transport/vols');
  url.searchParams.set('from', flight.departure.airport);
  url.searchParams.set('to', flight.arrival.airport);
  url.searchParams.set('depart', departDate);
  if (returnDate) {
    url.searchParams.set('return', returnDate);
  }
  url.searchParams.set('cabinclass', cabinClass);
  url.searchParams.set('adults', '1');

  return url.toString();
}

export function buildKayakUrl(flight: Flight, returnFlight?: Flight): string {
  const departDate = format(new Date(flight.departure.time), 'yyyy-MM-dd');
  const returnDate = returnFlight 
    ? format(new Date(returnFlight.departure.time), 'yyyy-MM-dd')
    : undefined;

  const cabinClass = CABIN_CLASS_MAPPING[flight.class]?.kayak || 'e';

  const url = new URL('https://www.kayak.fr/flights');
  url.searchParams.set('origin', flight.departure.airport);
  url.searchParams.set('destination', flight.arrival.airport);
  url.searchParams.set('depart', departDate);
  if (returnDate) {
    url.searchParams.set('return', returnDate);
  }
  url.searchParams.set('cabin', cabinClass);
  url.searchParams.set('sort', 'price_a');
  url.searchParams.set('travelers', '1');

  return url.toString();
}