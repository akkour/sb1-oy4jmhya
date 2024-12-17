import React from 'react';
import { Flight } from '../../types';
import { getAirlineInfo } from '../../utils/airlineUtils';
import { formatDateTime } from '../../utils/dateUtils';
import { Button } from './Button';
import { ExternalLink, Plane, Calendar } from 'lucide-react';
import { buildSkyscannerUrl, buildKayakUrl } from '../../utils/booking/metaSearchUrls';

interface BookingRedirectProps {
  flight: Flight;
  returnFlight?: Flight;
  onClose: () => void;
}

export function BookingRedirect({ flight, returnFlight, onClose }: BookingRedirectProps) {
  const airline = getAirlineInfo(flight.airline);
  const totalPrice = returnFlight ? flight.price + returnFlight.price : flight.price;

  const handleDirectBooking = () => {
    const bookingUrl = airline.directBookingUrl || airline.bookingUrl;
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSkyscannerRedirect = () => {
    const url = buildSkyscannerUrl(flight, returnFlight);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKayakRedirect = () => {
    const url = buildKayakUrl(flight, returnFlight);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Réserver votre vol</h2>

          <div className="space-y-6">
            {/* Flight Summary */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <img src={airline.logo} alt={airline.name} className="w-8 h-8" />
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

            {/* Booking Options */}
            <div className="space-y-4">
              <Button
                variant="primary"
                fullWidth
                onClick={handleDirectBooking}
                className="flex items-center justify-center gap-2"
              >
                <span>Réserver sur {airline.name}</span>
                <ExternalLink className="w-4 h-4" />
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    ou comparer les prix sur
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={handleSkyscannerRedirect}
                  className="flex items-center justify-center gap-2"
                >
                  <span>Skyscanner</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={handleKayakRedirect}
                  className="flex items-center justify-center gap-2"
                >
                  <span>Kayak</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}