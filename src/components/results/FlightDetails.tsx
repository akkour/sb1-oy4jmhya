import React from 'react';
import { Clock, Plane, AlertTriangle, Luggage, Info, Shield } from 'lucide-react';
import { Flight } from '../../types';
import { formatDateTime, formatDate, getAirportTimezone } from '../../utils/dateUtils';
import { getAirlineInfo } from '../../utils/airlineUtils';
import { Button } from '../ui/Button';
import { PriceAlert } from '../features/PriceAlert';

interface FlightDetailsProps {
  flight: Flight;
  returnFlight?: Flight;
  onClose: () => void;
}

export function FlightDetails({ flight, returnFlight, onClose }: FlightDetailsProps) {
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
        {flightData.segments.map((segment, index) => (
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
                </div>
              </div>
            </div>

            {index < flightData.segments.length - 1 && (
              <div className="my-4 px-6 py-3 bg-amber-50 border-l-4 border-amber-400 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                  <div>
                    <p className="font-medium text-amber-700">Escale à {segment.arrival.airport}</p>
                    <p className="text-sm text-amber-600">
                      Durée de l'escale: 2h30
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-8">
          <div>
            <p className="text-sm font-medium text-gray-600">Durée totale</p>
            <p className="text-lg font-semibold">{flightData.duration}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Distance totale</p>
            <p className="text-lg font-semibold">1 450 km</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Émissions CO2</p>
            <p className="text-lg font-semibold">245 kg</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBaggageInfo = () => (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-4 flex items-center">
        <Luggage className="w-5 h-5 mr-2 text-blue-600" />
        Bagages inclus
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium mb-2">Bagage cabine</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                <Info className="w-3 h-3 text-blue-600" />
              </span>
              1 sac à main (max. 40x30x20 cm)
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                <Info className="w-3 h-3 text-blue-600" />
              </span>
              1 bagage cabine (max. 55x40x23 cm, 10 kg)
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium mb-2">Bagage en soute</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                <Info className="w-3 h-3 text-blue-600" />
              </span>
              1 bagage (max. 23 kg)
            </li>
            <li className="flex items-start text-blue-600">
              <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                <Info className="w-3 h-3 text-blue-600" />
              </span>
              Bagages supplémentaires disponibles à l'achat
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderConditions = () => (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-4 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-blue-600" />
        Conditions
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium mb-2">Modification</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                <Info className="w-3 h-3 text-blue-600" />
              </span>
              Modifiable avec frais
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                <Info className="w-3 h-3 text-blue-600" />
              </span>
              Frais de modification : à partir de 50€
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium mb-2">Remboursement</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                <Info className="w-3 h-3 text-blue-600" />
              </span>
              Non remboursable
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                <Info className="w-3 h-3 text-blue-600" />
              </span>
              Taxes remboursables
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-4">Services inclus</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Choix du siège', included: false, price: 'à partir de 8€' },
          { label: 'Repas à bord', included: true },
          { label: 'Divertissement', included: true },
          { label: 'Wi-Fi', included: false, price: 'à partir de 5€' },
          { label: 'Prise électrique', included: true },
          { label: 'Port USB', included: true },
          { label: 'Programme fidélité', included: true },
          { label: 'Service prioritaire', included: false, price: 'à partir de 15€' },
        ].map((service, index) => (
          <div key={index} className="text-sm">
            <div className="flex items-center">
              {service.included ? (
                <span className="w-4 h-4 mr-2 text-green-500">✓</span>
              ) : (
                <span className="w-4 h-4 mr-2 text-gray-400">×</span>
              )}
              <span className={service.included ? 'text-gray-900' : 'text-gray-500'}>
                {service.label}
              </span>
            </div>
            {!service.included && service.price && (
              <span className="text-xs text-blue-600 ml-6">{service.price}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
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

          {renderBaggageInfo()}
          {renderConditions()}
          {renderServices()}

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