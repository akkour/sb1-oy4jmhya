import { Coordinates } from '../../types';

const EARTH_RADIUS = 6371; // Rayon de la Terre en km

export function calculateDistanceFromCoordinates(coord1: Coordinates, coord2: Coordinates): number {
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(EARTH_RADIUS * c);
}

function toRad(value: number): number {
  return value * Math.PI / 180;
}