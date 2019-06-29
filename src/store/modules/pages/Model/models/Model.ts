import { BaseModel } from "@/models/BaseModel";

/* -------------------------------------------------------------
| Interfaces
|-------------------------------------------------------------*/
export interface IModel {
   id?: string
   fields?: any
}

export interface IField {
   id?: string
   name?: string
   attr?: any
}

class Field extends BaseModel {
  static entity = "field";

  static fields() {
    return {
      id: this.increment(),
      key: this.attr('field1'),
      label: this.attr('field1'),
      type: this.attr('input'),
      placeholder: this.attr('Input Value ...'),
      attr: this.attr(this.attr),
    };
  }
}

/* -------------------------------------------------------------
| Model class
|-------------------------------------------------------------*/
export default class Model extends BaseModel {
  static entity = "model";

  static fields() {
    return {
      id: this.increment(),
      name: this.attr(''),
      fields: this.attr({}),
    };
  }
}
