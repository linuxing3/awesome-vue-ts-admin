import { BaseModel } from '@/models/BaseModel';

export interface IProjectType {
  id?: string;
}

export default class ProjectType extends BaseModel {
  static entity = 'projectType';

  static fields() {
    return {
      _id: this.increment(),
    };
  }
}
