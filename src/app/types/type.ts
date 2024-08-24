import { HttpStatusCode } from './http';

export interface GeneralResponse<T> {
  data: T;
  status: HttpStatusCode;
}
