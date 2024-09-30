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
import { MSetting, MSettingOptions } from '@/types';

export abstract class SettingService {
  public static async FindAllOptions(): Promise<MSettingOptions> {
    const brands = await BrandRepository.FindAll();
    const categories = await CategoryRepository.FindAll();
    const methods = await MethodRepository.FindAll();
    const places = await PlaceRepository.FindAll();
    const owners = await OwnerRepository.FindAll();
    const platforms = await PlatformRepository.FindAll();
    const tags = await TagRepository.FindAll();

    return {
      brands: brands.map((brand) => BrandTransformer.DMBrandTransformer(brand)),
      categories: categories.map((category) => CategoryTransformer.DMCategoryTransformer(category)),
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

  public static async Update<T extends MSetting>(key: T['id'], value: T['value']) {
    const raw = await SettingRepository.Update(key, value);

    return SettingTransformer.DMSettingTransformer(raw);
  }
}
