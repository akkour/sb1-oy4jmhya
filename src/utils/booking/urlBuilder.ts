import { format } from 'date-fns';
import { Flight } from '../../types';
import { airlines, AirlineCode } from '../../config/airlines';
import { cabinClassMapping } from './cabinClassMapping';

interface BookingUrlOptions {
  flight: Flight;
  returnFlight?: Flight;
  passengers?: number;
}

export function buildAirlineBookingUrl({ flight, returnFlight, passengers = 1 }: BookingUrlOptions): string {
  const airlineCode = flight.airline as AirlineCode;
  const airline = airlines[airlineCode];

  if (!airline) {
    throw new Error(`Compagnie aérienne non supportée: ${flight.airline}`);
  }

  const params = new URLSearchParams();
  const { bookingParams } = airline;

  // Paramètres communs
  params.append(bookingParams.origin, flight.departure.airport);
  params.append(bookingParams.destination, flight.arrival.airport);
  params.append(bookingParams.outbound, format(new Date(flight.departure.time), 'yyyy-MM-dd'));
  params.append(bookingParams.adults, String(passengers));
  params.append(bookingParams.cabin, cabinClassMapping[flight.class]?.[airlineCode] || 'ECONOMY');

  // Paramètres spécifiques par compagnie
  switch (airlineCode) {
    case 'AT': // Royal Air Maroc
      params.append(bookingParams.tripType, returnFlight ? 'RT' : 'OW'); // RT = Round Trip, OW = One Way
      params.append(bookingParams.currency, 'EUR');
      if (returnFlight) {
        params.append(bookingParams.inbound, format(new Date(returnFlight.departure.time), 'yyyy-MM-dd'));
      }
      // Ajout du numéro de vol si disponible
      if (flight.flightNumber) {
        params.append('flight_number', flight.flightNumber);
      }
      break;

    default:
      params.append(bookingParams.tripType, returnFlight ? 'ROUND_TRIP' : 'ONE_WAY');
      if (returnFlight) {
        params.append(bookingParams.inbound, format(new Date(returnFlight.departure.time), 'yyyy-MM-dd'));
      }
  }

  // Construire l'URL finale
  const baseUrl = airline.bookingUrl;
  const queryString = params.toString();

  // Certaines compagnies utilisent # au lieu de ? pour les paramètres
  const separator = airlineCode === 'AT' ? '#' : '?';
  
  return `${baseUrl}${separator}${queryString}`;
}