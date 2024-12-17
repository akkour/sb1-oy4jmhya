import React from 'react';
import { Plane } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex justify-center items-center mb-4">
        <div className="bg-blue-600 p-3 rounded-full">
          <Plane className="h-12 w-12 text-white" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Trouvez les meilleurs vols
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Comparez les prix des vols parmi des centaines de compagnies aériennes et trouvez les meilleures offres pour votre prochain voyage.
      </p>
    </header>
  );
}