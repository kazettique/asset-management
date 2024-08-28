import { DSetting, MSetting, VSetting } from '@/types';

import { BrandTransformer } from './brand';
import { CategoryTransformer } from './category';
import { CurrencyTransformer } from './currency';
import { MethodTransformer } from './method';
import { OwnerTransformer } from './owner';
import { PlaceTransformer } from './place';

export abstract class SettingTransformer {
  public static DAssetTransformer(src: DSetting): MSetting {
    return {
      brands: src.brands.map((item) => BrandTransformer.DBrandTransformer(item)),
      categories: src.categories.map((item) => CategoryTransformer.DCategoryTransformer(item)),
      currencies: src.currencies.map((item) => CurrencyTransformer.DCurrencyTransformer(item)),
      methods: src.methods.map((item) => MethodTransformer.DMethodTransformer(item)),
      owners: src.owners.map((item) => OwnerTransformer.DOwnerTransformer(item)),
      places: src.places.map((item) => PlaceTransformer.DPlaceTransformer(item)),
    };
  }

  public static MSettingTransformer(src: MSetting): VSetting {
    return src;
  }
}
