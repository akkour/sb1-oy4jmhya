import { SearchData } from '../../types';
import { FlightSearchService } from './flightSearch/FlightSearchService';

class FlightApi {
  private static searchService = new FlightSearchService();

  public static async searchFlights(searchData: SearchData) {
    return this.searchService.searchFlights(searchData);
  }
}

export default FlightApi;