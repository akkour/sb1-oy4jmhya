import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Flight } from '../../types';
import { Button } from '../ui/Button';
import { buildAirlineBookingUrl } from '../../utils/booking/urlBuilder';
import { getAirlineInfo } from '../../utils/airlineUtils';

interface BookingButtonProps {
  flight: Flight;
  returnFlight?: Flight;
  onError?: (error: Error) => void;
}

export function BookingButton({ flight, returnFlight, onError }: BookingButtonProps) {
  const airline = getAirlineInfo(flight.airline);

  const handleBooking = () => {
    try {
      const bookingUrl = buildAirlineBookingUrl({ 
        flight, 
        returnFlight,
        passengers: 1 
      });
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erreur lors de la redirection:', error);
      onError?.(error instanceof Error ? error : new Error('Erreur lors de la redirection'));
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleBooking}
      className="flex items-center space-x-2"
    >
      <span>Réserver sur {airline.name}</span>
      <ExternalLink className="w-4 h-4" />
    </Button>
  );
}