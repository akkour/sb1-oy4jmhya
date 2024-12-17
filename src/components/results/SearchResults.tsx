import React, { useState, useMemo, useEffect } from 'react';
import { Flight } from '../../types';
import { FlightPairCard } from './FlightPairCard';
import { FlightDetails } from './FlightDetails';
import { useFlightFilters } from '../../hooks/useFlightFilters';
import { FilterSection } from './FilterSection';

interface SearchResultsProps {
  flights: Flight[];
  loading?: boolean;
}

export function SearchResults({ flights, loading }: SearchResultsProps) {
  // Calculer le prix maximum disponible
  const maxAvailablePrice = useMemo(() => {
    if (flights.length === 0) return 1000;
    
    // Pour les vols aller-retour, calculer le prix total maximum possible
    const prices = flights.map(flight => {
      if (flight.type === 'outbound') {
        const returnFlight = flights.find(f => f.type === 'return' && f.linkedFlightId === flight.id);
        return returnFlight ? flight.price + returnFlight.price : flight.price;
      }
      return flight.type === 'return' ? 0 : flight.price; // Ignorer les vols retour dans le calcul initial
    });
    
    return Math.max(...prices.filter(p => p > 0));
  }, [flights]);

  const [selectedFlightPair, setSelectedFlightPair] = useState<{
    outbound: Flight;
    return?: Flight;
  } | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: maxAvailablePrice,
    stops: 'any',
    airlines: [] as string[],
    departureTime: 'any',
    duration: 24,
    sort: 'price'
  });

  // Réinitialiser les filtres avec le nouveau prix maximum quand les vols changent
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      maxPrice: maxAvailablePrice,
      stops: 'any',
      airlines: [],
      departureTime: 'any',
      duration: 24,
      sort: 'price'
    }));
  }, [maxAvailablePrice, flights]);

  const filteredFlights = useFlightFilters(flights, filters);

  // Grouper les vols par paires aller-retour
  const flightPairs = useMemo(() => {
    const pairs: { outbound: Flight; return?: Flight }[] = [];
    const outboundFlights = filteredFlights.filter(f => !f.type || f.type === 'outbound');
    
    outboundFlights.forEach(outbound => {
      const returnFlight = filteredFlights.find(
        f => f.type === 'return' && f.linkedFlightId === outbound.id
      );
      pairs.push({ outbound, return: returnFlight });
    });

    return pairs;
  }, [filteredFlights]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Veuillez effectuer une recherche pour voir les vols disponibles.</p>
      </div>
    );
  }

  if (flightPairs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun vol ne correspond à vos critères.</p>
        <p className="text-sm text-gray-400 mt-2">
          Essayez d'ajuster vos filtres ou de modifier votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <FilterSection
          filters={filters}
          onFilterChange={setFilters}
          airlines={Array.from(new Set(flights.map(f => f.airline)))}
          maxAvailablePrice={maxAvailablePrice}
        />
      </div>
      <div className="lg:col-span-3 space-y-4">
        {flightPairs.map(({ outbound, return: returnFlight }) => (
          <FlightPairCard
            key={outbound.id}
            outbound={outbound}
            return={returnFlight}
            onShowDetails={() => {
              setSelectedFlightPair({ outbound, return: returnFlight });
              setShowDetails(true);
            }}
          />
        ))}
      </div>

      {showDetails && selectedFlightPair && (
        <FlightDetails
          flight={selectedFlightPair.outbound}
          returnFlight={selectedFlightPair.return}
          onClose={() => {
            setShowDetails(false);
            setSelectedFlightPair(null);
          }}
        />
      )}
    </div>
  );
}