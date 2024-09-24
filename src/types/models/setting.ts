import { MBrand, MCategory, MMethod, MOwner, MPlace, MPlatform, MTag } from '@/types';

export interface MSettingOptions {
  brands: MBrand[];
  categories: MCategory[];
  methods: MMethod[];
  owners: MOwner[];
  places: MPlace[];
  platforms: MPlatform[];
  tags: MTag[];
}
