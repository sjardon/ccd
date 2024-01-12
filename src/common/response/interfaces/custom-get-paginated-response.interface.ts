import { CustomGetResponse } from './custom-get-response.interface';

export interface CustomGetPaginatedResponse<T> extends CustomGetResponse<T> {
  nextPage: number;
  lastPage: number;
  limit: number;
}
