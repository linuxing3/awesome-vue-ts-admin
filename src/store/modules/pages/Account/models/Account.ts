import { BaseModel } from '@/models/BaseModel';

export interface IAccount {
  id?: string;
  name: string;
  email?: string;
  password: string;
  hash?: string;
  role?: string;
  avatar?: string;
}

export default class Account extends BaseModel {
  static entity = 'account';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      name: this.string(''),
      email: this.string(''),
      password: this.string(''),
      hash: this.string(''),
      role: this.string(''),
      avatar: this.string('avatar.svg'),
    };
  }
}
