import { BaseModel } from '@/models/BaseModel';

export interface IUser {
  id?: string
  name?: string
  username?: string
  password?: string
}

export default class User extends BaseModel {
  static entity = 'user'

  static meta = {
    section: 'core',
  }

  static fields() {
    return {
      id: this.increment(),
      name: this.string('Emacser'),
      userid: this.string('Emacser'),
      username: this.string('admin'),
      password: this.string(''),
      email: this.string(''),
      telephone: this.string(''),
      status: this.number('50'),
      hash: this.string(''),
      token: this.string('qqyzkzldrx'),
      role: this.attr(null),
      avatar_uri: this.string('/avatar2.jpg'),
      permissions: this.attr(['1', '2', '3', '4', '5']),
    };
  }
}
