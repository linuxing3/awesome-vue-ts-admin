import { BaseModel } from '@/models/BaseModel';
import ProjectTask from '../../ProjectTask/models/ProjectTask';
import Event from '../../Event/models/Event';

export interface IProject {
  id?: string;
  title: string;
  type?: string;
  status?: string;
  isActive?: string;
  percentComplete?: string;
  expectedStartDate?: string;
  expectedEndDate?: string;
  priority?: string;
  department?: string;
  tasks?: any[];
  notes?: string;
  actualStartDate?: string;
  actualEndDate?: string;
  estimatedCost?: string;
  totalCost?: string;
  ExpenseClaim?: string;
  collectProgress?: string;
  frequency?: string;
  fromTime?: string;
  toTime?: string;
}

export default class Project extends BaseModel {
  static entity = 'project';

  static fields() {
    return {
      id: this.increment(),
      title: this.string('dev'),
      type: this.string('type'),
      status: this.string('status'),
      isActive: this.string('isActive'),
      percentComplete: this.string('percentComplete'),
      expectedStartDate: this.string('2019-03-08'),
      expectedEndDate: this.string('2019-03-08'),
      priority: this.string('priority'),
      department: this.string('department'),
      notes: this.string('notes'),
      actualStartDate: this.string('2019-03-08'),
      actualEndDate: this.string('2019-03-08'),
      estimatedCost: this.string('estimatedCost'),
      totalCost: this.string('totalCost'),
      ExpenseClaim: this.string('ExpenseClaim'),
      collectProgress: this.string('collectProgress'),
      frequency: this.string('frequency'),
      fromTime: this.string('fromTime'),
      toTime: this.string('toTime'),
      tasks: this.hasMany(ProjectTask, 'project_id'),
      events: this.hasMany(Event, 'project_id'),
      board_id: this.attr(null),
    };
  }
}
