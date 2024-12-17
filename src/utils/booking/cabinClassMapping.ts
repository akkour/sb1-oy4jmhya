import { AirlineCode } from '../../types';

export const cabinClassMapping: Record<string, Record<AirlineCode, string>> = {
  ECONOMY: {
    AF: 'ECONOMY',
    AT: 'Y',
    AC: 'economy',
    KL: 'ECONOMY',
    LH: 'economy',
    BA: 'economy',
    IB: 'economy',
    AZ: 'economy',
    LX: 'economy'
  },
  PREMIUM_ECONOMY: {
    AF: 'PREMIUM',
    AT: 'W',
    AC: 'premium-economy',
    KL: 'PREMIUM',
    LH: 'premium-economy',
    BA: 'premium-economy',
    IB: 'premium-economy',
    AZ: 'premium-economy',
    LX: 'premium-economy'
  },
  BUSINESS: {
    AF: 'BUSINESS',
    AT: 'C',
    AC: 'business',
    KL: 'BUSINESS',
    LH: 'business',
    BA: 'business',
    IB: 'business',
    AZ: 'business',
    LX: 'business'
  },
  FIRST: {
    AF: 'FIRST',
    AT: 'F',
    AC: 'first',
    KL: 'FIRST',
    LH: 'first',
    BA: 'first',
    IB: 'first',
    AZ: 'first',
    LX: 'first'
  }
};