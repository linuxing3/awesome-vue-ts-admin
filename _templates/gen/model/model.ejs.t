---
to: "src/store/modules/pages/<%= h.changeCase.pascal(model) %>/models/<%= h.changeCase.pascal(model) %>.ts"
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%>import { BaseModel } from "@/models/BaseModel";

/* -------------------------------------------------------------
| Interfaces
|-------------------------------------------------------------*/
export interface I<%= ModelName %> {
   id?: string
   name?: string
}

/* -------------------------------------------------------------
| Model class
|-------------------------------------------------------------*/
export default class <%= ModelName %> extends BaseModel {
  static entity = "<%= EntityName %>";

  static fields() {
    return {
      id: this.increment(),
      name: this.attr()
    };
  }

  static state() {
    return {};
  }
}
