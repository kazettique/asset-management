import { MPlace } from '@/types';

export interface VPlace extends MPlace {}

export interface VPlaceTable {
  comment: string;
  name: string;
  raw: VPlace;
}
