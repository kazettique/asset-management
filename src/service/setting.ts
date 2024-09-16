import {
  BrandRepository,
  CategoryRepository,
  MethodRepository,
  OwnerRepository,
  PlaceRepository,
  PlatformRepository,
  TagRepository,
} from '@/repository';
import { MSetting } from '@/types';

export abstract class SettingService {
  public static async FindAll(): Promise<MSetting> {
    const brands = await BrandRepository.FindAll();
    const categories = await CategoryRepository.FindAll();
    const methods = await MethodRepository.FindAll();
    const places = await PlaceRepository.FindAll();
    const owners = await OwnerRepository.FindAll();
    const platforms = await PlatformRepository.FindAll();
    const tags = await TagRepository.FindAll();

    return { brands, categories, methods, owners, places, platforms, tags };
  }
}
