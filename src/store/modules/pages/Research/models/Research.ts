import { BaseModel } from '@/models/BaseModel';

export interface IResearch {
  id?: string;
}

export default class Research extends BaseModel {
  static entity = 'research';

  static fields() {
    return {
      _id: this.increment(),
    };
  }
}
