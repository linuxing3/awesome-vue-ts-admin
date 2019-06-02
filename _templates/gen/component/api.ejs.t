---
inject: true
to: "src/api/index.ts"
after: insert more api below
skip_if: // <%= h.changeCase.camel(model) %>
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelListName = ModelName + 'List'
const modelTableName = ModelName + 'Table'
const modelFormName = ModelName + 'Form'
%>  // <%= ModelName %>
  <%= EntityName %>Delete: {
    url: '/<%= EntityName %>/delete',
    method: 'delete',
    fetchType: 'json',
  },
  <%= EntityName %>Update: {
    url: '/<%= EntityName %>/update',
    method: 'patch',
    fetchType: 'json',
  },
  <%= EntityName %>Create: {
    url: '/<%= EntityName %>/create',
    method: 'post',
    fetchType: 'json',
  },
  <%= EntityName %>Fetch: {
    url: '/<%= EntityName %>/fetch',
    method: 'get',
    fetchType: 'json',
  },