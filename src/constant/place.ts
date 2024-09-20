import { DPlace, FormOption, FPlace, Id } from '@/types';

import { CommonConstant } from './common';
export abstract class PlaceConstant {
  public static readonly DEFAULT_PLACE: DPlace = {
    ...CommonConstant.DEFAULT_SETTING_BASE,
    id: '21a1d59e-c69d-4ec9-b7d4-304c7e216aa0',
  };

  public static readonly DEFAULT_PLACE_OPTION: FormOption<Id> = {
    label: this.DEFAULT_PLACE.name,
    value: this.DEFAULT_PLACE.id,
  };

  public static readonly F_PLACE_INITIAL_VALUES: FPlace = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
