import React from 'react';
import { Users } from 'lucide-react';

interface PassengerSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function PassengerSelector({ value, onChange }: PassengerSelectorProps) {
  return (
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
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}