import { SearchData } from '../../types';

export function validateSearchData(searchData: SearchData): void {
  if (!searchData.from || !searchData.to) {
    throw new Error('Les aéroports de départ et d\'arrivée sont requis');
  }

  if (!searchData.departDate) {
    throw new Error('La date de départ est requise');
  }

  if (searchData.passengers < 1 || searchData.passengers > 9) {
    throw new Error('Le nombre de passagers doit être entre 1 et 9');
  }

  const validClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];
  if (!validClasses.includes(searchData.class)) {
    throw new Error('Classe de voyage invalide');
  }
}