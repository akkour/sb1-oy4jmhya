import React from 'react';
import { SearchForm } from '../search/SearchForm';
import { SearchData } from '../../types';

interface SearchSectionProps {
  onSearch: (searchData: SearchData) => Promise<void>;
}

export function SearchSection({ onSearch }: SearchSectionProps) {
  return (
    <div className="w-full">
      <SearchForm onSearch={onSearch} />
    </div>
  );
}