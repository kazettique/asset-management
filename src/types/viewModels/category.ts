import { MCategory, SettingBase } from '@/types';

export interface VCategory extends MCategory {}

export interface VCategoryTable extends SettingBase {
  raw: VCategory;
}
