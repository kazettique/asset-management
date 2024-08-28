import { DBrand, DCategory, DCurrency, DMethod, DOwner, DPlace } from '@/types';

export interface DSetting {
  brands: DBrand[];
  categories: DCategory[];
  currencies: DCurrency[];
  methods: DMethod[];
  owners: DOwner[];
  places: DPlace[];
}
