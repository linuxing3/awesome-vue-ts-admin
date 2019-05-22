import { BaseModel } from '@/models/BaseModel';

export interface ILeaveAllocation {
  _id: string;
  applicant: string;
  department: string;
  type: string;
  fromDate: string;
  toDate: string;
  newLeaveAllocated: string;
  carryForward: string;
  unusedLeaves: string;
  notes: string;
  description: string;
}

export default class LeaveAllocation extends BaseModel {
  static entity = 'leaveAllocation';

  static fields() {
    return {
      id: this.increment(),
      applicant: this.string('applicant'),
      department: this.string('department'),
      type: this.string('type'),
      fromDate: this.string('2019-03-08'),
      toDate: this.string('2019-03-08'),
      newLeaveAllocated: this.string('newLeaveAllocated'),
      carryForward: this.string('carryForward'),
      unusedLeaves: this.string('unusedLeaves'),
      notes: this.string('notes'),
      description: this.string('description'),
    };
  }
}
