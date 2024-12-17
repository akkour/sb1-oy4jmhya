import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Flight } from '../../types';
import { Button } from '../ui/Button';
import { buildSkyscannerUrl, buildKayakUrl } from '../../utils/booking/metaSearchUrls';

interface ComparisonButtonsProps {
  flight: Flight;
  returnFlight?: Flight;
}

export function ComparisonButtons({ flight, returnFlight }: ComparisonButtonsProps) {
  const handleRedirect = (buildUrl: typeof buildSkyscannerUrl) => {
    try {
      const url = buildUrl(flight, returnFlight);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erreur lors de la redirection:', error);
    }
  };

  return (
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
  );
}