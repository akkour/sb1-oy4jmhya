export interface SearchFormData {
  tripType: 'roundTrip' | 'oneWay';
  departure: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: number;
  class: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
}

export interface SearchData {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  class: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
}

export interface FlightPair {
  outbound: Flight;
  return?: Flight;
}

export interface FlightFilters {
  maxPrice: number;
  stops: string;
  airlines: string[];
  departureTime: string;
  duration: number;
  sort: string;
}

// ... autres interfaces existantes ...