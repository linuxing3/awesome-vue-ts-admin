import { BaseModel } from '@/models/BaseModel';

export interface IUserAppraisalGoal {
  id?: string;
  kra?: string;
}

export default class UserAppraisalGoal extends BaseModel {
  static entity = 'userAppraisalGoal';

  static fields() {
    return {
      id: this.increment(),
      kra: this.string('Business'),
      perWeightage: this.string('Daniel'),
      score: this.string('male'),
      score_earned: this.string('80'),
    };
  }
}
