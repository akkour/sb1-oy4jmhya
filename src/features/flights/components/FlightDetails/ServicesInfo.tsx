import React from 'react';
import { Wifi, Coffee, Power, Monitor } from 'lucide-react';

export function ServicesInfo() {
  const services = [
    { label: 'Choix du siège', included: false, price: 'à partir de 8€' },
    { label: 'Repas à bord', included: true },
    { label: 'Divertissement', included: true },
    { label: 'Wi-Fi', included: false, price: 'à partir de 5€' },
    { label: 'Prise électrique', included: true },
    { label: 'Port USB', included: true },
    { label: 'Programme fidélité', included: true },
    { label: 'Service prioritaire', included: false, price: 'à partir de 15€' },
  ];

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-4">Services inclus</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service, index) => (
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
}