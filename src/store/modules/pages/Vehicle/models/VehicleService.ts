import { BaseModel } from '@/models/BaseModel';

export interface IVehicleService {
  id?: string;
  serviceItem: string;
  type?: string;
  frequency?: string;
  expenseAmount?: string;
}

export default class VehicleService extends BaseModel {
  static entity = 'vehicleService';

  static fields() {
    return {
      id: this.increment(),
      serviceItem: this.string('item'),
      type: this.string('type'),
      frequency: this.string('frequency'),
      expenseAmount: this.string('expenseAmount'),
    };
  }
}
