import React from 'react';
import { Flight } from '../../../../types';

interface FlightHeaderProps {
  flight: Flight;
  type: 'Aller' | 'Retour';
}

export function FlightHeader({ flight, type }: FlightHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold">Vol {type}</h3>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          {flight.stops === 0 ? 'Vol direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
        </span>
        <span className="text-lg font-semibold text-blue-600">{flight.price}€</span>
      </div>
    </div>
  );
}