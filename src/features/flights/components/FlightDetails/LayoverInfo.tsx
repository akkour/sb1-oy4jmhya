import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { calculateLayoverDuration } from '../../../../utils/flightCalculations';

interface LayoverInfoProps {
  airport: string;
  currentArrival: string;
  nextDeparture: string;
}

export function LayoverInfo({ airport, currentArrival, nextDeparture }: LayoverInfoProps) {
  const duration = calculateLayoverDuration(currentArrival, nextDeparture);

  return (
    <div className="my-4 px-6 py-3 bg-amber-50 border-l-4 border-amber-400 rounded">
      <div className="flex items-center">
        <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
        <div>
          <p className="font-medium text-amber-700">Escale à {airport}</p>
          <p className="text-sm text-amber-600">
            Durée de l'escale: {duration}
          </p>
        </div>
      </div>
    </div>
  );
}