import { CabinClass } from '../../types/flight';

type ClassMapping = {
  [key in CabinClass]: {
    skyscanner: string;
    kayak: string;
  };
};

export const cabinClassMapping: ClassMapping = {
  'ECONOMY': {
    skyscanner: 'economy',
    kayak: 'economy'
  },
  'PREMIUM_ECONOMY': {
    skyscanner: 'premiumeconomy',
    kayak: 'premium'
  },
  'BUSINESS': {
    skyscanner: 'business',
    kayak: 'business'
  },
  'FIRST': {
    skyscanner: 'first',
    kayak: 'first'
  }
};