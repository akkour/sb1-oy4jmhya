import React from 'react';
import { Flight } from '../../types';
import { FlightCard } from './FlightCard';
import { Button } from '../ui/Button';
import { getAirlineInfo } from '../../utils/airlineUtils';

interface FlightPairCardProps {
  outbound: Flight;
  return?: Flight;
  onShowDetails: () => void;
}

export function FlightPairCard({ outbound, return: returnFlight, onShowDetails }: FlightPairCardProps) {
  const totalPrice = returnFlight 
    ? outbound.price + returnFlight.price 
    : outbound.price;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <FlightCard
        flight={outbound}
        type="Aller"
        onShowDetails={onShowDetails}
      />
      {returnFlight && (
        <FlightCard
          flight={returnFlight}
          type="Retour"
          onShowDetails={onShowDetails}
        />
      )}
      
      <div className="p-4 bg-gray-50 rounded-b-lg flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-blue-600">
            {totalPrice}€
          </p>
          <p className="text-sm text-gray-500">Prix total</p>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={onShowDetails}
          >
            Détails
          </Button>
          <Button
            variant="primary"
            onClick={() => window.open(getAirlineInfo(outbound.airline).bookingUrl, '_blank')}
          >
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
}