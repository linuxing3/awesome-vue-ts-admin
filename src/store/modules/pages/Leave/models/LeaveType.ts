import { BaseModel } from '@/models/BaseModel';

export interface ILeaveType {
  id?: string;
  name: string;
  maxLeavesAllowed?: string;
  applicableAfter?: string;
  maximumContinuousDays?: string;
  isCarryForward?: string;
  isWithOutPay?: string;
  isOptional?: string;
  isCompensatory?: string;
  isEarnedLeave?: string;
  EarnedLeaveFrequency?: string;
  allowNegativeBalance?: string;
  allowEncashment?: string;
  encashmentThresholdDays?: string;
  includeHolidays?: string;
}

export default class LeaveType extends BaseModel {
  static entity = 'leaveType';

  static fields() {
    return {
      id: this.increment(),
      name: this.string(''),
      maxLeavesAllowed: this.string(''),
      applicableAfter: this.string(''),
      maximumContinuousDays: this.attr(''),
      isCarryForward: this.attr(''),
      isWithOutPay: this.attr(''),
      isOptional: this.attr(''),
      isCompensatory: this.attr(''),
      isEarnedLeave: this.attr(''),
      EarnedLeaveFrequency: this.attr(''),
      allowNegativeBalance: this.attr(''),
      allowEncashment: this.attr(''),
      encashmentThresholdDays: this.attr(''),
      includeHolidays: this.attr(''),
    };
  }
}
