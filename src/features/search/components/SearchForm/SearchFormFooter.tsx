import React from 'react';
import { PassengerSelector } from '../PassengerSelector';
import { ClassSelector } from '../ClassSelector';
import { Button } from '../../../../components/ui/Button';
import { SearchFormData } from '../../../../types';

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
    <div className="space-y-4">
      <div className="flex gap-4">
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
        disabled={isSubmitting}
        className="mt-2"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Recherche en cours...
          </div>
        ) : (
          'Rechercher'
        )}
      </Button>
    </div>
  );
}