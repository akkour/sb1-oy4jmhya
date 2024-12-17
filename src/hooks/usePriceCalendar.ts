import { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import FlightApi from '../services/api/flightApi';
import { SearchData } from '../types';

export function usePriceCalendar(searchData: SearchData) {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const selectedDate = new Date(searchData.departDate);
        const dates = [];
        
        // Fetch prices for ±3 days
        for (let i = -3; i <= 3; i++) {
          const date = i === 0 ? selectedDate : i < 0 ? subDays(selectedDate, Math.abs(i)) : addDays(selectedDate, i);
          dates.push(date);
        }

        const pricePromises = dates.map(date => 
          FlightApi.searchFlights({
            ...searchData,
            departDate: format(date, 'yyyy-MM-dd')
          })
        );

        const results = await Promise.all(pricePromises);
        const newPrices: { [key: string]: number } = {};

        results.forEach((flights, index) => {
          const date = format(dates[index], 'yyyy-MM-dd');
          const minPrice = Math.min(...flights.map(f => f.price));
          newPrices[date] = minPrice;
        });

        setPrices(newPrices);
      } catch (error) {
        console.error('Erreur lors de la récupération des prix:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchData.departDate) {
      fetchPrices();
    }
  }, [searchData.departDate]);

  return { prices, loading };
}