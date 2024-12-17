import React from 'react';
import { Flight } from '../../../../types';
import { calculateDistance, calculateCO2Emissions } from '../../../../utils/flightCalculations';

interface FlightStatsProps {
  flight: Flight;
}

export function FlightStats({ flight }: FlightStatsProps) {
  const distance = calculateDistance(flight.departure.airport, flight.arrival.airport);
  const emissions = calculateCO2Emissions(distance);

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-start space-x-8">
        <div>
          <p className="text-sm font-medium text-gray-600">Durée totale</p>
          <p className="text-lg font-semibold">{flight.duration}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Distance totale</p>
          <p className="text-lg font-semibold">{distance} km</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Émissions CO2</p>
          <p className="text-lg font-semibold">{emissions} kg</p>
        </div>
      </div>
    </div>
  );
}