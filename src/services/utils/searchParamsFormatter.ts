import { SearchData } from '../../types';

interface FormattedSearchParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: string;
  travelClass: string;
  currencyCode: string;
  max: string;
  nonStop: string;
}

export function formatSearchParams(searchData: SearchData & { departDate: string }): FormattedSearchParams {
  return {
    originLocationCode: searchData.from.toUpperCase(),
    destinationLocationCode: searchData.to.toUpperCase(),
    departureDate: searchData.departDate,
    ...(searchData.returnDate && { returnDate: searchData.returnDate }),
    adults: String(searchData.passengers),
    travelClass: searchData.class,
    currencyCode: 'EUR',
    max: '50',
    nonStop: 'false'
  };
}