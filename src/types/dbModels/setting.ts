import { DBrand, DCategory, DMethod, DOwner, DPlace, DTag } from '@/types';

export interface DSettingOptions {
  brands: DBrand[];
  categories: DCategory[];
  methods: DMethod[];
  owners: DOwner[];
  places: DPlace[];
  tags: DTag[];
}
