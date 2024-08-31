import { MethodType } from '@prisma/client';

import { DbBase, SettingBase } from '../common';

export interface DMethod extends DbBase, SettingBase {
  type: MethodType;
}
