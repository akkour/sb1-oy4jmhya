import React from 'react';
import { X } from 'lucide-react';

interface BookingHeaderProps {
  onClose: () => void;
}

export function BookingHeader({ onClose }: BookingHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Réserver votre vol</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Fermer"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}