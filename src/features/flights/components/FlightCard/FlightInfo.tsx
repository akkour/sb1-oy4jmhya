import React from 'react';
import { Clock, Plane } from 'lucide-react';
import { Flight } from '../../../../types';
import { formatDateTime, formatDate } from '../../../../utils/dateUtils';

interface FlightInfoProps {
  flight: Flight;
  type: 'Aller' | 'Retour';
}

export function FlightInfo({ flight, type }: FlightInfoProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center">
          <Plane className="h-5 w-5 text-gray-400 mr-2" />
          <div>
            <p className="font-semibold">{flight.departure.airport}</p>
            <p className="text-sm text-gray-500">
              {formatDateTime(flight.departure.time, flight.departure.airport)}
              <br />
              {formatDate(flight.departure.time, flight.departure.airport)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 text-center">
        <div className="flex items-center justify-center">
          <Clock className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">{flight.duration}</span>
        </div>
        {flight.stops > 0 && (
          <p className="text-xs text-gray-400">
            {flight.stops} escale{flight.stops > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="flex-1 text-right">
        <div className="flex items-center justify-end">
          <div className="text-right mr-2">
            <p className="font-semibold">{flight.arrival.airport}</p>
            <p className="text-sm text-gray-500">
              {formatDateTime(flight.arrival.time, flight.arrival.airport)}
              <br />
              {formatDate(flight.arrival.time, flight.arrival.airport)}
            </p>
          </div>
          <Plane className="h-5 w-5 text-gray-400 transform rotate-90" />
        </div>
      </div>
    </div>
  );
}