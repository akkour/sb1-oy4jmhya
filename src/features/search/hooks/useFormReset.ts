import { useCallback } from 'react';
import { SearchFormData } from '../../../types';

const initialFormData: SearchFormData = {
  tripType: 'roundTrip',
  departure: '',
  destination: '',
  departDate: '',
  returnDate: '',
  passengers: 1,
  class: 'ECONOMY'
};

export function useFormReset(
  setFormData: (data: SearchFormData) => void,
  setDepartureInput: (value: string) => void,
  setDestinationInput: (value: string) => void
) {
  return useCallback(() => {
    setFormData(initialFormData);
    setDepartureInput('');
    setDestinationInput('');
    
    const form = document.querySelector('form');
    if (form) {
      form.reset();
      const dateInputs = form.querySelectorAll('input[type="date"]');
      dateInputs.forEach(input => {
        (input as HTMLInputElement).value = '';
      });
    }
  }, [setFormData, setDepartureInput, setDestinationInput]);
}