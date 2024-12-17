import React from 'react';
import { Flight } from '../../../types';
import { FlightListItem } from './FlightListItem';
import { groupFlightPairs } from '../../../utils/flightPairs';

interface FlightListProps {
  flights: Flight[];
  onShowDetails: (outbound: Flight, returnFlight?: Flight) => void;
}

export function FlightList({ flights, onShowDetails }: FlightListProps) {
  const flightPairs = Array.from(groupFlightPairs(flights).values());

  if (flightPairs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun vol trouvé pour votre recherche.</p>
        <p className="text-sm text-gray-400 mt-2">
          Essayez d'ajuster vos filtres ou de modifier votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flightPairs.map(({ outbound, return: returnFlight }) => (
        <FlightListItem
          key={outbound.id}
          outbound={outbound}
          return={returnFlight}
          onShowDetails={() => onShowDetails(outbound, returnFlight)}
        />
      ))}
    </div>
  );
}