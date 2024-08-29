import { FPlace } from '@/types';

import { CommonConstant } from './common';
export abstract class PlaceConstant {
  public static readonly F_PLACE_INITIAL_VALUES: FPlace = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
