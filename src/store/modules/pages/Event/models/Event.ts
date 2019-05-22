import { BaseModel } from '@/models/BaseModel';

export interface IEvent {
  id?: string;
  title: string;
  date?: string;
  startTime?: string;
  duration?: string;
  applicant?: string;
  participants?: string;
  guests?: string;
  content?: string;
  currentDate?: string;
  reportDate?: string;
  reportContent?: string;
  instructionDate?: string;
  instruction?: string;
  priority?: string;
  userId?: string;
  projectId?: string;
}

export default class Event extends BaseModel {
  static entity = 'event';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      title: this.string('title'),
      date: this.string('2019-02-23'),
      startTime: this.string('12:00'),
      duration: this.string('60'),
      applicant: this.string('John'),
      participants: this.string('John'),
      guests: this.string('John'),
      content: this.string('Meeting'),
      currentDate: this.string('2019-02-23'),
      reportDate: this.string('2019-02-23'),
      reportContent: this.string('Discussion'),
      instructionDate: this.string('2019-02-23'),
      instruction: this.string('Read'),
      priority: this.string('HIGH'),
      user_id: this.attr(null),
      project_id: this.attr(null),
    };
  }
}
