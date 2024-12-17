import React from 'react';
import { AirportSelector } from '../AirportSelector';
import { DateSelector } from '../DateSelector';
import { SearchFormData } from '../../../../types';

interface SearchFormFieldsProps {
  formData: SearchFormData;
  departureInput: string;
  destinationInput: string;
  setDepartureInput: (value: string) => void;
  setDestinationInput: (value: string) => void;
  updateFormData: (field: keyof SearchFormData, value: any) => void;
}

export function SearchFormFields({
  formData,
  departureInput,
  destinationInput,
  setDepartureInput,
  setDestinationInput,
  updateFormData
}: SearchFormFieldsProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AirportSelector
        label="Départ"
        value={formData.departure}
        inputValue={departureInput}
        onInputChange={setDepartureInput}
        onChange={(airport) => {
          updateFormData('departure', airport.code);
          setDepartureInput(`${airport.city} (${airport.code})`);
        }}
        placeholder="D'où partez-vous ?"
      />

      <AirportSelector
        label="Destination"
        value={formData.destination}
        inputValue={destinationInput}
        onInputChange={setDestinationInput}
        onChange={(airport) => {
          updateFormData('destination', airport.code);
          setDestinationInput(`${airport.city} (${airport.code})`);
        }}
        placeholder="Où allez-vous ?"
      />

      <DateSelector
        label="Date de départ"
        value={formData.departDate}
        onChange={(date) => updateFormData('departDate', date)}
        minDate={today}
      />

      {formData.tripType === 'roundTrip' && (
        <DateSelector
          label="Date de retour"
          value={formData.returnDate}
          onChange={(date) => updateFormData('returnDate', date)}
          minDate={formData.departDate || today}
        />
      )}
    </div>
  );
}