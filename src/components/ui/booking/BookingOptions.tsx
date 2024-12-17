import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Flight } from '../../../types';
import { Button } from '../Button';
import { 
  buildDirectBookingUrl,
  buildSkyscannerUrl,
  buildKayakUrl 
} from '../../../utils/booking/urlBuilders';
import { getAirlineInfo } from '../../../utils/airlineUtils';

interface BookingOptionsProps {
  flight: Flight;
  returnFlight?: Flight;
}

export function BookingOptions({ flight, returnFlight }: BookingOptionsProps) {
  const airline = getAirlineInfo(flight.airline);

  const handleRedirect = (buildUrl: typeof buildSkyscannerUrl) => {
    try {
      const url = buildUrl(flight, returnFlight);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error building redirect URL:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        variant="primary"
        fullWidth
        onClick={() => handleRedirect(buildDirectBookingUrl)}
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
          onClick={() => handleRedirect(buildSkyscannerUrl)}
          className="flex items-center justify-center gap-2"
        >
          <span>Skyscanner</span>
          <ExternalLink className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          onClick={() => handleRedirect(buildKayakUrl)}
          className="flex items-center justify-center gap-2"
        >
          <span>Kayak</span>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}