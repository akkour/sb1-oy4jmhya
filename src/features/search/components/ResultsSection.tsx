import React, { useState } from 'react';
import { Flight, FlightFilters } from '../../../types';
import { FilterSection } from '../../filters/components/FilterSection';
import { FlightList } from '../../flights/components/FlightList';
import { FlightDetails } from '../../flights/components/FlightDetails';
import { useFlightFilters } from '../../../hooks/useFlightFilters';
import { calculateMaxPrice } from '../../../utils/priceUtils';

interface ResultsSectionProps {
  flights: Flight[];
  loading: boolean;
  filters: FlightFilters;
  onFilterChange: (filters: Partial<FlightFilters>) => void;
  onResetFilters: () => void;
}

export function ResultsSection({
  flights,
  loading,
  filters,
  onFilterChange,
  onResetFilters
}: ResultsSectionProps) {
  const filteredFlights = useFlightFilters(flights, filters);
  const [selectedFlightPair, setSelectedFlightPair] = useState<{
    outbound: Flight;
    return?: Flight;
  } | null>(null);

  // Calculer le prix maximum une seule fois
  const maxAvailablePrice = React.useMemo(() => 
    calculateMaxPrice(flights), [flights]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSection
            filters={filters}
            onFilterChange={onFilterChange}
            airlines={Array.from(new Set(flights.map(f => f.airline)))}
            maxAvailablePrice={maxAvailablePrice}
          />
        </div>
        <div className="lg:col-span-3">
          <FlightList
            flights={filteredFlights}
            onShowDetails={(outbound, returnFlight) => {
              setSelectedFlightPair({ outbound, return: returnFlight });
            }}
          />
        </div>
      </div>

      {selectedFlightPair && (
        <FlightDetails
          flight={selectedFlightPair.outbound}
          returnFlight={selectedFlightPair.return}
          onClose={() => setSelectedFlightPair(null)}
        />
      )}
    </>
  );
}