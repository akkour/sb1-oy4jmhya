import { parseISO } from 'date-fns';

export function checkDepartureTime(time: string, filter: string): boolean {
  const departureHour = parseISO(time).getHours();
  
  switch (filter) {
    case 'morning':
      return departureHour >= 6 && departureHour < 12;
    case 'afternoon':
      return departureHour >= 12 && departureHour < 18;
    case 'evening':
      return departureHour >= 18 && departureHour < 24;
    case 'night':
      return departureHour >= 0 && departureHour < 6;
    default:
      return true;
  }
}