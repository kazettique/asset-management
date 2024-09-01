import { MPlatform } from '@/types';

export interface VPlatform extends MPlatform {}

export interface VPlatformTable {
  comment: string;
  name: string;
  raw: VPlatform;
}
