import React from 'react';
import { Leaf } from 'lucide-react';

export function EnvironmentalInfo() {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center mb-4">
        <Leaf className="w-5 h-5 mr-2 text-green-600" />
        <h4 className="font-semibold">Impact environnemental</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Émissions CO2</p>
          <p className="text-lg font-semibold">245 kg</p>
          <p className="text-xs text-gray-500">par passager</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Compensation carbone</p>
          <p className="text-lg font-semibold">15€</p>
          <p className="text-xs text-gray-500">contribution volontaire</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Score environnemental</p>
          <p className="text-lg font-semibold text-green-600">B+</p>
          <p className="text-xs text-gray-500">sur une échelle de A à F</p>
        </div>
      </div>
    </div>
  );
}