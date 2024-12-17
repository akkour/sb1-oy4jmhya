import React from 'react';
import { Clock, Plane } from 'lucide-react';
import { Flight } from '../../types';
import { formatDateTime, formatDate } from '../../utils/dateUtils';
import { getAirlineInfo } from '../../utils/airlineUtils';

interface FlightCardProps {
  flight: Flight;
  type: 'Aller' | 'Retour';
  onShowDetails: () => void;
}

export function FlightCard({ flight, type, onShowDetails }: FlightCardProps) {
  const airline = getAirlineInfo(flight.airline);

  return (
    <div className="p-6 border-b last:border-b-0 hover:bg-blue-50/50 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
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

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Plane className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{flight.departure.airport}</p>
              <p className="text-sm text-gray-600">
                {formatDateTime(flight.departure.time, flight.departure.airport)}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(flight.departure.time, flight.departure.airport)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">{flight.duration}</span>
          </div>
          <div className="w-full h-px bg-gray-200 relative">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
            </div>
          </div>
          {flight.stops > 0 && (
            <p className="text-xs font-medium text-blue-600 mt-1">
              {flight.stops} escale{flight.stops > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-end space-x-3">
            <div>
              <p className="font-semibold text-gray-900 text-right">{flight.arrival.airport}</p>
              <p className="text-sm text-gray-600 text-right">
                {formatDateTime(flight.arrival.time, flight.arrival.airport)}
              </p>
              <p className="text-xs text-gray-500 text-right">
                {formatDate(flight.arrival.time, flight.arrival.airport)}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Plane className="h-5 w-5 text-blue-600 transform rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}