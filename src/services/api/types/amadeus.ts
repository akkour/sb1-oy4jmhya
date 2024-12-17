export interface AmadeusSearchParams {
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

export interface AmadeusError {
  statusCode: number;
  code: string;
  message: string;
}

export interface AmadeusSegment {
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  duration: string;
}

export interface AmadeusItinerary {
  duration: string;
  segments: AmadeusSegment[];
}

export interface AmadeusOffer {
  id: string;
  price: {
    total: string;
  };
  validatingAirlineCodes: string[];
  itineraries: AmadeusItinerary[];
  travelerPricings: Array<{
    fareDetailsBySegment: Array<{
      cabin: string;
    }>;
  }>;
}