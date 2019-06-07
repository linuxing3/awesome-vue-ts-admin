import { BaseModel } from '@/models/BaseModel';

export interface IDocument {
  id?: string;
  year?: string;
  date?: string;
  classiLevel?: string;
  category?: string;
  inOrOut?: string;
  sendingCode?: string;
  orderedNumber?: string;
  title: string;
  content?: string;
  toEntity?: string;
  copyEntity?: string;
  attachment?: string;
  keyword?: string;
  workEntity?: string;
  author?: string;
}

export default class Document extends BaseModel {
  static entity = 'document';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      year: this.string('2019'),
      date: this.string('2019-02-25'),
      classiLevel: this.string('内部'),
      category: this.string('发文'),
      inOrOut: this.string('发'),
      sendingCode: this.string('委发'),
      orderedNumber: this.string('001'),
      title: this.string('报XXX事'),
      content: this.string('正文。。。'),
      toEntity: this.string('XX部XX司'),
      copyEntity: this.string('XX部XX司'),
      attachment: this.string('无'),
      keyword: this.string('人事'),
      workEntity: this.string('XX单位'),
      department: this.string('XX处'),
      author: this.string('拟稿人'),
      archive_id: this.attr(null),
      type_id: this.attr(null),
    };
  }
}
