import { SearchData, Flight } from '../../types';

export interface IFlightApi {
  searchFlights(searchData: SearchData): Promise<Flight[]>;
}

export interface IFlightSearchService {
  searchFlights(searchData: SearchData): Promise<Flight[]>;
}