import { airports } from '../data/airports';

interface Coordinates {
  lat: number;
  lng: number;
}

// Coordonnées approximatives des aéroports (à compléter avec des données réelles)
const airportCoordinates: Record<string, Coordinates> = {
  'CDG': { lat: 49.0097, lng: 2.5479 },
  'LHR': { lat: 51.4700, lng: -0.4543 },
  'FRA': { lat: 50.0379, lng: 8.5622 },
  // Ajouter d'autres aéroports selon les besoins
};

function getAirportCoordinates(code: string): Coordinates {
  return airportCoordinates[code] || { lat: 0, lng: 0 };
}

function calculateDistanceFromCoordinates(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

function toRad(value: number): number {
  return value * Math.PI / 180;
}

export function calculateDistance(fromAirport: string, toAirport: string): number {
  const from = getAirportCoordinates(fromAirport);
  const to = getAirportCoordinates(toAirport);
  return calculateDistanceFromCoordinates(from, to);
}

export function calculateCO2Emissions(distance: number): number {
  // Moyenne approximative des émissions en kg de CO2 par km et par passager
  const CO2_PER_KM = 0.115;
  return Math.round(distance * CO2_PER_KM);
}

export function calculateLayoverDuration(
  arrivalTime: string,
  nextDepartureTime: string
): string {
  const arrival = new Date(arrivalTime);
  const departure = new Date(nextDepartureTime);
  const durationInMinutes = Math.round((departure.getTime() - arrival.getTime()) / (1000 * 60));
  
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
}