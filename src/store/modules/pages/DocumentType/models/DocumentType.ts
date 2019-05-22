import { BaseModel } from '@/models/BaseModel';
import Document from '../../Document/models/Document';

export interface IDocumentType {
  id?: string;
  title: string;
}

export default class DocumentType extends BaseModel {
  static entity = 'documentType';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      title: this.string('内部'),
      documents: this.hasMany(Document, 'type_id'),
    };
  }
}
