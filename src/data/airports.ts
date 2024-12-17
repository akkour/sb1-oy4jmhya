// Liste complète des aéroports internationaux majeurs avec leurs fuseaux horaires
export const airports = [
  // Europe
  {
    code: 'CDG',
    name: 'Paris Charles de Gaulle',
    city: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris'
  },
  {
    code: 'ORY',
    name: 'Paris Orly',
    city: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris'
  },
  {
    code: 'LHR',
    name: 'London Heathrow',
    city: 'Londres',
    country: 'Royaume-Uni',
    timezone: 'Europe/London'
  },
  {
    code: 'LGW',
    name: 'London Gatwick',
    city: 'Londres',
    country: 'Royaume-Uni',
    timezone: 'Europe/London'
  },
  {
    code: 'AMS',
    name: 'Amsterdam Schiphol',
    city: 'Amsterdam',
    country: 'Pays-Bas',
    timezone: 'Europe/Amsterdam'
  },
  {
    code: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Francfort',
    country: 'Allemagne',
    timezone: 'Europe/Berlin'
  },
  {
    code: 'MAD',
    name: 'Adolfo Suárez Madrid–Barajas',
    city: 'Madrid',
    country: 'Espagne',
    timezone: 'Europe/Madrid'
  },
  {
    code: 'BCN',
    name: 'Barcelona–El Prat',
    city: 'Barcelone',
    country: 'Espagne',
    timezone: 'Europe/Madrid'
  },
  {
    code: 'FCO',
    name: 'Leonardo da Vinci International',
    city: 'Rome',
    country: 'Italie',
    timezone: 'Europe/Rome'
  },
  {
    code: 'MXP',
    name: 'Milan Malpensa',
    city: 'Milan',
    country: 'Italie',
    timezone: 'Europe/Rome'
  },
  {
    code: 'MUC',
    name: 'Munich Airport',
    city: 'Munich',
    country: 'Allemagne',
    timezone: 'Europe/Berlin'
  },
  {
    code: 'BRU',
    name: 'Brussels Airport',
    city: 'Bruxelles',
    country: 'Belgique',
    timezone: 'Europe/Brussels'
  },
  {
    code: 'CPH',
    name: 'Copenhagen Airport',
    city: 'Copenhague',
    country: 'Danemark',
    timezone: 'Europe/Copenhagen'
  },
  {
    code: 'ARN',
    name: 'Stockholm Arlanda',
    city: 'Stockholm',
    country: 'Suède',
    timezone: 'Europe/Stockholm'
  },
  {
    code: 'OSL',
    name: 'Oslo Airport',
    city: 'Oslo',
    country: 'Norvège',
    timezone: 'Europe/Oslo'
  },
  {
    code: 'HEL',
    name: 'Helsinki-Vantaa',
    city: 'Helsinki',
    country: 'Finlande',
    timezone: 'Europe/Helsinki'
  },
  {
    code: 'VIE',
    name: 'Vienna International',
    city: 'Vienne',
    country: 'Autriche',
    timezone: 'Europe/Vienna'
  },
  {
    code: 'ZRH',
    name: 'Zurich Airport',
    city: 'Zurich',
    country: 'Suisse',
    timezone: 'Europe/Zurich'
  },
  {
    code: 'GVA',
    name: 'Geneva Airport',
    city: 'Genève',
    country: 'Suisse',
    timezone: 'Europe/Zurich'
  },
  {
    code: 'LIS',
    name: 'Lisbon Airport',
    city: 'Lisbonne',
    country: 'Portugal',
    timezone: 'Europe/Lisbon'
  },

  // Amérique du Nord
  {
    code: 'JFK',
    name: 'John F. Kennedy International',
    city: 'New York',
    country: 'États-Unis',
    timezone: 'America/New_York'
  },
  {
    code: 'LAX',
    name: 'Los Angeles International',
    city: 'Los Angeles',
    country: 'États-Unis',
    timezone: 'America/Los_Angeles'
  },
  {
    code: 'ORD',
    name: "O'Hare International",
    city: 'Chicago',
    country: 'États-Unis',
    timezone: 'America/Chicago'
  },
  {
    code: 'DFW',
    name: 'Dallas/Fort Worth International',
    city: 'Dallas',
    country: 'États-Unis',
    timezone: 'America/Chicago'
  },
  {
    code: 'SFO',
    name: 'San Francisco International',
    city: 'San Francisco',
    country: 'États-Unis',
    timezone: 'America/Los_Angeles'
  },
  {
    code: 'MIA',
    name: 'Miami International',
    city: 'Miami',
    country: 'États-Unis',
    timezone: 'America/New_York'
  },
  {
    code: 'YYZ',
    name: 'Toronto Pearson International',
    city: 'Toronto',
    country: 'Canada',
    timezone: 'America/Toronto'
  },
  {
    code: 'YUL',
    name: 'Montréal-Pierre Elliott Trudeau',
    city: 'Montréal',
    country: 'Canada',
    timezone: 'America/Montreal'
  },
  {
    code: 'YVR',
    name: 'Vancouver International',
    city: 'Vancouver',
    country: 'Canada',
    timezone: 'America/Vancouver'
  },

  // Asie
  {
    code: 'HND',
    name: 'Tokyo Haneda',
    city: 'Tokyo',
    country: 'Japon',
    timezone: 'Asia/Tokyo'
  },
  {
    code: 'NRT',
    name: 'Tokyo Narita',
    city: 'Tokyo',
    country: 'Japon',
    timezone: 'Asia/Tokyo'
  },
  {
    code: 'PEK',
    name: 'Beijing Capital International',
    city: 'Pékin',
    country: 'Chine',
    timezone: 'Asia/Shanghai'
  },
  {
    code: 'PVG',
    name: 'Shanghai Pudong International',
    city: 'Shanghai',
    country: 'Chine',
    timezone: 'Asia/Shanghai'
  },
  {
    code: 'HKG',
    name: 'Hong Kong International',
    city: 'Hong Kong',
    country: 'Chine',
    timezone: 'Asia/Hong_Kong'
  },
  {
    code: 'ICN',
    name: 'Seoul Incheon International',
    city: 'Séoul',
    country: 'Corée du Sud',
    timezone: 'Asia/Seoul'
  },
  {
    code: 'SIN',
    name: 'Singapore Changi',
    city: 'Singapour',
    country: 'Singapour',
    timezone: 'Asia/Singapore'
  },
  {
    code: 'BKK',
    name: 'Suvarnabhumi Airport',
    city: 'Bangkok',
    country: 'Thaïlande',
    timezone: 'Asia/Bangkok'
  },
  {
    code: 'KUL',
    name: 'Kuala Lumpur International',
    city: 'Kuala Lumpur',
    country: 'Malaisie',
    timezone: 'Asia/Kuala_Lumpur'
  },

  // Moyen-Orient
  {
    code: 'DXB',
    name: 'Dubai International',
    city: 'Dubaï',
    country: 'Émirats Arabes Unis',
    timezone: 'Asia/Dubai'
  },
  {
    code: 'AUH',
    name: 'Abu Dhabi International',
    city: 'Abu Dhabi',
    country: 'Émirats Arabes Unis',
    timezone: 'Asia/Dubai'
  },
  {
    code: 'DOH',
    name: 'Hamad International',
    city: 'Doha',
    country: 'Qatar',
    timezone: 'Asia/Qatar'
  },
  {
    code: 'IST',
    name: 'Istanbul Airport',
    city: 'Istanbul',
    country: 'Turquie',
    timezone: 'Europe/Istanbul'
  },

  // Océanie
  {
    code: 'SYD',
    name: 'Sydney Kingsford Smith',
    city: 'Sydney',
    country: 'Australie',
    timezone: 'Australia/Sydney'
  },
  {
    code: 'MEL',
    name: 'Melbourne Airport',
    city: 'Melbourne',
    country: 'Australie',
    timezone: 'Australia/Melbourne'
  },
  {
    code: 'BNE',
    name: 'Brisbane Airport',
    city: 'Brisbane',
    country: 'Australie',
    timezone: 'Australia/Brisbane'
  },
  {
    code: 'PER',
    name: 'Perth Airport',
    city: 'Perth',
    country: 'Australie',
    timezone: 'Australia/Perth'
  },
  {
    code: 'AKL',
    name: 'Auckland Airport',
    city: 'Auckland',
    country: 'Nouvelle-Zélande',
    timezone: 'Pacific/Auckland'
  },

  // Afrique
  {
    code: 'JNB',
    name: 'O.R. Tambo International',
    city: 'Johannesburg',
    country: 'Afrique du Sud',
    timezone: 'Africa/Johannesburg'
  },
  {
    code: 'CPT',
    name: 'Cape Town International',
    city: 'Le Cap',
    country: 'Afrique du Sud',
    timezone: 'Africa/Johannesburg'
  },
  {
    code: 'CAI',
    name: 'Cairo International',
    city: 'Le Caire',
    country: 'Égypte',
    timezone: 'Africa/Cairo'
  },
  {
    code: 'CMN',
    name: 'Mohammed V International',
    city: 'Casablanca',
    country: 'Maroc',
    timezone: 'Africa/Casablanca'
  },
  {
    code: 'NBO',
    name: 'Jomo Kenyatta International',
    city: 'Nairobi',
    country: 'Kenya',
    timezone: 'Africa/Nairobi'
  }
] as const;

export type AirportCode = typeof airports[number]['code'];