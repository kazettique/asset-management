import { PFindPagination } from '../payloadModels';

export interface FormOption<Value extends string | number = string> {
  __isNew__?: boolean;
  label: string;
  value: Value;
}

export interface FFindPagination extends PFindPagination {}
