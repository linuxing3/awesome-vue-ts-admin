import { BaseModel } from '@/models/BaseModel';

export interface IProjectTask {
  id?: string;
}

export default class ProjectTask extends BaseModel {
  static entity = 'projectTask';

  static fields() {
    return {
      _id: this.increment(),
    };
  }
}
