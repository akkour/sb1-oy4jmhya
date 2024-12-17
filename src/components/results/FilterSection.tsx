import React from 'react';
import { Sliders } from 'lucide-react';
import { Button } from '../ui/Button';
import { getAirlineInfo } from '../../utils/airlineUtils';

interface FilterSectionProps {
  filters: {
    maxPrice: number;
    stops: string;
    airlines: string[];
    departureTime: string;
    duration: number;
    sort: string;
  };
  onFilterChange: (filters: any) => void;
  airlines: string[];
  maxAvailablePrice: number;
}

export function FilterSection({ filters, onFilterChange, airlines, maxAvailablePrice }: FilterSectionProps) {
  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleAirlineToggle = (airlineCode: string) => {
    const newAirlines = filters.airlines.includes(airlineCode)
      ? filters.airlines.filter(code => code !== airlineCode)
      : [...filters.airlines, airlineCode];
    handleFilterChange('airlines', newAirlines);
  };

  // Arrondir le prix maximum au multiple de 100 supérieur
  const roundedMaxPrice = Math.ceil(maxAvailablePrice / 100) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Sliders className="h-5 w-5 text-gray-500" />
        <h3 className="font-semibold text-lg">Filtres</h3>
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
            max={roundedMaxPrice}
            step="50"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0€</span>
            <span>{roundedMaxPrice}€</span>
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

        <Button
          variant="outline"
          fullWidth
          onClick={() => {
            onFilterChange({
              maxPrice: roundedMaxPrice,
              stops: 'any',
              airlines: [],
              departureTime: 'any',
              duration: 24,
              sort: 'price'
            });
          }}
        >
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
}