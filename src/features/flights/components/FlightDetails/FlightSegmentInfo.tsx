import React from 'react';
import { Clock, Plane } from 'lucide-react';
import { FlightSegment } from '../../../../types';
import { formatDateTime, formatDate, getAirportTimezone } from '../../../../utils/dateUtils';
import { getAirlineInfo } from '../../../../utils/airlineUtils';

interface FlightSegmentInfoProps {
  segment: FlightSegment;
  isLastSegment: boolean;
}

export function FlightSegmentInfo({ segment, isLastSegment }: FlightSegmentInfoProps) {
  const airline = getAirlineInfo(segment.carrier);

  return (
    <div className="flex justify-between items-start border-l-2 border-blue-200 pl-4 pb-6">
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <img
            src={airline.logo}
            alt={airline.name}
            className="w-8 h-8 mr-3"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/32x32.png?text=${segment.carrier}`;
            }}
          />
          <div>
            <p className="font-medium">{airline.name}</p>
            <p className="text-sm text-gray-500">Vol {segment.flightNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-2">
              <Plane className="w-5 h-5 mr-2 text-blue-500" />
              <span className="font-semibold">Départ</span>
            </div>
            <p className="text-lg font-medium">{segment.departure.airport}</p>
            <div className="text-sm text-gray-600">
              <p className="font-medium">
                {formatDateTime(segment.departure.time, segment.departure.airport)}
              </p>
              <p>{formatDate(segment.departure.time, segment.departure.airport)}</p>
              <p className="text-xs text-gray-400">
                Fuseau horaire: {getAirportTimezone(segment.departure.airport)}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Plane className="w-5 h-5 mr-2 text-blue-500 transform rotate-90" />
              <span className="font-semibold">Arrivée</span>
            </div>
            <p className="text-lg font-medium">{segment.arrival.airport}</p>
            <div className="text-sm text-gray-600">
              <p className="font-medium">
                {formatDateTime(segment.arrival.time, segment.arrival.airport)}
              </p>
              <p>{formatDate(segment.arrival.time, segment.arrival.airport)}</p>
              <p className="text-xs text-gray-400">
                Fuseau horaire: {getAirportTimezone(segment.arrival.airport)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-gray-400" />
            <span>Durée: {segment.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}