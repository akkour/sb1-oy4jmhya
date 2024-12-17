export const airlines = {
  // ... autres compagnies existantes ...
  
  AT: {
    name: 'Royal Air Maroc',
    logo: 'https://images.kiwi.com/airlines/64/AT.png',
    bookingUrl: 'https://www.royalairmaroc.com/fr-fr/reservation-vol',
    bookingParams: {
      origin: 'departure',
      destination: 'arrival',
      outbound: 'outbound_date',
      inbound: 'inbound_date',
      cabin: 'cabin',
      adults: 'adult',
      tripType: 'trip_type',
      currency: 'currency',
      promo: 'promo_code'
    }
  }
} as const;

export type AirlineCode = keyof typeof airlines;