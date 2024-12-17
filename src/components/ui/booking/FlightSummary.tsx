import React from 'react';
import { Plane, Calendar } from 'lucide-react';
import { Flight } from '../../../types';
import { formatDateTime } from '../../../utils/dateUtils';
import { getAirlineInfo } from '../../../utils/airlineUtils';

interface FlightSummaryProps {
  flight: Flight;
  returnFlight?: Flight;
}

export function FlightSummary({ flight, returnFlight }: FlightSummaryProps) {
  const airline = getAirlineInfo(flight.airline);
  const totalPrice = returnFlight ? flight.price + returnFlight.price : flight.price;

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6">
      <div className="flex items-center gap-2">
        <img
          src={airline.logo}
          alt={airline.name}
          className="w-8 h-8"
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/32x32.png?text=${flight.airline}`;
          }}
        />
        <span className="font-medium">{airline.name}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-sm text-gray-600">Départ</div>
            <div className="font-medium">
              {flight.departure.airport} → {flight.arrival.airport}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-sm text-gray-600">Date</div>
            <div className="font-medium">
              {formatDateTime(flight.departure.time, flight.departure.airport)}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xl font-bold text-blue-600">
        Prix total: {totalPrice}€
      </div>
    </div>
  );
}