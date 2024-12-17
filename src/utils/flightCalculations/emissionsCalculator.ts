const CO2_PER_KM = 0.115; // kg de CO2 par km et par passager

export function calculateCO2Emissions(distance: number): number {
  return Math.round(distance * CO2_PER_KM);
}