import { format, parseISO } from 'date-fns';
import { SearchData } from '../../types';
import { mapAmadeusToFlightResults } from '../mappers/amadeusMapper';
import { validateSearchData } from '../validators/searchDataValidator';
import { formatSearchParams } from '../utils/searchParamsFormatter';
import { getAmadeusClient } from './amadeus/amadeusClient';

export class FlightSearchService {
  private readonly client = getAmadeusClient();
  private retryCount = 0;
  private readonly MAX_RETRIES = 3;

  private validateAndFormatDate(date: string): string {
    try {
      return format(parseISO(date), 'yyyy-MM-dd');
    } catch (error) {
      throw new Error('Invalid date format');
    }
  }

  public async searchFlights(searchData: SearchData) {
    try {
      validateSearchData(searchData);

      const departDate = this.validateAndFormatDate(searchData.departDate);
      const returnDate = searchData.returnDate 
        ? this.validateAndFormatDate(searchData.returnDate)
        : undefined;

      const params = formatSearchParams({
        ...searchData,
        departDate,
        returnDate
      });

      const response = await this.trySearchWithRetry(params);
      return this.processResponse(response, searchData);
    } catch (error) {
      console.error('Flight search error:', error);
      throw error;
    }
  }

  private async trySearchWithRetry(params: Record<string, string>) {
    try {
      return await this.client.searchFlightOffers(params);
    } catch (error) {
      if (this.retryCount < this.MAX_RETRIES) {
        this.retryCount++;
        console.log(`Retry attempt ${this.retryCount}/${this.MAX_RETRIES}...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount));
        return this.trySearchWithRetry(params);
      }
      throw error;
    }
  }

  private processResponse(response: any, searchData: SearchData) {
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid API response format');
    }

    return mapAmadeusToFlightResults(response.data, {
      departureDate: searchData.departDate,
      returnDate: searchData.returnDate,
      isOneWay: !searchData.returnDate
    });
  }
}