import React from 'react';
import { Flight } from '../../../../types';
import { AirlineInfo } from './AirlineInfo';
import { FlightInfo } from './FlightInfo';

interface FlightCardProps {
  flight: Flight;
  type: 'Aller' | 'Retour';
  onShowDetails: () => void;
}

export function FlightCard({ flight, type, onShowDetails }: FlightCardProps) {
  return (
    <div className="p-4 border-b last:border-b-0" onClick={onShowDetails}>
      <AirlineInfo
        airlineCode={flight.airline}
        flightNumber={flight.flightNumber}
        type={type}
        price={flight.price}
      />
      <FlightInfo flight={flight} type={type} />
    </div>
  );
}