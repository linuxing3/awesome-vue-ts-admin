---
to: 'src/views/<%= h.changeCase.pascal(model) %>/components/<%= h.changeCase.pascal(model) %>Form.tsx'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelListName = ModelName + 'List'
const modelFormName = ModelName + 'Form'
%>
import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Dropdown, Menu, Icon, DatePicker, Button, Modal,
} from 'ant-design-vue';
import lfService from '@/utils/request.localforage';
import models from '@/models';
import './index.less';

const Entity = models['<%= EntityName %>'];
const defaultItemList = Entity.fieldsKeys();

@Component({
  name: '<%= modelFormName %>',
  components: {
    'm-form': MForm,
    'a-card': Card,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon
  },
  props: {
    Form
  }
})
class <%= modelFormName %> extends Vue {
  modelName: string = '<%= EntityName %>'
  
  itemList: FilterFormList[] = defaultItemList;

  setForm(itemList: FilterFormList[]) {
    this.itemList = [...itemList]
  }

  reset() {
    Modal.info({
      title: 'Go to list',
      onOk: () => {
        this.$router.replace({
          name: '<%= modelListName %>'
        })
      },
      onCancel: () => {
        this.setForm(this.itemList)
      }
    })
  }

  render() {
    return (
      <div class="base-form-wrap">
        <a-card title="<%= modelListName %> Form">
          <a-dropdown slot="extra">
            <a class="ant-dropdown-link">
              <a-icon type="ellipsis" style="font-size: 22px" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a to={'/import'}>Import</a>
              </a-menu-item>
              <a-menu-item>
                <a to={'/export'}>Export</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <m-form
            ref="MForm"
            item-list={this.itemList}
            save-btn={true}
            reset-btn={true}
            on-set-form={this.setForm}
            on-reset={this.reset}
          />
        </a-card>
      </div>
    )
  }
}

export default Form.create({})(<%= modelFormName %>);