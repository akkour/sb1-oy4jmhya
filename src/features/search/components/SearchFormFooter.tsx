import React from 'react';
import { PassengerSelector } from './PassengerSelector';
import { ClassSelector } from './ClassSelector';
import { SearchFormData } from '../../../types';
import { Button } from '../../../components/ui/Button';

interface SearchFormFooterProps {
  formData: SearchFormData;
  isSubmitting: boolean;
  updateFormData: (field: keyof SearchFormData, value: any) => void;
}

export function SearchFormFooter({ 
  formData, 
  isSubmitting,
  updateFormData 
}: SearchFormFooterProps) {
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

      <Button
        type="submit"
        variant="primary"
        fullWidth
        className="mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Recherche en cours...' : 'Rechercher'}
      </Button>
    </>
  );
}