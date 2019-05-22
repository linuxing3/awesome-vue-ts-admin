import { BaseModel } from '@/models/BaseModel';
import User from '../../User/models/User';

export interface IDepartment {
  id?: string;
  name: string;
}

export default class Department extends BaseModel {
  static entity = 'department';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      name: this.string('XX处'),
      users: this.hasMany(User, 'department_id'),
    };
  }
}
