import React from 'react';
import { PassengerSelector } from './PassengerSelector';
import { ClassSelector } from './ClassSelector';
import { SearchFormData } from '../../types';

interface SearchFormFooterProps {
  formData: SearchFormData;
  updateFormData: (field: keyof SearchFormData, value: any) => void;
}

export function SearchFormFooter({ formData, updateFormData }: SearchFormFooterProps) {
  return (
    <>
      <div className="flex gap-4 mt-4">
        <PassengerSelector
          value={formData.passengers}
          onChange={(value) => updateFormData('passengers', value)}
        />

        <ClassSelector
          value={formData.class}
          onChange={(value) => updateFormData('class', value)}
        />
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Rechercher
      </button>
    </>
  );
}