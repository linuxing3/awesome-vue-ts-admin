import { Component, Mixins } from 'vue-property-decorator';
import {
  Form, Card, Dropdown, Menu, Icon,
} from 'ant-design-vue';
import MForm from '@/components/FilterForm/MForm';
import FormMixin from '@/utils/formMixin';
import models from '@/models';

import './index.less';

@Component({
  name: 'CrudFrom',
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
class CrudFrom extends Mixins(FormMixin) {
  get Entity(): any {
    return models[this.modelName];
  }

  mounted() {
    this.$nextTick(() => this.getData());
  }

  getData() {
    const { modelName, itemList } = JSON.parse(this.$route.params.data);
    this.modelName = modelName;
    this.itemList= itemList;
    this.outParams = {
      itemList,
    };
  }

  render() {
    return (
      <div class="base-form-wrap">
        <a-card title="Member Form">
          <a-dropdown slot="extra">
            <a class="ant-dropdown-link">
              <a-icon type="ellipsis" style="font-size: 22px" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a on-click={this.importOrExport}>导入导出</a>
              </a-menu-item>
              <a-menu-item>
                <a on-click={this.statistic}>统计图表</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <m-form
            ref="MForm"
            modelName={this.modelName}
            item-list={this.itemList}
            save-btn={true}
                        reset-btn={true}
            on-clear={this.clear}
            on-loadEditInfo={this.loadEditInfo}
            on-setForm={this.setForm}
            on-showDataTable={this.showDataTable}
          />
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(CrudFrom);
