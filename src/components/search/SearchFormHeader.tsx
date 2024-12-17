import React from 'react';
import { TripTypeSelector } from './TripTypeSelector';
import { Button } from '../ui/Button';

interface SearchFormHeaderProps {
  tripType: 'roundTrip' | 'oneWay';
  onTripTypeChange: (type: 'roundTrip' | 'oneWay') => void;
  onReset: () => void;
}

export function SearchFormHeader({
  tripType,
  onTripTypeChange,
  onReset
}: SearchFormHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <TripTypeSelector
        value={tripType}
        onChange={onTripTypeChange}
      />
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className="hover:bg-gray-50"
      >
        Réinitialiser
      </Button>
    </div>
  );
}