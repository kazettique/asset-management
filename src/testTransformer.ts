import { DPerson, FPerson, MPerson, RPerson, VPerson } from './testModel';

export abstract class PersonTransformer {
  // db model -> model
  public static DPersonTransformer(src: DPerson): MPerson {
    return src;
  }

  // model -> view model
  public static MPersonTransformer(src: MPerson): VPerson {
    return src;
  }

  // view model -> form model
  public static VPersonTransformer(src: VPerson): FPerson {
    return {
      age: src.age,
      companyId: src.companyId !== null ? src.companyId : '',
      name: src.name,
    };
  }

  // form model -> request model
  public static FPersonTransformer(src: FPerson): RPerson {
    return {
      ...src,
      companyId: src.companyId.length > 0 ? src.companyId : null,
    };
  }
}
