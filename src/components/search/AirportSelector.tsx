import React, { useState, useCallback } from 'react';
import { Plane } from 'lucide-react';
import { AutocompleteInput } from '../ui/AutocompleteInput';
import { searchAirports } from '../../utils/searchUtils';
import type { Airport } from '../../types';

interface AirportSelectorProps {
  label: string;
  value: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onChange: (airport: Airport) => void;
  placeholder?: string;
}

export function AirportSelector({
  label,
  value,
  inputValue,
  onInputChange,
  onChange,
  placeholder
}: AirportSelectorProps) {
  const [searchResults, setSearchResults] = useState<Airport[]>([]);

  const handleSearch = useCallback((query: string) => {
    onInputChange(query);
    const results = searchAirports(query);
    setSearchResults(results);
  }, [onInputChange]);

  const handleSelect = useCallback((airport: Airport) => {
    onChange(airport);
  }, [onChange]);

  return (
    <AutocompleteInput
      label={label}
      icon={Plane}
      value={inputValue}
      onChange={handleSearch}
      onSelect={handleSelect}
      options={searchResults}
      placeholder={placeholder}
    />
  );
}