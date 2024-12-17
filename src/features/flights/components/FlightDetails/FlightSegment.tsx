import React from 'react';
import { Clock, Plane, AlertTriangle } from 'lucide-react';
import { FlightSegment as FlightSegmentType } from '../../../../types';
import { formatDateTime, formatDate, getAirportTimezone } from '../../../../utils/dateUtils';
import { getAirlineInfo } from '../../../../utils/airlineUtils';
import { calculateLayoverDuration } from '../../../../utils/flightCalculations';

interface FlightSegmentProps {
  segment: FlightSegmentType;
  isLastSegment: boolean;
  nextSegmentDeparture?: string;
}

export function FlightSegment({ segment, isLastSegment, nextSegmentDeparture }: FlightSegmentProps) {
  const airline = getAirlineInfo(segment.carrier);
  const layoverDuration = !isLastSegment && nextSegmentDeparture
    ? calculateLayoverDuration(segment.arrival.time, nextSegmentDeparture)
    : null;

  return (
    <div className="relative">
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

          {/* Reste du composant inchangé */}
        </div>
      </div>

      {/* Reste du composant inchangé */}
    </div>
  );
}