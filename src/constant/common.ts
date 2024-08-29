import { Name } from '@/types';

export abstract class Constants {
  public static readonly MSG_DIRTY_DATA: string = 'dirty data';

  public static readonly DEFAULT_NAME: Name = {
    nameEn: '',
    nameJp: '',
    nameTw: '',
  };

  public static readonly DATE_TIME_FORMAT: string = 'YYYY-MM-DD';

  public static readonly DEFAULT_EMPTY_STRING: string = '--';
}
