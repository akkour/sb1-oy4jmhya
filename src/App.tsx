import React from 'react';
import { PageLayout } from './components/layout/PageLayout';
import { SearchSection } from './features/search/components/SearchSection';
import { ResultsSection } from './features/search/components/ResultsSection';
import { useSearch } from './features/search/hooks/useSearch';

export default function App() {
  const [searchState, searchActions] = useSearch();
  const { searchData, flights, loading, error, filters } = searchState;
  const { search, updateFilters, resetFilters } = searchActions;

  return (
    <PageLayout>
      <SearchSection onSearch={search} />
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {(searchData || flights.length > 0) && (
        <ResultsSection
          flights={flights}
          loading={loading}
          filters={filters}
          onFilterChange={updateFilters}
          onResetFilters={resetFilters}
        />
      )}
    </PageLayout>
  );
}