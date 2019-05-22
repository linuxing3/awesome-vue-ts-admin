import { BaseModel } from '@/models/BaseModel';

export interface IUserDesignation {
  id?: string;
  designation?: string;
}

export default class UserDesignation extends BaseModel {
  static entity = 'userDesignation';

  static fields() {
    return {
      id: this.increment(),
      designation: this.string('Business'),
      description: this.string('Daniel'),
      user_id: this.attr(null),
    };
  }
}
