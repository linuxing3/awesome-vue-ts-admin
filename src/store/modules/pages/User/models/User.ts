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
      name: this.string('test'),
      userid: this.string('Emacser'),
      username: this.string('test'),
      password: this.string('123456'),
      email: this.string('test@qq.com'),
      telephone: this.string(''),
      address: this.string(''),
      status: this.number('active'),
      hash: this.string(''),
      token: this.string('qqyzkzldrx'),
      role: this.attr(null),
      avatarUrl: this.string('/avatar/man_1.jpg'),
      permissions: this.attr([]),
      permissionDetails: this.attr([]),
    };
  }
}
