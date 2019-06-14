import { BaseModel } from '@/models/BaseModel';

export interface ILeave {
  id?: string;
  applicant: string;
  fromDate?: string;
  toDate?: string;
  isActive?: string;
  private?: string;
  holidayList?: string;
}

export default class Leave extends BaseModel {
  static entity = 'leave';

  static fields() {
    return {
      id: this.increment(),
      applicant: this.string('申请人'),
      fromDate: this.string('2019-03-08'),
      toDate: this.string('2019-03-08'),
      isActive: this.string('是'),
      private: this.string('是'),
      route: this.string('美国'),
      holidayList: this.string(''),
      user_id: this.attr(null),
      employee_id: this.attr(null),
    };
  }
}
