import { Component, Mixins } from 'vue-property-decorator';
import {
  Form, Card, Dropdown, Menu, Icon,
} from 'ant-design-vue';
import { FilterFormList } from '@/interface';
import MForm from '@/components/FilterForm/MForm';
import FormMixin from '@/utils/formMixin';
import { defaultItemList } from './config';
import './index.less';

@Component({
  name: 'UserDesignationForm',
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
class UserDesignationForm extends Mixins(FormMixin) {
  modelName: string = 'userDesignation'

  formValues: any = {}

  itemList: any[] = defaultItemList

  outParams: any = {
    itemList: defaultItemList,
  }

  render() {
    return (
      <div class="base-form-wrap">
        <a-card title="UserDesignation Form">
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

export default Form.create({})(UserDesignationForm);
