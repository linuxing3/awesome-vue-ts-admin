
import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Card, Dropdown, Menu, Icon, Modal
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
    'a-icon': Icon
  },
  props: {
    Form
  }
})
class MemberForm extends Vue {
  modelName: string = 'member'

  itemList: any[] = []

  defaultItemList: FilterFormList[] = [
    {
      key: 'department',
      label: 'department',
      type: 'input',
      placeholder: 'Input department'
    },
    {
      key: 'name',
      label: 'name',
      type: 'input',
      placeholder: 'Input Name'
    },
    {
      key: 'gender',
      label: 'gender',
      type: 'select',
      placeholder: 'male',
      options: [
        {
          label: 'male',
          value: 'male'
        },
        {
          label: 'female',
          value: 'female'
        }
      ]
    },
    {
      key: 'etnia',
      label: 'etnia',
      type: 'input',
      placeholder: 'Input etnia'
    },
    {
      key: 'academicBackground',
      label: 'Academic Background',
      type: 'input',
      placeholder: 'Input Academic Background'
    },
    {
      key: 'foreignLanguage',
      label: 'Foreign Language',
      type: 'input',
      placeholder: 'Input Foreign Language'
    },
    {
      key: 'politicalRole',
      label: 'Political Role',
      type: 'input',
      placeholder: 'politicalRole'
    },
    {
      key: 'arrivingDate',
      label: 'arriving Date',
      type: 'date',
      placeholder: '2019-01-01'
    }
  ]

  created() {
    // const { params: { model } } = lfService.validateUrl({
    //   url: `/${this.modelName}`,
    //   method: 'get'
    // });
    // this.itemList = model.fieldsKeys();
    this.itemList = [...this.defaultItemList]
  }

  setForm(itemList: FilterFormList[]) {
    this.itemList = [...itemList]
  }

  reset() {
    Modal.info({
      title: 'Go to datatable',
      onOk: () => {
        this.$router.replace({
          name: '<%= modelListName %>'
        })
      }
    })
  }

  importOrExport() {
    const data = [];
    Modal.info({
      title: 'Import or Export',
      onOk: () => {
        this.$router.replace({
          name: 'ExportHelper',
        })
      }
    })
  }

  statistic() {
    Modal.info({
      title: 'Statistic Charts',
      onOk: () => {
        this.$router.replace({
          name: 'Statistic'
        })
      }
    })
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
                <a on-click="importOrExport">Import/Export</a>
              </a-menu-item>
              <a-menu-item>
                <a on-click="statistic">Statistic</a>
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

export default Form.create({})(MemberForm);
