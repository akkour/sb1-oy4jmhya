import React from 'react';
import { format, eachDayOfInterval, addDays, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PriceCalendarProps {
  selectedDate: Date;
  prices: { [key: string]: number };
  onDateSelect: (date: Date) => void;
}

export function PriceCalendar({ selectedDate, prices, onDateSelect }: PriceCalendarProps) {
  const dateRange = eachDayOfInterval({
    start: subDays(selectedDate, 3),
    end: addDays(selectedDate, 3)
  });

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Prix par date</h3>
      <div className="grid grid-cols-7 gap-2">
        {dateRange.map((date) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          const price = prices[formattedDate];
          
          return (
            <button
              key={formattedDate}
              onClick={() => onDateSelect(date)}
              className={`p-2 rounded-lg text-center transition-colors ${
                format(selectedDate, 'yyyy-MM-dd') === formattedDate
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              <div className="text-sm font-medium">
                {format(date, 'EEE', { locale: fr })}
              </div>
              <div className="text-xs">
                {format(date, 'd MMM', { locale: fr })}
              </div>
              {price && (
                <div className="text-sm font-semibold mt-1">
                  {price}€
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}