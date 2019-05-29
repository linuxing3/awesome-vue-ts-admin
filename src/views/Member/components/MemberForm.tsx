
import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Card, Dropdown, Menu, Icon, Modal,
} from 'ant-design-vue';
import { FilterFormList, Opreat } from '@/interface';
import MForm from '@/components/FilterForm/MForm';
import lfService from '@/utils/request.localforage';

import './index.less';

@Component({
  name: 'MemberForm',
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
class MemberForm extends Vue {
  modelName: string = 'member'

  itemList: any[] = []

  defaultItemList: FilterFormList[] = [
    {
      key: 'department', type: 'input', label: 'department', placeholder: 'Input department',
    },
    {
      key: 'name', type: 'input', label: 'name', placeholder: 'Input name',
    },
    {
      key: 'gender', type: 'input', label: 'gender', placeholder: 'Input gender',
    },
    {
      key: 'birthday', type: 'input', label: 'birthday', placeholder: 'Input birthday',
    },
    {
      key: 'etnia', type: 'input', label: 'etnia', placeholder: 'Input etnia',
    },
    {
      key: 'academicBackground', type: 'input', label: 'academicBackground', placeholder: 'Input academicBackground',
    },
    {
      key: 'foreignLanguage', type: 'input', label: 'foreignLanguage', placeholder: 'Input foreignLanguage',
    },
    {
      key: 'politicalRole', type: 'input', label: 'politicalRole', placeholder: 'Input politicalRole',
    },
    {
      key: 'positionAndRank', type: 'input', label: 'positionAndRank', placeholder: 'Input positionAndRank',
    },
    {
      key: 'militantRole', type: 'input', label: 'militantRole', placeholder: 'Input militantRole',
    },
    {
      key: 'duty', type: 'input', label: 'duty', placeholder: 'Input duty',
    },
    {
      key: 'fromEntity', type: 'input', label: 'fromEntity', placeholder: 'Input fromEntity',
    },
    {
      key: 'arrivingDate', type: 'input', label: 'arrivingDate', placeholder: 'Input arrivingDate',
    },
    {
      key: 'rotatingDate', type: 'input', label: 'rotatingDate', placeholder: 'Input rotatingDate',
    },
    {
      key: 'sendingEntity', type: 'input', label: 'sendingEntity', placeholder: 'Input sendingEntity',
    },
    {
      key: 'conyugeName', type: 'input', label: 'conyugeName', placeholder: 'Input conyugeName',
    },
    {
      key: 'conyugeEntity', type: 'input', label: 'conyugeEntity', placeholder: 'Input conyugeEntity',
    },
    {
      key: 'conyugeBonus', type: 'input', label: 'conyugeBonus', placeholder: 'Input conyugeBonus',
    },
    {
      key: 'memo', type: 'input', label: 'memo', placeholder: 'Input memo',
    },
    {
      key: 'protocolId', type: 'input', label: 'protocolId', placeholder: 'Input protocolId',
    },
    {
      key: 'isActive', type: 'input', label: 'isActive', placeholder: 'Input isActive',
    },
    {
      key: 'militant', type: 'input', label: 'string', placeholder: 'Input string',
    },
  ]

  created() {
    // const { params: { model } } = lfService.validateUrl({
    //   url: `/${this.modelName}`,
    //   method: 'get'
    // });
    // this.itemList = model.fieldsKeys();
    this.itemList = [...this.defaultItemList];
  }

  setForm(itemList: FilterFormList[]) {
    this.itemList = [...itemList];
  }

  reset() {
    Modal.info({
      title: 'Go to datatable',
      onOk: () => {
        this.$router.replace({
          name: '<%= modelListName %>',
        });
      },
    });
  }

  importOrExport() {
    const data = [];
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
        <a-card title="Member Form">
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

export default Form.create({})(MemberForm);
