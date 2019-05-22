import { BaseModel } from '@/models/BaseModel';

export interface IBookmark {
  id?: string;
  title?: string;
}

export default class Bookmark extends BaseModel {
  static entity = 'bookmark';

  static fields() {
    return {
      id: this.increment(),
      title: this.string('Feedly'),
      url: this.string('https://feedly.com'),
      description: this.string('News Feeds on Fingers'),
      tags: this.string('study'),
      date: this.string('2019-03-10'),
    };
  }
}
