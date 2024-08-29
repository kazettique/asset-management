import { DSetting, FSettingOptions, MCurrency, MSetting, Name, VSetting } from '@/types';

import { BrandTransformer } from './brand';
import { CategoryTransformer } from './category';
import { CurrencyTransformer } from './currency';
import { MethodTransformer } from './method';
import { OwnerTransformer } from './owner';
import { PlaceTransformer } from './place';

export abstract class SettingTransformer {
  public static DSettingTransformer(src: DSetting): MSetting {
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

  public static FSettingOptionsTransformer(src: VSetting): FSettingOptions {
    // TODO: need stricter typing
    const parseName = (name: Name): string =>
      Object.values(name)
        .filter((item) => item.length > 0)
        .join('|');

    const parseCurrency = (currency: MCurrency) => `(${currency.display})${currency.symbol}`;

    return {
      brands: src.brands.map((item) => ({ label: parseName(item.name), value: item.id })),
      categories: src.categories.map((item) => ({ label: parseName(item.name), value: item.id })),
      currencies: src.currencies.map((item) => ({ label: parseCurrency(item), value: item.id })),
      methods: src.methods.map((item) => ({ label: parseName(item.name), value: item.id })),
      owners: src.owners.map((item) => ({ label: parseName(item.name), value: item.id })),
      places: src.places.map((item) => ({ label: parseName(item.name), value: item.id })),
    };
  }
}
