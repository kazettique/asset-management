import { FPerson } from './testModel';

export abstract class PersonConstant {
  public static readonly F_PERSON_CONSTANT: FPerson = {
    age: 0,
    companyId: '',
    name: '',
  };
}
