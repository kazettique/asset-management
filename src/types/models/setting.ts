import { MBrand, MCategory, MCurrency, MMethod, MOwner, MPlace, MPlatform, MTag } from '@/types';

export interface MSetting {
  brands: MBrand[];
  categories: MCategory[];
  currencies: MCurrency[];
  methods: MMethod[];
  owners: MOwner[];
  places: MPlace[];
  platforms: MPlatform[];
  tags: MTag[];
}
