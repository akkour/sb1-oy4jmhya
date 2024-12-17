import React from 'react';
import { Button } from '../Button';

interface BookingFooterProps {
  onClose: () => void;
}

export function BookingFooter({ onClose }: BookingFooterProps) {
  return (
    <div className="mt-6 pt-6 border-t flex justify-end">
      <Button variant="outline" onClick={onClose}>
        Fermer
      </Button>
    </div>
  );
}