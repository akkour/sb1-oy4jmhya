import React, { useState } from 'react';
import { Flight } from '../../../types';
import { FlightCard } from './FlightCard';
import { Button } from '../../../components/ui/Button';
import { BookingRedirect } from '../../../components/ui/BookingRedirect';
import { ExternalLink } from 'lucide-react';

interface FlightListItemProps {
  outbound: Flight;
  return?: Flight;
  onShowDetails: () => void;
}

export function FlightListItem({ outbound, return: returnFlight, onShowDetails }: FlightListItemProps) {
  const [showBooking, setShowBooking] = useState(false);
  const totalPrice = returnFlight ? outbound.price + returnFlight.price : outbound.price;

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
            onClick={() => setShowBooking(true)}
            className="flex items-center space-x-2"
          >
            <span>Réserver</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {showBooking && (
        <BookingRedirect
          flight={outbound}
          returnFlight={returnFlight}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}