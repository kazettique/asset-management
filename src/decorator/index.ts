import { Id } from '@/types';

interface BackendBase {
  // new (): MyType;
  Create(payload: any): Promise<any>;
  Delete(id: Id): Promise<any>;
  Find(id: Id): Promise<any>;
  FindAll(payload: any): Promise<any>;
  Update(payload: any, id: Id): Promise<any>;
}

// ref: https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface
/* class decorator */
export function backendImplements() {
  return <U extends BackendBase>(constructor: U) => {
    constructor;
  };
}

@backendImplements()
abstract class MyTypeClass {
  /* implements MyType { */ /* so this become optional not required */
  public static async FindAll(): Promise<string> {
    return new Promise((resolve, _reject) => resolve('hellos'));
  }
  public static async Find(): Promise<string> {
    return new Promise((resolve, _reject) => resolve('hellos'));
  }
  public static async Create(): Promise<string> {
    return new Promise((resolve, _reject) => resolve('hellos'));
  }
  public static async Update(): Promise<string> {
    return new Promise((resolve, _reject) => resolve('hellos'));
  }
  public static async Delete(): Promise<string> {
    return new Promise((resolve, _reject) => resolve('hellos'));
  }
}
