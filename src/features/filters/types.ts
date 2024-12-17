import { FlightFilters } from '../../types';

export interface FilterSectionProps {
  filters: FlightFilters;
  onFilterChange: (filters: Partial<FlightFilters>) => void;
  airlines: string[];
  maxAvailablePrice: number;
}