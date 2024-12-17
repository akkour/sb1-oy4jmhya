import { SearchFormData, SearchData } from '../../../types';

export function createSearchData(formData: SearchFormData): SearchData {
  return {
    from: formData.departure,
    to: formData.destination,
    departDate: formData.departDate,
    returnDate: formData.tripType === 'roundTrip' ? formData.returnDate : undefined,
    passengers: formData.passengers,
    class: formData.class
  };
}