import { MOwner } from '@/types';

export interface VOwner extends MOwner {}

export interface VOwnerTable {
  comment: string;
  name: string;
  raw: VOwner;
}
