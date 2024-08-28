import { Name } from '@/types';

export abstract class Constants {
  public static readonly MSG_DIRTY_DATA: string = 'dirty data';

  public static readonly DEFAULT_NAME: Name = {
    nameEn: null,
    nameJp: null,
    nameTw: null,
  };

  public static readonly DATE_TIME_FORMAT: string = 'YYYY-MM-DD HH:mm';
}
