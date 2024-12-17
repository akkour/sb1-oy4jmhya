import React from 'react';
import { Sliders } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { getAirlineInfo } from '../../../utils/airlineUtils';
import { FilterSectionProps } from '../types';

export function FilterSection({ 
  filters, 
  onFilterChange, 
  airlines, 
  maxAvailablePrice 
}: FilterSectionProps) {
  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({ [key]: value });
  };

  const handleAirlineToggle = (airlineCode: string) => {
    const newAirlines = filters.airlines.includes(airlineCode)
      ? filters.airlines.filter(code => code !== airlineCode)
      : [...filters.airlines, airlineCode];
    handleFilterChange('airlines', newAirlines);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sliders className="h-5 w-5 text-gray-500" />
          <h3 className="font-semibold text-lg">Filtres</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange({
            maxPrice: maxAvailablePrice,
            stops: 'any',
            airlines: [],
            departureTime: 'any',
            duration: 24,
            sort: 'price'
          })}
        >
          Réinitialiser
        </Button>
      </div>

      <div className="space-y-6">
        {/* Prix maximum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix maximum: {filters.maxPrice}€
          </label>
          <input
            type="range"
            min="0"
            max={maxAvailablePrice}
            step="50"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0€</span>
            <span>{maxAvailablePrice}€</span>
          </div>
        </div>

        {/* Escales */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Escales
          </label>
          <div className="space-y-2">
            {[
              { value: 'any', label: 'Toutes les escales' },
              { value: 'direct', label: 'Vol direct' },
              { value: '1', label: '1 escale' },
              { value: '2', label: '2 escales ou plus' }
            ].map(({ value, label }) => (
              <label key={value} className="flex items-center">
                <input
                  type="radio"
                  name="stops"
                  value={value}
                  checked={filters.stops === value}
                  onChange={(e) => handleFilterChange('stops', e.target.value)}
                  className="mr-2"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Compagnies aériennes */}
        {airlines.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compagnies aériennes
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {airlines.map(code => {
                const airline = getAirlineInfo(code);
                return (
                  <label key={code} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.airlines.includes(code)}
                      onChange={() => handleAirlineToggle(code)}
                      className="mr-2"
                    />
                    <img
                      src={airline.logo}
                      alt={airline.name}
                      className="w-6 h-6 mr-2"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/24x24.png?text=${code}`;
                      }}
                    />
                    {airline.name}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Heure de départ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heure de départ
          </label>
          <select
            value={filters.departureTime}
            onChange={(e) => handleFilterChange('departureTime', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="any">Toute heure</option>
            <option value="morning">Matin (6h-12h)</option>
            <option value="afternoon">Après-midi (12h-18h)</option>
            <option value="evening">Soir (18h-00h)</option>
            <option value="night">Nuit (00h-6h)</option>
          </select>
        </div>

        {/* Tri */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trier par
          </label>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="price">Prix (croissant)</option>
            <option value="duration">Durée (plus court)</option>
            <option value="departure">Heure de départ</option>
            <option value="arrival">Heure d'arrivée</option>
          </select>
        </div>
      </div>
    </div>
  );
}