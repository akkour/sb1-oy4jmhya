import { Flight } from '../../types';

export interface FlightDetailsProps {
  flight: Flight;
  returnFlight?: Flight;
  onClose: () => void;
}

export interface FlightCardProps {
  flight: Flight;
  type: 'Aller' | 'Retour';
  onShowDetails: () => void;
}