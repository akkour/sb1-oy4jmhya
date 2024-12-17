import React from 'react';
import { MapPin } from 'lucide-react';

interface Destination {
  code: string;
  city: string;
  country: string;
  price: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface PriceMapProps {
  origin: string;
  destinations: Destination[];
  onDestinationSelect: (destination: Destination) => void;
}

export function PriceMap({ origin, destinations, onDestinationSelect }: PriceMapProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Explorer les destinations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((dest) => (
          <button
            key={dest.code}
            onClick={() => onDestinationSelect(dest)}
            className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <MapPin className="h-5 w-5 text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium">{dest.city}</div>
              <div className="text-sm text-gray-500">{dest.country}</div>
              <div className="text-lg font-semibold text-blue-600 mt-2">
                à partir de {dest.price}€
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}