import { useState, useCallback } from 'react';
import { SearchFormData, SearchData } from '../types';

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

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setDepartureInput('');
    setDestinationInput('');
    
    // Réinitialiser les champs de saisie manuellement
    const form = document.querySelector('form');
    if (form) {
      form.reset();
      
      // Réinitialiser les champs de type date
      const dateInputs = form.querySelectorAll('input[type="date"]');
      dateInputs.forEach(input => {
        (input as HTMLInputElement).value = '';
      });
    }
  }, []);

  const updateFormData = useCallback((field: keyof SearchFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Réinitialiser la date de retour si on passe en aller simple
      ...(field === 'tripType' && value === 'oneWay' ? { returnDate: '' } : {})
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.departure || !formData.destination || !formData.departDate) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérifier la date de retour pour les vols aller-retour
    if (formData.tripType === 'roundTrip' && !formData.returnDate) {
      alert('Veuillez sélectionner une date de retour');
      return;
    }

    const searchData: SearchData = {
      from: formData.departure,
      to: formData.destination,
      departDate: formData.departDate,
      returnDate: formData.tripType === 'roundTrip' ? formData.returnDate : undefined,
      passengers: formData.passengers,
      class: formData.class
    };

    try {
      await onSearch(searchData);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      alert('Une erreur est survenue lors de la recherche');
    }
  }, [formData, onSearch]);

  return {
    formData,
    departureInput,
    destinationInput,
    setDepartureInput,
    setDestinationInput,
    updateFormData,
    resetForm,
    handleSubmit
  };
}