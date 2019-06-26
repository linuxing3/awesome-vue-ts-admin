import { BaseModel } from '@/models/BaseModel';

/* -------------------------------------------------------------
| Interfaces
|-------------------------------------------------------------*/
export interface IArticle {
   id?: string
   owner?: string
   title?: string
   description?: string
   content?: string
   tags?: string
   href?: string
   updateAt?: string
   avatar?: string
}

/* -------------------------------------------------------------
| Model class
|-------------------------------------------------------------*/
export default class Article extends BaseModel {
  static entity = 'article';

  static fields() {
    return {
      id: this.increment(),
      owner: this.attr('Daniel'),
      title: this.attr('Daniel'),
      content: this.attr('Daniel'),
      description: this.attr('A article with description'),
      href: this.attr('http://localhost'),
      updateAt: this.attr('2019-07-01'),
      avatar: this.attr('/avatar/man_1.jpg'),
      tags: this.attr('dev'),
      star: this.attr('10'),
      like: this.attr('24'),
      message: this.attr('Wonderful'),
    };
  }

  static state() {
    return {};
  }
}
