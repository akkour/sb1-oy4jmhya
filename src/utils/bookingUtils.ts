import { Flight } from '../types';
import { getAirlineInfo } from './airlineUtils';
import { format } from 'date-fns';

export function getBookingUrl(outboundFlight: Flight, returnFlight?: Flight): string {
  const airline = getAirlineInfo(outboundFlight.airline);
  const departDate = format(new Date(outboundFlight.departure.time), 'yyyy-MM-dd');
  const returnDate = returnFlight 
    ? format(new Date(returnFlight.departure.time), 'yyyy-MM-dd')
    : undefined;
  
  const tripType = returnFlight ? 'ROUND_TRIP' : 'ONE_WAY';
  
  // Construire l'URL avec les paramètres spécifiques à chaque compagnie
  switch (outboundFlight.airline) {
    case 'AF':
      return `${airline.bookingUrl}?tripType=${tripType}&cabin=${outboundFlight.class}&adults=1&origin=${outboundFlight.departure.airport}&destination=${outboundFlight.arrival.airport}&departureDate=${departDate}${returnDate ? `&returnDate=${returnDate}` : ''}`;
    
    case 'KL':
      return `${airline.bookingUrl}?type=${tripType}&cabin=${outboundFlight.class}&adults=1&origin=${outboundFlight.departure.airport}&destination=${outboundFlight.arrival.airport}&departureDate=${departDate}${returnDate ? `&returnDate=${returnDate}` : ''}`;
    
    case 'LH':
      return `${airline.bookingUrl}?origin=${outboundFlight.departure.airport}&destination=${outboundFlight.arrival.airport}&departureDate=${departDate}${returnDate ? `&returnDate=${returnDate}` : ''}&cabin=${outboundFlight.class}&adult=1`;
    
    case 'BA':
      return `${airline.bookingUrl}?origin=${outboundFlight.departure.airport}&destination=${outboundFlight.arrival.airport}&departureDate=${departDate}${returnDate ? `&returnDate=${returnDate}` : ''}&cabin=${outboundFlight.class}&adults=1`;
    
    case 'IB':
      return `${airline.bookingUrl}?origin=${outboundFlight.departure.airport}&destination=${outboundFlight.arrival.airport}&outbound=${departDate}${returnDate ? `&inbound=${returnDate}` : ''}&cabin=${outboundFlight.class}&adults=1`;
    
    case 'AZ':
      return `${airline.bookingUrl}?origin=${outboundFlight.departure.airport}&destination=${outboundFlight.arrival.airport}&outDate=${departDate}${returnDate ? `&inDate=${returnDate}` : ''}&cabin=${outboundFlight.class}&adults=1`;
    
    case 'LX':
      return `${airline.bookingUrl}?origin=${outboundFlight.departure.airport}&destination=${outboundFlight.arrival.airport}&outbound=${departDate}${returnDate ? `&inbound=${returnDate}` : ''}&cabin=${outboundFlight.class}&adults=1`;
    
    default:
      // Si la compagnie n'est pas gérée, utiliser l'URL de base
      return airline.bookingUrl;
  }
}