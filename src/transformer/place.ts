import { MPlace, VPlace } from '@/types';
import { DPlace } from '@/types/dbModels';

export abstract class PlaceTransformer {
  public static DMPlaceTransformer(src: DPlace): MPlace {
    return src;
  }

  public static MVPlaceTransformer(src: MPlace): VPlace {
    return src;
  }
}
