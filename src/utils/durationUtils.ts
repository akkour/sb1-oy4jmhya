export function getDurationHours(duration: string): number {
  const [hours] = duration.split('h').map(Number);
  return hours || 0;
}

export function formatDuration(duration: string): string {
  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);
  
  let result = '';
  if (hours) result += `${hours[1]}h `;
  if (minutes) result += `${minutes[1]}m`;
  
  return result.trim();
}