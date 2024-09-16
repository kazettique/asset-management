import { MBrand, MCategory, MMethod, MOwner, MPlace, MPlatform, MTag } from '@/types';

export interface VSetting {
  brands: MBrand[];
  categories: MCategory[];
  endMethods: MMethod[];
  owners: MOwner[];
  places: MPlace[];
  platforms: MPlatform[];
  startMethods: MMethod[];
  tags: MTag[];
}
