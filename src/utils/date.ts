export function getDurationMinutes(departureTimestamp: string, arrivalTimestamp: string): number {
  const ms = new Date(arrivalTimestamp).getTime() - new Date(departureTimestamp).getTime();
  return Math.round(ms / 60000);
}
