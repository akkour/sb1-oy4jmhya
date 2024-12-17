export type CabinClass = 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';

export interface FlightSegment {
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: string;
  carrier: string;
  flightNumber: string;
}

export interface Flight {
  id: string;
  type?: 'outbound' | 'return';
  linkedFlightId?: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: string;
  price: number;
  stops: number;
  segments: FlightSegment[];
  class: CabinClass;
}