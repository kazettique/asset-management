import { CurrencyCode } from 'currency-codes-ts/dist/types';

import {
  BrandRepository,
  CategoryRepository,
  MethodRepository,
  OwnerRepository,
  PlaceRepository,
  PlatformRepository,
  TagRepository,
} from '@/repository';
import { SettingRepository } from '@/repository/setting';
import {
  BrandTransformer,
  CategoryTransformer,
  MethodTransformer,
  OwnerTransformer,
  PlaceTransformer,
  PlatformTransformer,
  SettingTransformer,
  TagTransformer,
} from '@/transformer';
import { MForex, MSetting, MSettingOptions, NType, SettingKey } from '@/types';

import { ForexService } from './forex';

export abstract class SettingService {
  public static async FindAllOptions(): Promise<MSettingOptions> {
    const brands = await BrandRepository.FindAll();
    const categories = await CategoryRepository.FindAll();
    const methods = await MethodRepository.FindAll();
    const places = await PlaceRepository.FindAll();
    const owners = await OwnerRepository.FindAll();
    const platforms = await PlatformRepository.FindAll();
    const tags = await TagRepository.FindAll();

    const currencyOptionList = await SettingRepository.FindByKey(SettingKey.CURRENCY_OPTION_LIST);
    const settingDisplayForex = await SettingRepository.FindByKey(SettingKey.DISPLAY_FOREX);

    let displayForex: NType<MForex> = null;
    if (settingDisplayForex) {
      displayForex = await ForexService.FindOrCreate(settingDisplayForex.value as CurrencyCode);
    }

    return {
      brands: brands.map((brand) => BrandTransformer.DMBrandTransformer(brand)),
      categories: categories.map((category) => CategoryTransformer.DMCategoryTransformer(category)),
      currencyOptionList:
        currencyOptionList &&
        typeof currencyOptionList.value === 'object' &&
        currencyOptionList.value !== null &&
        Array.isArray(currencyOptionList.value)
          ? (currencyOptionList.value as string[])
          : [],
      displayForex,
      methods: methods.map((method) => MethodTransformer.DMMethodTransformer(method)),
      owners: owners.map((owner) => OwnerTransformer.DMOwnerTransformer(owner)),
      places: places.map((place) => PlaceTransformer.DMPlaceTransformer(place)),
      platforms: platforms.map((platform) => PlatformTransformer.DMPlatformTransformer(platform)),
      tags: tags.map((tag) => TagTransformer.DMTagTransformer(tag)),
    };
  }

  public static async FindAll(): Promise<MSetting[]> {
    const raw = await SettingRepository.FindAll();

    return raw.map((record) => SettingTransformer.DMSettingTransformer(record));
  }

  public static async FindById(id: MSetting['id']): Promise<NType<MSetting>> {
    const raw = await SettingRepository.FindById(id);

    if (raw === null) {
      return raw;
    } else {
      return SettingTransformer.DMSettingTransformer(raw);
    }
  }

  public static async FindByKey(key: MSetting['key']): Promise<NType<MSetting>> {
    const raw = await SettingRepository.FindByKey(key);

    if (raw === null) {
      return raw;
    } else {
      return SettingTransformer.DMSettingTransformer(raw);
    }
  }

  public static async Update<T extends MSetting>(id: T['id'], value: T['value']) {
    const raw = await SettingRepository.Update(id, value);

    return SettingTransformer.DMSettingTransformer(raw);
  }
}
