import React from 'react';
import { Flight } from '../../../types/flight';
import { BookingHeader } from './BookingHeader';
import { FlightSummary } from './FlightSummary';
import { BookingOptions } from './BookingOptions';
import { BookingFooter } from './BookingFooter';

interface BookingRedirectProps {
  flight: Flight;
  returnFlight?: Flight;
  onClose: () => void;
}

export function BookingRedirect({ flight, returnFlight, onClose }: BookingRedirectProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <BookingHeader />
          <FlightSummary flight={flight} returnFlight={returnFlight} />
          <BookingOptions flight={flight} returnFlight={returnFlight} />
          <BookingFooter onClose={onClose} />
        </div>
      </div>
    </div>
  );
}