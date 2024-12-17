import React from 'react';
import { SearchForm } from '../../../components/search/SearchForm';
import { SearchData } from '../../../types';

interface SearchSectionProps {
  onSearch: (data: SearchData) => Promise<void>;
}

export function SearchSection({ onSearch }: SearchSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <SearchForm onSearch={onSearch} />
    </div>
  );
}