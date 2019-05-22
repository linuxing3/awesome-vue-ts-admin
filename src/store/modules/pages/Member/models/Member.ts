import { BaseModel } from '@/models/BaseModel';

export default class Member extends BaseModel {
  static entity = 'member';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      name: this.string('Emacser'),
      username: this.string('admin'),
      password: this.string(''),
      email: this.string(''),
      telephone: this.string(''),
      status: this.number('50'),
      hash: this.string(''),
      role: this.attr(null),
      avatar: this.string('/avatar2.jpg'),
    };
  }
}
