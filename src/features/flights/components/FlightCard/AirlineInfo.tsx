import React from 'react';
import { getAirlineInfo } from '../../../../utils/airlineUtils';

interface AirlineInfoProps {
  airlineCode: string;
  flightNumber: string;
  type: 'Aller' | 'Retour';
  price: number;
}

export function AirlineInfo({ airlineCode, flightNumber, type, price }: AirlineInfoProps) {
  const airline = getAirlineInfo(airlineCode);

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <img
            src={airline.logo}
            alt={airline.name}
            className="w-10 h-10 object-contain"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/40x40.png?text=${airlineCode}`;
            }}
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{airline.name}</p>
          <p className="text-sm text-gray-500">Vol {flightNumber}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-blue-600">{price}€</p>
        <p className="text-sm font-medium text-blue-500">{type}</p>
      </div>
    </div>
  );
}