import React from 'react';
import { SearchFormHeader } from './SearchFormHeader';
import { SearchFormFields } from './SearchFormFields';
import { SearchFormFooter } from './SearchFormFooter';
import { SearchData } from '../../../types';
import { useSearchForm } from '../hooks/useSearchForm';

interface SearchFormProps {
  onSearch: (data: SearchData) => Promise<void>;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const {
    formData,
    departureInput,
    destinationInput,
    setDepartureInput,
    setDestinationInput,
    updateFormData,
    resetForm,
    handleSubmit
  } = useSearchForm(onSearch);

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90 border border-gray-100"
    >
      <SearchFormHeader
        tripType={formData.tripType}
        onTripTypeChange={(type) => updateFormData('tripType', type)}
        onReset={resetForm}
      />
      
      <SearchFormFields
        formData={formData}
        departureInput={departureInput}
        destinationInput={destinationInput}
        setDepartureInput={setDepartureInput}
        setDestinationInput={setDestinationInput}
        updateFormData={updateFormData}
      />

      <SearchFormFooter
        formData={formData}
        updateFormData={updateFormData}
      />
    </form>
  );
}