import React from 'react';
import { Flight } from '../../../../types';
import { FlightHeader } from './FlightHeader';
import { FlightSegment } from './FlightSegment';
import { FlightStats } from './FlightStats';

interface FlightSummaryProps {
  flight: Flight;
  type: 'Aller' | 'Retour';
}

export function FlightSummary({ flight, type }: FlightSummaryProps) {
  return (
    <div className="mb-8">
      <FlightHeader flight={flight} type={type} />

      <div className="space-y-6">
        {flight.segments.map((segment, index) => (
          <FlightSegment
            key={index}
            segment={segment}
            isLastSegment={index === flight.segments.length - 1}
            nextSegmentDeparture={
              index < flight.segments.length - 1 
                ? flight.segments[index + 1].departure.time 
                : undefined
            }
          />
        ))}
      </div>

      <FlightStats flight={flight} />
    </div>
  );
}