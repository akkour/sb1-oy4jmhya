import React from 'react';

interface ClassSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ClassSelector({ value, onChange }: ClassSelectorProps) {
  return (
    <div className="relative flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Classe
      </label>
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="ECONOMY">Économique</option>
        <option value="PREMIUM_ECONOMY">Premium</option>
        <option value="BUSINESS">Affaires</option>
        <option value="FIRST">Première</option>
      </select>
    </div>
  );
}