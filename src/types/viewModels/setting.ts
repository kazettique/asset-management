import { MBrand, MCategory, MCurrency, MMethod, MOwner, MPlace, MPlatform } from '@/types';

export interface VSetting {
  brands: MBrand[];
  categories: MCategory[];
  currencies: MCurrency[];
  endMethods: MMethod[];
  owners: MOwner[];
  places: MPlace[];
  platforms: MPlatform[];
  startMethods: MMethod[];
}
