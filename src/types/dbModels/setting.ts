import { Prisma } from '@prisma/client';

import { DBrand, DCategory, DMethod, DOwner, DPlace, DTag, Id } from '@/types';

export interface DSettingOptions {
  brands: DBrand[];
  categories: DCategory[];
  methods: DMethod[];
  owners: DOwner[];
  places: DPlace[];
  tags: DTag[];
}

export interface DSetting {
  id: Id;
  key: string;
  value: Prisma.JsonValue;
}
