import React, { useState } from 'react';
import { Bell } from 'lucide-react';

interface PriceAlertProps {
  route: {
    from: string;
    to: string;
    date: string;
  };
  currentPrice: number;
  onCreateAlert: (threshold: number) => void;
}

export function PriceAlert({ route, currentPrice, onCreateAlert }: PriceAlertProps) {
  const [threshold, setThreshold] = useState(currentPrice);
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAlert(threshold);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <Bell className="h-5 w-5" />
        <span>Créer une alerte de prix</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-10">
          <h4 className="font-medium mb-4">Configurer l'alerte</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                M'alerter si le prix passe sous
              </label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
                min={0}
                max={currentPrice}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Créer l'alerte
            </button>
          </form>
        </div>
      )}
    </div>
  );
}