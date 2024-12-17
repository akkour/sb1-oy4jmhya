import React from 'react';
import { Clock, Plane, Calendar, MapPin, Info, AlertTriangle } from 'lucide-react';
import { Flight } from '../../types';
import { formatDateTime, formatDate, getAirportTimezone } from '../../utils/dateUtils';
import { getAirlineInfo } from '../../utils/airlineUtils';
import { Button } from '../ui/Button';
import { PriceAlert } from '../features/PriceAlert';

interface FlightDetailsProps {
  flight: Flight;
  returnFlight?: Flight | null;
  onClose: () => void;
}

export function FlightDetails({ flight, returnFlight, onClose }: FlightDetailsProps) {
  const renderSegmentDetails = (segment: Flight['segments'][0], index: number, totalSegments: number) => (
    <div key={index} className="relative">
      <div className="flex justify-between items-start border-l-2 border-blue-200 pl-4 pb-6">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <img
              src={getAirlineInfo(segment.carrier).logo}
              alt={getAirlineInfo(segment.carrier).name}
              className="w-8 h-8 mr-3"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/32x32.png?text=${segment.carrier}`;
              }}
            />
            <div>
              <p className="font-medium">{getAirlineInfo(segment.carrier).name}</p>
              <p className="text-sm text-gray-500">Vol {segment.flightNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-2">
                <Plane className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-semibold">Départ</span>
              </div>
              <p className="text-lg font-medium">{segment.departure.airport}</p>
              <div className="text-sm text-gray-600">
                <p className="font-medium">
                  {formatDateTime(segment.departure.time, segment.departure.airport)}
                </p>
                <p>{formatDate(segment.departure.time, segment.departure.airport)}</p>
                <p className="text-xs text-gray-400">
                  Fuseau horaire: {getAirportTimezone(segment.departure.airport)}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Plane className="w-5 h-5 mr-2 text-blue-500 transform rotate-90" />
                <span className="font-semibold">Arrivée</span>
              </div>
              <p className="text-lg font-medium">{segment.arrival.airport}</p>
              <div className="text-sm text-gray-600">
                <p className="font-medium">
                  {formatDateTime(segment.arrival.time, segment.arrival.airport)}
                </p>
                <p>{formatDate(segment.arrival.time, segment.arrival.airport)}</p>
                <p className="text-xs text-gray-400">
                  Fuseau horaire: {getAirportTimezone(segment.arrival.airport)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-400" />
              <span>Durée: {segment.duration}</span>
            </div>
            <div className="flex items-center">
              <Info className="w-4 h-4 mr-1 text-gray-400" />
              <span>Distance: {/* TODO: Ajouter la distance */}</span>
            </div>
          </div>
        </div>
      </div>

      {index < totalSegments - 1 && (
        <div className="my-4 px-6 py-3 bg-amber-50 border-l-4 border-amber-400 rounded">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            <div>
              <p className="font-medium text-amber-700">Escale à {segment.arrival.airport}</p>
              <p className="text-sm text-amber-600">
                Durée: {/* TODO: Calculer la durée de l'escale */}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFlightInfo = (flightData: Flight, type: 'Aller' | 'Retour') => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Vol {type}</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {flightData.stops === 0 ? 'Vol direct' : `${flightData.stops} escale${flightData.stops > 1 ? 's' : ''}`}
          </span>
          <span className="text-lg font-semibold text-blue-600">{flightData.price}€</span>
        </div>
      </div>

      <div className="space-y-6">
        {flightData.segments.map((segment, index) => 
          renderSegmentDetails(segment, index, flightData.segments.length)
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-8">
          <div>
            <p className="text-sm font-medium text-gray-600">Durée totale</p>
            <p className="text-lg font-semibold">{flightData.duration}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Distance totale</p>
            <p className="text-lg font-semibold">{/* TODO: Calculer la distance totale */}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Émissions CO2</p>
            <p className="text-lg font-semibold">{/* TODO: Calculer les émissions */}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Détails du vol</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {renderFlightInfo(flight, 'Aller')}
          {returnFlight && renderFlightInfo(returnFlight, 'Retour')}

          <div className="mt-6 border-t pt-6 flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                Prix total: {returnFlight 
                  ? `${flight.price + returnFlight.price}€`
                  : `${flight.price}€`
                }
              </p>
              <div className="mt-2">
                <PriceAlert
                  route={{
                    from: flight.departure.airport,
                    to: flight.arrival.airport,
                    date: flight.departure.time
                  }}
                  currentPrice={flight.price}
                  onCreateAlert={(threshold) => {
                    console.log('Alert created with threshold:', threshold);
                    // TODO: Implémenter la création d'alerte
                  }}
                />
              </div>
            </div>
            <div className="space-x-4">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Fermer
              </Button>
              <Button
                variant="primary"
                onClick={() => window.open(getAirlineInfo(flight.airline).bookingUrl, '_blank')}
              >
                Réserver maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}