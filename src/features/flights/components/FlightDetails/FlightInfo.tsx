import React from 'react';
import { Clock, Plane, AlertTriangle } from 'lucide-react';
import { Flight } from '../../../../types';
import { formatDateTime, formatDate, getAirportTimezone } from '../../../../utils/dateUtils';
import { getAirlineInfo } from '../../../../utils/airlineUtils';

interface FlightInfoProps {
  flight: Flight;
  type: 'Aller' | 'Retour';
}

export function FlightInfo({ flight, type }: FlightInfoProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Vol {type}</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {flight.stops === 0 ? 'Vol direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
          </span>
          <span className="text-lg font-semibold text-blue-600">{flight.price}€</span>
        </div>
      </div>

      <div className="space-y-6">
        {flight.segments.map((segment, index) => (
          <div key={index} className="relative">
            {/* ... Segment details ... */}
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-8">
          <div>
            <p className="text-sm font-medium text-gray-600">Durée totale</p>
            <p className="text-lg font-semibold">{flight.duration}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Distance totale</p>
            <p className="text-lg font-semibold">1 450 km</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Émissions CO2</p>
            <p className="text-lg font-semibold">245 kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}