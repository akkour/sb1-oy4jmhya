import React from 'react';
import { Luggage, Info } from 'lucide-react';

export function BaggageInfo() {
  return (
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
}