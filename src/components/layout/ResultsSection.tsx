import React from 'react';
import { SearchResults } from '../search/SearchResults';
import { SearchFilters } from '../search/SearchFilters';
import { Flight } from '../../types';
import { useFlightFilters } from '../../hooks/useFlightFilters';

interface ResultsSectionProps {
  flights: Flight[];
  loading: boolean;
  onFilterChange: (filters: any) => void;
}

export function ResultsSection({ flights, loading }: ResultsSectionProps) {
  const [filters, setFilters] = React.useState({
    maxPrice: 1000,
    stops: 'any',
    airlines: [] as string[],
    departureTime: 'any',
    duration: 24,
    sort: 'price'
  });

  const filteredFlights = useFlightFilters(flights, filters);

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <SearchFilters
          filters={filters}
          onFilterChange={(newFilters) => setFilters(newFilters)}
          airlines={Array.from(new Set(flights.map(f => f.airline)))}
        />
      </div>
      <div className="lg:col-span-3">
        <SearchResults flights={filteredFlights} loading={loading} />
      </div>
    </div>
  );
}