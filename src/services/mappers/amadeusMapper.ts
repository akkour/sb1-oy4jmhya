import { Flight } from '../../types';
import { formatDuration } from '../../utils/dateUtils';
import { isSameDay, parseISO } from 'date-fns';

interface MapperOptions {
  departureDate: string;
  returnDate?: string;
  isOneWay: boolean;
}

export function mapAmadeusToFlightResults(amadeusData: any[], options: MapperOptions): Flight[] {
  if (!Array.isArray(amadeusData) || amadeusData.length === 0) {
    return [];
  }

  const searchDepartureDate = parseISO(options.departureDate);
  const searchReturnDate = options.returnDate ? parseISO(options.returnDate) : null;

  return amadeusData.flatMap(offer => {
    const flights: Flight[] = [];
    const totalPrice = parseFloat(offer.price.total);

    // Vol aller (toujours présent)
    const outboundItinerary = offer.itineraries[0];
    if (!outboundItinerary) return [];

    // Vérifier que la date de départ correspond à la date recherchée
    const outboundDepartureDate = parseISO(outboundItinerary.segments[0].departure.at);
    if (!isSameDay(outboundDepartureDate, searchDepartureDate)) {
      return [];
    }

    const outboundFlight: Flight = {
      id: `${offer.id}-outbound`,
      type: offer.itineraries.length > 1 ? 'outbound' : undefined,
      airline: offer.validatingAirlineCodes[0],
      flightNumber: outboundItinerary.segments[0].number,
      departure: {
        airport: outboundItinerary.segments[0].departure.iataCode,
        time: outboundItinerary.segments[0].departure.at
      },
      arrival: {
        airport: outboundItinerary.segments[outboundItinerary.segments.length - 1].arrival.iataCode,
        time: outboundItinerary.segments[outboundItinerary.segments.length - 1].arrival.at
      },
      duration: formatDuration(outboundItinerary.duration),
      price: offer.itineraries.length > 1 ? totalPrice / 2 : totalPrice,
      stops: outboundItinerary.segments.length - 1,
      segments: outboundItinerary.segments.map((segment: any) => ({
        departure: {
          airport: segment.departure.iataCode,
          time: segment.departure.at
        },
        arrival: {
          airport: segment.arrival.iataCode,
          time: segment.arrival.at
        },
        duration: formatDuration(segment.duration),
        carrier: segment.carrierCode,
        flightNumber: segment.number
      }))
    };

    flights.push(outboundFlight);

    // Vol retour (si présent)
    if (offer.itineraries[1] && searchReturnDate) {
      const returnItinerary = offer.itineraries[1];
      
      // Vérifier que la date de retour correspond à la date recherchée
      const returnDepartureDate = parseISO(returnItinerary.segments[0].departure.at);
      if (!isSameDay(returnDepartureDate, searchReturnDate)) {
        return [];
      }

      const returnFlight: Flight = {
        id: `${offer.id}-return`,
        type: 'return',
        linkedFlightId: outboundFlight.id,
        airline: offer.validatingAirlineCodes[0],
        flightNumber: returnItinerary.segments[0].number,
        departure: {
          airport: returnItinerary.segments[0].departure.iataCode,
          time: returnItinerary.segments[0].departure.at
        },
        arrival: {
          airport: returnItinerary.segments[returnItinerary.segments.length - 1].arrival.iataCode,
          time: returnItinerary.segments[returnItinerary.segments.length - 1].arrival.at
        },
        duration: formatDuration(returnItinerary.duration),
        price: totalPrice / 2,
        stops: returnItinerary.segments.length - 1,
        segments: returnItinerary.segments.map((segment: any) => ({
          departure: {
            airport: segment.departure.iataCode,
            time: segment.departure.at
          },
          arrival: {
            airport: segment.arrival.iataCode,
            time: segment.arrival.at
          },
          duration: formatDuration(segment.duration),
          carrier: segment.carrierCode,
          flightNumber: segment.number
        }))
      };

      flights.push(returnFlight);
    }

    return flights;
  }).filter(Boolean);
}