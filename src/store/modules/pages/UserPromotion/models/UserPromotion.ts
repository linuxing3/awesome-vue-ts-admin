import { BaseModel } from '@/models/BaseModel';

export interface IUserPromotion {
  id?: string;
  name?: string;
  department?: string;
  promotionDate?: string;
  promotionDetails?: string;
}

export default class UserPromotion extends BaseModel {
  static entity = 'userPromotion';

  static fields() {
    return {
      id: this.increment(),
      name: this.string('secretary'),
      department: this.string('department'),
      promotionDate: this.string('2009-09-09'),
      promotionDetails: this.string('promotionDetails'),
    };
  }
}
