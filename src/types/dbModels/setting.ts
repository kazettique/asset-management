import { DBrand, DCategory, DCurrency, DMethod, DOwner, DPlace, DTag } from '@/types';

export interface DSetting {
  brands: DBrand[];
  categories: DCategory[];
  currencies: DCurrency[];
  methods: DMethod[];
  owners: DOwner[];
  places: DPlace[];
  tags: DTag[];
}
