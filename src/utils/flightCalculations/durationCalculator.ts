export function calculateLayoverDuration(arrivalTime: string, nextDepartureTime: string): string {
  const arrival = new Date(arrivalTime);
  const departure = new Date(nextDepartureTime);
  const durationInMinutes = Math.round((departure.getTime() - arrival.getTime()) / (1000 * 60));
  
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
}

export function formatDuration(duration: string): string {
  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);
  
  let result = '';
  if (hours) result += `${hours[1]}h `;
  if (minutes) result += `${minutes[1]}m`;
  
  return result.trim();
}