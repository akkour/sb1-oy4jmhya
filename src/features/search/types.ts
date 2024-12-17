import { SearchData, Flight, FlightFilters } from '../../types';

export interface SearchState {
  searchData: SearchData | null;
  flights: Flight[];
  loading: boolean;
  error: string | null;
  filters: FlightFilters;
}

export interface SearchActions {
  search: (data: SearchData) => Promise<void>;
  updateFilters: (filters: Partial<FlightFilters>) => void;
  resetFilters: () => void;
  resetSearch: () => void;
}