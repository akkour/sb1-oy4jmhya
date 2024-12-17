import React from 'react';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
}

export function DateSelector({ label, value, onChange, minDate }: DateSelectorProps) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="date"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate}
        />
      </div>
    </div>
  );
}