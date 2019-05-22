import { BaseModel } from '@/models/BaseModel';

export interface ILeaveEncashment {
  _id: string;
  leaveBalance: string;
  encashmentAmount: string;
  encashmentDate: string;
  additionalSalary: string;
}

export default class LeaveEncashment extends BaseModel {
  static entity = 'leaveEncashment';

  static fields() {
    return {
      id: this.increment(),
      leaveBalance: this.string('leaveEncashment'),
      encashmentAmount: this.string('encashmentAmount'),
      encashmentDate: this.string('encashmentDate'),
      additionalSalary: this.string('additionalSalary'),
    };
  }
}
