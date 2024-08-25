import { z } from 'zod';

import { Name } from '@/type';

export const NameValidator: z.ZodSchema<Name> = z.object({
  nameEn: z.string().nullable(),
  nameJp: z.string().nullable(),
  nameTw: z.string().nullable(),
});
