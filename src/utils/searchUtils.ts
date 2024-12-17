import { airports } from '../data/airports';
import type { Airport } from '../types';

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function searchAirports(query: string): Airport[] {
  const normalizedQuery = normalizeString(query);
  
  if (!normalizedQuery) return [];

  // Créer un score pour chaque aéroport
  const scoredAirports = airports.map(airport => {
    let score = 0;
    const normalizedCity = normalizeString(airport.city);
    const normalizedCountry = normalizeString(airport.country);
    const normalizedName = normalizeString(airport.name);
    const normalizedCode = normalizeString(airport.code);

    // Correspondance exacte avec le code IATA
    if (normalizedCode === normalizedQuery) score += 100;
    if (normalizedCode.startsWith(normalizedQuery)) score += 50;

    // Correspondance avec la ville
    if (normalizedCity === normalizedQuery) score += 80;
    if (normalizedCity.startsWith(normalizedQuery)) score += 40;
    if (normalizedCity.includes(normalizedQuery)) score += 20;

    // Correspondance avec le pays
    if (normalizedCountry === normalizedQuery) score += 60;
    if (normalizedCountry.startsWith(normalizedQuery)) score += 30;
    if (normalizedCountry.includes(normalizedQuery)) score += 15;

    // Correspondance avec le nom de l'aéroport
    if (normalizedName.includes(normalizedQuery)) score += 10;

    return { airport, score };
  });

  // Filtrer les résultats avec un score > 0 et trier par score
  return scoredAirports
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.airport)
    .slice(0, 8); // Limiter à 8 résultats
}