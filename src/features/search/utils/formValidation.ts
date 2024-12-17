import { SearchFormData } from '../../../types';

export function validateSearchForm(formData: SearchFormData): void {
  if (!formData.departure || !formData.destination) {
    throw new Error('Les aéroports de départ et d\'arrivée sont requis');
  }

  if (!formData.departDate) {
    throw new Error('La date de départ est requise');
  }

  if (formData.tripType === 'roundTrip' && !formData.returnDate) {
    throw new Error('La date de retour est requise pour un vol aller-retour');
  }

  if (formData.passengers < 1 || formData.passengers > 9) {
    throw new Error('Le nombre de passagers doit être entre 1 et 9');
  }

  const validClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];
  if (!validClasses.includes(formData.class)) {
    throw new Error('Classe de voyage invalide');
  }
}