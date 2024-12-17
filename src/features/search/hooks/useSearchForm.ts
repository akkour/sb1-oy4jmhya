import { useState, useCallback } from 'react';
import { SearchFormData, SearchData } from '../../../types';
import { validateSearchForm } from '../utils/formValidation';
import { createSearchData } from '../utils/searchDataTransformer';
import { useFormReset } from './useFormReset';

const initialFormData: SearchFormData = {
  tripType: 'roundTrip',
  departure: '',
  destination: '',
  departDate: '',
  returnDate: '',
  passengers: 1,
  class: 'ECONOMY'
};

export function useSearchForm(onSearch: (data: SearchData) => Promise<void>) {
  const [formData, setFormData] = useState<SearchFormData>(initialFormData);
  const [departureInput, setDepartureInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useFormReset(setFormData, setDepartureInput, setDestinationInput);

  const updateFormData = useCallback((field: keyof SearchFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'tripType' && value === 'oneWay' ? { returnDate: '' } : {})
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      validateSearchForm(formData);
      setIsSubmitting(true);
      
      const searchData = createSearchData(formData);
      await onSearch(searchData);
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSearch]);

  return {
    formData,
    departureInput,
    destinationInput,
    isSubmitting,
    setDepartureInput,
    setDestinationInput,
    updateFormData,
    resetForm,
    handleSubmit
  };
}