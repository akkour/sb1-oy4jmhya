import React, { useState } from 'react';
import { Calendar, MapPin, Users, Plane } from 'lucide-react';

interface SearchFormProps {
  onSearch: (searchData: any) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [tripType, setTripType] = useState<'roundTrip' | 'oneWay'>('roundTrip');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          className={`px-4 py-2 rounded-full ${
            tripType === 'roundTrip'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setTripType('roundTrip')}
        >
          Aller-retour
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-full ${
            tripType === 'oneWay'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setTripType('oneWay')}
        >
          Aller simple
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Départ
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="D'où partez-vous ?"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchData.from}
              onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Où allez-vous ?"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchData.to}
              onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de départ
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchData.departDate}
              onChange={(e) => setSearchData({ ...searchData, departDate: e.target.value })}
            />
          </div>
        </div>

        {tripType === 'roundTrip' && (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de retour
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchData.returnDate}
                onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <div className="relative flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passagers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              min="1"
              max="9"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchData.passengers}
              onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="relative flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Classe
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchData.class}
            onChange={(e) => setSearchData({ ...searchData, class: e.target.value })}
          >
            <option value="economy">Économique</option>
            <option value="premium">Premium</option>
            <option value="business">Affaires</option>
            <option value="first">Première</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Rechercher
      </button>
    </form>
  );
};