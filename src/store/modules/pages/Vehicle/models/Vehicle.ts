import { BaseModel } from '@/models/BaseModel';

export interface IVehicle {
  id?: string;
  licensePlate?: string;
  mark: string;
  model?: string;
  details?: string;
  lastOdometerValue?: string;
  location?: string;
  chassisNo?: string;
  value?: string;
  insuranceDetails?: string;
  insuranceCompany?: string;
  policyNo?: string;
  startDate?: string;
  endDate?: string;
  additionalDetails?: string;
  fueltype?: string;
  fuelUom?: string;
  color?: string;
  wheels?: string;
  door?: string;
}

export default class Vehicle extends BaseModel {
  static entity = 'vehicle';

  static fields() {
    return {
      id: this.increment(),
      licensePlate: this.string('license'),
      mark: this.string('mark'),
      model: this.string('model'),
      details: this.string('details'),
      lastOdometerValue: this.string('lastOdometerValue'),
      location: this.string('location'),
      chassisNo: this.string('chassisNo'),
      value: this.string('value'),
      insuranceDetails: this.string('insuranceDetails'),
      insuranceCompany: this.string('insuranceCompany'),
      policyNo: this.string('policyNo'),
      startDate: this.string('2009-09-09'),
      endDate: this.string('2009-09-09'),
      additionalDetails: this.string('additionalDetails'),
      fueltype: this.string('fueltype'),
      fuelUom: this.string('fuelUom'),
      color: this.string('color'),
      wheels: this.string('wheels'),
      door: this.string('door'),
    };
  }
}
