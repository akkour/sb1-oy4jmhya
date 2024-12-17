import React from 'react';
import { Flight } from '../../../../types';
import { FlightSummary } from './FlightSummary';
import { BaggageInfo } from './BaggageInfo';
import { ServicesInfo } from './ServicesInfo';
import { EnvironmentalInfo } from './EnvironmentalInfo';
import { BookingFooter } from './BookingFooter';

interface FlightDetailsProps {
  flight: Flight;
  returnFlight?: Flight;
  onClose: () => void;
}

export function FlightDetails({ flight, returnFlight, onClose }: FlightDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">Détails du vol</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <FlightSummary flight={flight} type="Aller" />
          {returnFlight && <FlightSummary flight={returnFlight} type="Retour" />}

          <BaggageInfo />
          <ServicesInfo />
          <EnvironmentalInfo />

          <BookingFooter
            flight={flight}
            returnFlight={returnFlight}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}