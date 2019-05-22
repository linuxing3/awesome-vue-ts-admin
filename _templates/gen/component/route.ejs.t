---
inject: true
to: "src/router/index.ts"
after: insert more route below
skip_if: // <%= h.changeCase.camel(model) %>
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelListName = ModelName + 'List'
const modelTableName = ModelName + 'Table'
const modelFormName = ModelName + 'Form'
%>  // <%= EntityName %>
  {
    path: '/<%= EntityName %>',
    icon: 'team',
    name: '<%= ModelName %>',
    component: getComponent('<%= ModelName %>/index'),
    permission: true,
    meta: { key: '<%= EntityName %>' },
    children: [
      {
        path: '<%= EntityName %>-form',
        name: '<%= modelFormName %>',
        component: getComponent('<%= ModelName %>/components/<%= modelFormName %>'),
        permission: true,
        meta: { key: '<%= modelFormName %>' },
      },
      {
        path: '<%= EntityName %>-table',
        name: '<%= modelTableName %>',
        component: getComponent('<%= ModelName %>/components/<%= modelTableName %>'),
        permission: true,
        meta: { key: '<%= modelTableName %>' },
      },
      {
        path: '<%= EntityName %>-list',
        name: '<%= modelListName %>',
        component: getComponent('<%= ModelName %>/components/<%= modelListName %>'),
        permission: true,
        meta: { key: '<%= modelListName %>' },
      },
    ],
  },