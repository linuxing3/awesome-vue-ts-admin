---
to: "src/store/modules/pages/<%= h.changeCase.pascal(model) %>/models/<%= h.changeCase.pascal(model) %>.ts"
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%>import { BaseModel } from "@/models/BaseModel";

export interface I<%= ModelName %> {
   id?: string
}

export default class <%= ModelName %> extends BaseModel {
  static entity = "<%= EntityName %>";

  static fields() {
    return {
      id: this.increment(),
    };
  }
}
