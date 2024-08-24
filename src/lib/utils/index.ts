import { GeneralResponse } from '@/types/type';

export function ResponseTransformer<T>(data: T): GeneralResponse<T> {
  return { data };
}
