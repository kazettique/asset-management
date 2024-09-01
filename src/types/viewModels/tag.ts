import { MTag } from '@/types';

export interface VTag extends MTag {}

export interface VTagTable {
  comment: string;
  name: string;
  raw: VTag;
}
