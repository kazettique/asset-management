import { MBrand, MCategory, MMethod, MOwner, MPlace, MPlatform, MSetting, MTag } from '@/types';

export interface VSettingOptions {
  brands: MBrand[];
  categories: MCategory[];
  endMethods: MMethod[];
  owners: MOwner[];
  places: MPlace[];
  platforms: MPlatform[];
  startMethods: MMethod[];
  tags: MTag[];
}

export type VSetting = MSetting;
