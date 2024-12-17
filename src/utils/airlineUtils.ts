import { airlines } from '../data/airlines';

export function getAirlineInfo(code: string) {
  const airline = airlines.find(a => a.code === code);
  return {
    code,
    name: airline?.name || code,
    logo: airline?.logo || `https://images.kiwi.com/airlines/64/${code}.png`,
    bookingUrl: airline?.bookingUrl || `https://www.google.com/flights?q=${code}`
  };
}