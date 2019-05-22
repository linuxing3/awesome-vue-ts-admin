import { BaseModel } from '@/models/BaseModel';
import Document from '../../Document/models/Document';

export interface IArchive {
  id?: string;
  type?: string;
}

export default class Archive extends BaseModel {
  static entity = 'archive';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      type: this.string('XXX'),
      mark: this.string('XXX'),
      classiLevel: this.string('XXX'),
      date: this.string('2019-03-08'),
      year: this.string('2019'),
      title: this.string('XXX'),
      archiveEntity: this.string(''),
      department: this.string(''),
      attachment: this.string('XXX'),
      tags: this.string('XXX'),
      author: this.string('string'),
      manager: this.string('string'),
      documents: this.hasMany(Document, 'archive_id'),
    };
  }
}
