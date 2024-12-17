import { format, formatDuration as formatDurationFns } from 'date-fns';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';
import { fr } from 'date-fns/locale';
import { airports } from '../data/airports';

export function formatDuration(duration: string): string {
  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);
  
  let result = '';
  if (hours) result += `${hours[1]}h `;
  if (minutes) result += `${minutes[1]}m`;
  
  return result.trim();
}

export function getAirportTimezone(airportCode: string): string {
  const airport = airports.find(a => a.code === airportCode);
  return airport?.timezone || 'UTC';
}

export function formatDateTime(dateTime: string, airportCode: string): string {
  const timezone = getAirportTimezone(airportCode);
  return formatInTimeZone(
    new Date(dateTime),
    timezone,
    'HH:mm',
    { locale: fr }
  );
}

export function formatDate(dateTime: string, airportCode: string): string {
  const timezone = getAirportTimezone(airportCode);
  return formatInTimeZone(
    new Date(dateTime),
    timezone,
    'dd/MM/yyyy',
    { locale: fr }
  );
}

export function convertToLocalTime(
  dateTime: string,
  fromAirport: string,
  toAirport: string
): string {
  const fromTimezone = getAirportTimezone(fromAirport);
  const toTimezone = getAirportTimezone(toAirport);
  
  const utcTime = zonedTimeToUtc(new Date(dateTime), fromTimezone);
  return formatInTimeZone(utcTime, toTimezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
}