---
to: 'src/views/<%= h.changeCase.pascal(model) %>/components/<%= h.changeCase.pascal(model) %>Form.tsx'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelListName = ModelName + 'List'
const modelFormName = ModelName + 'Form'
%>
import { Component, Vue, Emit } from 'vue-property-decorator';
import {
  Form, Card, Dropdown, Menu, Icon, Modal,
} from 'ant-design-vue';
import { upperFirst } from 'lodash';
import { FilterFormList, operate } from '@/interface';
import MForm from '@/components/FilterForm/MForm';

import { defaultItemList } from './config'
import './index.less';

@Component({
  name: '<%= modelFormName %>',
  components: {
    'm-form': MForm,
    'a-card': Card,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
  },
  props: {
    Form,
  },
})
class <%= modelFormName %> extends Vue {
  modelName: string = '<%= EntityName %>'

  formValues: any = {}

  itemList: any[] = defaultItemList

  @Emit()
  setForm(itemList: FilterFormList[]) {
    this.itemList = [...itemList];
  }

  @Emit()
  loadEditInfo(data) {
    this.formValues = data;
  }

  @Emit()
  showDataTable() {
    Modal.info({
      title: 'Go to datatable',
      onOk: () => {
        const tableRouter = `${upperFirst(this.modelName)}Table`;
        this.$router.push({
          name: tableRouter,
        });
      },
    });
  }

  @Emit()
  importOrExport() {
    const values = this.formValues;
    Modal.info({
      title: `Import or Export ${this.modelName}`,
      onOk: () => {
        this.$router.replace({
          name: 'ExportHelper',
          params: {
            modelName: this.modelName,
            data: JSON.stringify({ ids: [values.id] }),
          },
        });
      },
    });
  }

  @Emit()
  statistic() {
    Modal.info({
      title: 'Statistic Charts',
      onOk: () => {
        this.$router.replace({
          name: 'Statistic',
        });
      },
    });
  }

  render() {
    return (
      <div class="base-form-wrap">
        <a-card title="<%= ModelName %> Form">
          <a-dropdown slot="extra">
            <a class="ant-dropdown-link">
              <a-icon type="ellipsis" style="font-size: 22px" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a on-click={this.importOrExport}>Import/Export</a>
              </a-menu-item>
              <a-menu-item>
                <a on-click={this.statistic}>Statistic</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <m-form
            ref="MForm"
            modelName={this.modelName}
            item-list={this.itemList}
            save-btn={true}
            reset-btn={true}
            on-setForm={this.setForm}
            on-showDataTable={this.showDataTable}
          />
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(<%= modelFormName %>);
