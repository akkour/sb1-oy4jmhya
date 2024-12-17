import { SearchData, Flight } from '../../types';
import { addHours, parseISO, format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const MOCK_AIRLINES = ['AF', 'KL', 'LH', 'BA', 'IB', 'AZ', 'LX'];
const MOCK_PRICES = [150, 200, 250, 300, 350, 400, 450];
const MOCK_DURATIONS = ['2H30M', '3H15M', '4H00M', '3H45M', '2H45M'];

export function getMockFlightResults(searchData: SearchData): Flight[] {
  const flights: Flight[] = [];
  const isRoundTrip = !!searchData.returnDate;

  // Générer 5 vols aller
  for (let i = 0; i < 5; i++) {
    const departureTime = parseISO(searchData.departDate);
    const arrivalTime = addHours(departureTime, 2 + Math.random() * 3);
    const airline = MOCK_AIRLINES[Math.floor(Math.random() * MOCK_AIRLINES.length)];
    const price = MOCK_PRICES[Math.floor(Math.random() * MOCK_PRICES.length)];
    const duration = MOCK_DURATIONS[Math.floor(Math.random() * MOCK_DURATIONS.length)];

    const outboundFlight: Flight = {
      id: uuidv4(),
      type: isRoundTrip ? 'outbound' : undefined,
      airline,
      flightNumber: `${airline}${100 + Math.floor(Math.random() * 900)}`,
      departure: {
        airport: searchData.from,
        time: format(departureTime, "yyyy-MM-dd'T'HH:mm:ss'Z'")
      },
      arrival: {
        airport: searchData.to,
        time: format(arrivalTime, "yyyy-MM-dd'T'HH:mm:ss'Z'")
      },
      duration,
      price,
      stops: Math.floor(Math.random() * 2),
      segments: [{
        departure: {
          airport: searchData.from,
          time: format(departureTime, "yyyy-MM-dd'T'HH:mm:ss'Z'")
        },
        arrival: {
          airport: searchData.to,
          time: format(arrivalTime, "yyyy-MM-dd'T'HH:mm:ss'Z'")
        },
        duration,
        carrier: airline,
        flightNumber: `${airline}${100 + Math.floor(Math.random() * 900)}`
      }],
      class: searchData.class
    };

    flights.push(outboundFlight);

    // Générer le vol retour correspondant si nécessaire
    if (isRoundTrip && searchData.returnDate) {
      const returnDepartureTime = parseISO(searchData.returnDate);
      const returnArrivalTime = addHours(returnDepartureTime, 2 + Math.random() * 3);

      const returnFlight: Flight = {
        id: uuidv4(),
        type: 'return',
        linkedFlightId: outboundFlight.id,
        airline,
        flightNumber: `${airline}${100 + Math.floor(Math.random() * 900)}`,
        departure: {
          airport: searchData.to,
          time: format(returnDepartureTime, "yyyy-MM-dd'T'HH:mm:ss'Z'")
        },
        arrival: {
          airport: searchData.from,
          time: format(returnArrivalTime, "yyyy-MM-dd'T'HH:mm:ss'Z'")
        },
        duration,
        price,
        stops: Math.floor(Math.random() * 2),
        segments: [{
          departure: {
            airport: searchData.to,
            time: format(returnDepartureTime, "yyyy-MM-dd'T'HH:mm:ss'Z'")
          },
          arrival: {
            airport: searchData.from,
            time: format(returnArrivalTime, "yyyy-MM-dd'T'HH:mm:ss'Z'")
          },
          duration,
          carrier: airline,
          flightNumber: `${airline}${100 + Math.floor(Math.random() * 900)}`
        }],
        class: searchData.class
      };

      flights.push(returnFlight);
    }
  }

  return flights;
}