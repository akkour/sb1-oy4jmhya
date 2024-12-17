import React from 'react';
import { Clock, Plane } from 'lucide-react';
import { Flight } from '../../../types';
import { formatDateTime, formatDate } from '../../../utils/dateUtils';
import { getAirlineInfo } from '../../../utils/airlineUtils';

interface FlightCardProps {
  flight: Flight;
  type: 'Aller' | 'Retour';
  onShowDetails: () => void;
}

export function FlightCard({ flight, type, onShowDetails }: FlightCardProps) {
  const airline = getAirlineInfo(flight.airline);

  return (
    <div className="p-4 border-b last:border-b-0">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <img
              src={airline.logo}
              alt={airline.name}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/40x40.png?text=${flight.airline}`;
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{airline.name}</p>
            <p className="text-sm text-gray-500">Vol {flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-blue-600">{flight.price}€</p>
          <p className="text-sm font-medium text-blue-500">{type}</p>
        </div>
      </div>

      {/* Reste du composant inchangé */}
    </div>
  );
}