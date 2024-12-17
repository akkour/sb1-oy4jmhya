import { format, parseISO } from 'date-fns';
import { SearchData } from '../../../types';
import { mapAmadeusToFlightResults } from '../mappers/amadeusMapper';
import { validateSearchData } from '../validators/searchDataValidator';
import { formatSearchParams } from '../utils/searchParamsFormatter';
import { getAmadeusClient } from '../amadeus/amadeusClient';
import { handleApiError } from '../utils/errorHandler';
import { withRetry } from '../utils/retryUtils';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export class FlightSearchService {
  private readonly client = getAmadeusClient();

  private validateAndFormatDate(date: string): string {
    try {
      return format(parseISO(date), 'yyyy-MM-dd');
    } catch (error) {
      throw new Error(ERROR_MESSAGES.INVALID_DATE_FORMAT);
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

      const response = await withRetry(() => this.client.searchFlightOffers(params));
      return this.processResponse(response, searchData);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  private processResponse(response: any, searchData: SearchData) {
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error(ERROR_MESSAGES.INVALID_RESPONSE_FORMAT);
    }

    return mapAmadeusToFlightResults(response.data, {
      departureDate: searchData.departDate,
      returnDate: searchData.returnDate,
      isOneWay: !searchData.returnDate
    });
  }
}