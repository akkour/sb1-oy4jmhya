import React, { useState } from 'react';
import { Clock, Plane } from 'lucide-react';
import { Flight } from '../../types';
import { formatDateTime, formatDate } from '../../utils/dateUtils';
import { getAirlineInfo } from '../../utils/airlineUtils';
import { Button } from '../ui/Button';
import { FlightDetails } from './FlightDetails';

interface SearchResultsProps {
  flights: Flight[];
  loading?: boolean;
}

export function SearchResults({ flights, loading }: SearchResultsProps) {
  const [selectedFlightPair, setSelectedFlightPair] = useState<{
    outbound: Flight;
    return?: Flight;
  } | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Grouper les vols par paires aller-retour
  const flightPairs = flights.reduce<{ outbound: Flight; return?: Flight }[]>((pairs, flight) => {
    if (flight.type === 'outbound') {
      const returnFlight = flights.find(
        f => f.type === 'return' && f.linkedFlightId === flight.id
      );
      pairs.push({ outbound: flight, return: returnFlight });
    }
    return pairs;
  }, []);

  if (flightPairs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun vol trouvé pour votre recherche.</p>
      </div>
    );
  }

  const renderFlightSegment = (flight: Flight, type: 'Aller' | 'Retour') => (
    <div className="p-4 border-b last:border-b-0">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={getAirlineInfo(flight.airline).logo}
            alt={getAirlineInfo(flight.airline).name}
            className="w-8 h-8 rounded"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/32x32.png?text=${flight.airline}`;
            }}
          />
          <div>
            <p className="font-semibold">{getAirlineInfo(flight.airline).name}</p>
            <p className="text-sm text-gray-500">Vol {flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-blue-600">{flight.price}€</p>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <Plane className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="font-semibold">{flight.departure.airport}</p>
              <p className="text-sm text-gray-500">
                {formatDateTime(flight.departure.time, flight.departure.airport)}
                <br />
                {formatDate(flight.departure.time, flight.departure.airport)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 text-center">
          <div className="flex items-center justify-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">{flight.duration}</span>
          </div>
          {flight.stops > 0 && (
            <p className="text-xs text-gray-400">
              {flight.stops} escale{flight.stops > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="flex-1 text-right">
          <div className="flex items-center justify-end">
            <div className="text-right mr-2">
              <p className="font-semibold">{flight.arrival.airport}</p>
              <p className="text-sm text-gray-500">
                {formatDateTime(flight.arrival.time, flight.arrival.airport)}
                <br />
                {formatDate(flight.arrival.time, flight.arrival.airport)}
              </p>
            </div>
            <Plane className="h-5 w-5 text-gray-400 transform rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {flightPairs.map(({ outbound, return: returnFlight }) => (
        <div
          key={outbound.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          {renderFlightSegment(outbound, 'Aller')}
          {returnFlight && renderFlightSegment(returnFlight, 'Retour')}
          
          <div className="p-4 bg-gray-50 rounded-b-lg flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {returnFlight 
                  ? `${outbound.price + returnFlight.price}€`
                  : `${outbound.price}€`
                }
              </p>
              <p className="text-sm text-gray-500">Prix total</p>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedFlightPair({ outbound, return: returnFlight });
                  setShowDetails(true);
                }}
              >
                Détails
              </Button>
              <Button
                variant="primary"
                onClick={() => window.open(getAirlineInfo(outbound.airline).bookingUrl, '_blank')}
              >
                Réserver
              </Button>
            </div>
          </div>
        </div>
      ))}

      {showDetails && selectedFlightPair && (
        <FlightDetails
          flight={selectedFlightPair.outbound}
          returnFlight={selectedFlightPair.return}
          onClose={() => {
            setShowDetails(false);
            setSelectedFlightPair(null);
          }}
        />
      )}
    </div>
  );
}