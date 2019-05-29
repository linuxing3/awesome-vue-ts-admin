
import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Dropdown, Menu, Icon, DatePicker, Button, Modal,
} from 'ant-design-vue';
import MForm from '@/components/FilterForm/MForm';
import { FilterFormList, Opreat } from '@/interface';
import lfService from '@/utils/request.localforage';
import './index.less';

@Component({
  name: 'DocumentForm',
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
class DocumentForm extends Vue {
  modelName: string = 'document'

  itemList: FilterFormList[] = [
    {
      key: 'year', type: 'input', label: 'year', placeholder: 'Input year',
    },
    {
      key: 'date', type: 'input', label: 'date', placeholder: 'Input date',
    },
    {
      key: 'classiLevel', type: 'input', label: 'classiLevel', placeholder: 'Input classiLevel',
    },
    {
      key: 'category', type: 'input', label: 'category', placeholder: 'Input category',
    },
    {
      key: 'inOrOut', type: 'input', label: 'inOrOut', placeholder: 'Input inOrOut',
    },
    {
      key: 'sendingCode', type: 'input', label: 'sendingCode', placeholder: 'Input sendingCode',
    },
    {
      key: 'orderedNumber', type: 'input', label: 'orderedNumber', placeholder: 'Input orderedNumber',
    },
    {
      key: 'title', type: 'input', label: 'title', placeholder: 'Input title',
    },
    {
      key: 'content', type: 'input', label: 'content', placeholder: 'Input content',
    },
    {
      key: 'toEntity', type: 'input', label: 'toEntity', placeholder: 'Input toEntity',
    },
    {
      key: 'copyEntity', type: 'input', label: 'copyEntity', placeholder: 'Input copyEntity',
    },
    {
      key: 'attachment', type: 'input', label: 'attachment', placeholder: 'Input attachment',
    },
    {
      key: 'keyword', type: 'input', label: 'keyword', placeholder: 'Input keyword',
    },
    {
      key: 'workEntity', type: 'input', label: 'workEntity', placeholder: 'Input workEntity',
    },
    {
      key: 'author', type: 'input', label: 'author', placeholder: 'Input author',
    },
  ];

  setForm(itemList: FilterFormList[]) {
    this.itemList = [...itemList];
  }

  reset() {
    Modal.info({
      title: 'Go to datatable',
      onOk: () => {
        this.$router.replace({
          name: 'DocumentList',
        });
      },
    });
  }

  importOrExport() {
    Modal.info({
      title: 'Import or Export',
      onOk: () => {
        this.$router.replace({
          name: 'ExportHelper',
        });
      },
    });
  }

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
        <a-card title="DocumentList Form">
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
            item-list={this.itemList}
            save-btn={true}
            reset-btn={true}
            on-set-form={this.setForm}
            on-reset={this.reset}
          />
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(DocumentForm);
