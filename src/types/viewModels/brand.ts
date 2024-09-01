import { MBrand, SettingBase } from '@/types';

export interface VBrand extends MBrand {}

export interface VBrandTable {
  comment: string;
  name: string;
  raw: VBrand;
}
