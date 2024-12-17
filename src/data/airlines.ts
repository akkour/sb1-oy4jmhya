export const airlines = [
  {
    code: 'AF',
    name: 'Air France',
    logo: 'https://images.kiwi.com/airlines/64/AF.png',
    bookingUrl: 'https://wwws.airfrance.fr',
    directBookingUrl: 'https://wwws.airfrance.fr/search/offers'
  },
  {
    code: 'AT',
    name: 'Royal Air Maroc',
    logo: 'https://images.kiwi.com/airlines/64/AT.png',
    bookingUrl: 'https://www.royalairmaroc.com',
    directBookingUrl: 'https://www.royalairmaroc.com/fr-fr/reservation-vol'
  },
  {
    code: 'AC',
    name: 'Air Canada',
    logo: 'https://images.kiwi.com/airlines/64/AC.png',
    bookingUrl: 'https://www.aircanada.com',
    directBookingUrl: 'https://www.aircanada.com/fr/fr/aco/home/book.html'
  },
  // ... rest of the airlines
] as const;

export type AirlineCode = typeof airlines[number]['code'];