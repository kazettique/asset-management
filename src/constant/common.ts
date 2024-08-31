import { Name } from '@/types';

export abstract class CommonConstant {
  public static readonly MSG_DIRTY_DATA: string = 'dirty data';

  public static readonly DEFAULT_NAME: Name = '';

  public static readonly DATE_TIME_FORMAT: string = 'YYYY-MM-DD';

  public static readonly DEFAULT_EMPTY_STRING: string = '--';
}
