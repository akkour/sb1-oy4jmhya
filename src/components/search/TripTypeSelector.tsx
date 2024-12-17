import React from 'react';

interface TripTypeSelectorProps {
  value: 'roundTrip' | 'oneWay';
  onChange: (type: 'roundTrip' | 'oneWay') => void;
}

export function TripTypeSelector({ value, onChange }: TripTypeSelectorProps) {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className={`px-4 py-2 rounded-full ${
          value === 'roundTrip'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => onChange('roundTrip')}
      >
        Aller-retour
      </button>
      <button
        type="button"
        className={`px-4 py-2 rounded-full ${
          value === 'oneWay'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => onChange('oneWay')}
      >
        Aller simple
      </button>
    </div>
  );
}