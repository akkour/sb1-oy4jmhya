import { useState, useEffect } from 'react';
import FlightApi from '../services/api/flightApi';
import { airports } from '../data/airports';

export function useDestinationPrices(origin: string, date: string) {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDestinationPrices = async () => {
      setLoading(true);
      try {
        const popularDestinations = airports.slice(0, 10); // Limiter pour l'exemple
        const pricePromises = popularDestinations.map(dest =>
          FlightApi.searchFlights({
            from: origin,
            to: dest.code,
            departDate: date,
            passengers: 1,
            class: 'ECONOMY'
          })
        );

        const results = await Promise.all(pricePromises);
        
        const destinationsWithPrices = popularDestinations.map((dest, index) => ({
          ...dest,
          price: Math.min(...results[index].map(f => f.price))
        }));

        setDestinations(destinationsWithPrices);
      } catch (error) {
        console.error('Erreur lors de la récupération des prix:', error);
      } finally {
        setLoading(false);
      }
    };

    if (origin && date) {
      fetchDestinationPrices();
    }
  }, [origin, date]);

  return { destinations, loading };
}