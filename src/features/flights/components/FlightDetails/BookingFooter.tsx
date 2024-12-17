import React from 'react';
import { Flight } from '../../../../types';
import { Button } from '../../../../components/ui/Button';
import { PriceAlert } from '../PriceAlert';
import { getBookingUrl } from '../../../../utils/bookingUtils';
import { getAirlineInfo } from '../../../../utils/airlineUtils';
import { ExternalLink } from 'lucide-react';

interface BookingFooterProps {
  flight: Flight;
  returnFlight?: Flight;
  onClose: () => void;
}

export function BookingFooter({ flight, returnFlight, onClose }: BookingFooterProps) {
  const totalPrice = returnFlight 
    ? flight.price + returnFlight.price 
    : flight.price;

  const airline = getAirlineInfo(flight.airline);
  const bookingUrl = getBookingUrl(flight);

  const handleBooking = () => {
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-6 border-t pt-6 flex justify-between items-center">
      <div>
        <p className="text-2xl font-bold text-blue-600">
          Prix total: {totalPrice}€
        </p>
        <div className="mt-2">
          <PriceAlert
            route={{
              from: flight.departure.airport,
              to: flight.arrival.airport,
              date: flight.departure.time
            }}
            currentPrice={flight.price}
            onCreateAlert={(threshold) => {
              console.log('Alert created with threshold:', threshold);
            }}
          />
        </div>
      </div>
      <div className="space-x-4">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Fermer
        </Button>
        <Button
          variant="primary"
          onClick={handleBooking}
          className="flex items-center space-x-2"
        >
          <span>Réserver sur {airline.name}</span>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}