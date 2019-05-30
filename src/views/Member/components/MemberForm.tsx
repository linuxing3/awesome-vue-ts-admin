
import { Component, Vue, Emit } from 'vue-property-decorator';
import {
  Form, Card, Dropdown, Menu, Icon, Modal,
} from 'ant-design-vue';
import { FilterFormList, Opreat } from '@/interface';
import MForm from '@/components/FilterForm/MForm';
import { etnia, gender } from '@/utils/constant';

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
  formValues: any = {}
  itemList: any[] = []

  defaultItemList: FilterFormList[] = [
    {
      key: 'department',
      type: 'select',
      label: 'department',
      placeholder: 'Input department',
      options: [
        {
          label: '单位领导',
          value: '1'
        },
        {
          label: '政新处',
          value: '1'
        },
        {
          label: '经商处',
          value: '2'
        },
        {
          label: '武官处',
          value: '3'
        },
        {
          label: '领侨处',
          value: '4'
        },
        {
          label: '办公室',
          value: '5'
        }
      ]
    },
    {
      key: 'name',
      type: 'input',
      label: 'name',
      placeholder: 'Input name'
    },
    {
      key: 'gender',
      type: 'select',
      label: 'gender',
      placeholder: 'Input gender',
      options: [...gender]
    },
    {
      key: 'birthday',
      type: 'input',
      label: 'birthday',
      placeholder: 'Input birthday'
    },
    {
      key: 'etnia',
      type: 'select',
      label: 'etnia',
      placeholder: 'Input etnia',
      options: [...etnia]
    },
    {
      key: 'academicBackground',
      type: 'input',
      label: 'academicBackground',
      placeholder: 'Input academicBackground'
    },
    {
      key: 'foreignLanguage',
      type: 'input',
      label: 'foreignLanguage',
      placeholder: 'Input foreignLanguage'
    },
    {
      key: 'politicalRole',
      type: 'input',
      label: 'politicalRole',
      placeholder: 'Input politicalRole'
    },
    {
      key: 'positionAndRank',
      type: 'input',
      label: 'positionAndRank',
      placeholder: 'Input positionAndRank'
    },
    {
      key: 'militantRole',
      type: 'input',
      label: 'militantRole',
      placeholder: 'Input militantRole'
    },
    {
      key: 'duty',
      type: 'input',
      label: 'duty',
      placeholder: 'Input duty'
    },
    {
      key: 'fromEntity',
      type: 'input',
      label: 'fromEntity',
      placeholder: 'Input fromEntity'
    },
    {
      key: 'arrivingDate',
      type: 'input',
      label: 'arrivingDate',
      placeholder: 'Input arrivingDate'
    },
    {
      key: 'rotatingDate',
      type: 'input',
      label: 'rotatingDate',
      placeholder: 'Input rotatingDate'
    },
    {
      key: 'sendingEntity',
      type: 'input',
      label: 'sendingEntity',
      placeholder: 'Input sendingEntity'
    },
    {
      key: 'conyugeName',
      type: 'input',
      label: 'conyugeName',
      placeholder: 'Input conyugeName'
    },
    {
      key: 'conyugeEntity',
      type: 'input',
      label: 'conyugeEntity',
      placeholder: 'Input conyugeEntity'
    },
    {
      key: 'conyugeBonus',
      type: 'input',
      label: 'conyugeBonus',
      placeholder: 'Input conyugeBonus'
    },
    {
      key: 'note',
      type: 'textarea',
      label: 'note',
      placeholder: 'Input note'
    },
    {
      key: 'protocolId',
      type: 'input',
      label: 'protocolId',
      placeholder: 'Input protocolId'
    },
    {
      key: 'isActive',
      type: 'input',
      label: 'isActive',
      placeholder: 'Input isActive'
    },
    {
      key: 'militant',
      type: 'input',
      label: 'string',
      placeholder: 'Input militant'
    }
  ]

  created() {
    this.itemList = [...this.defaultItemList]
  }

  @Emit()
  setForm(itemList: FilterFormList[]) {
    this.itemList = [...itemList]
  }

  @Emit()
  loadEditInfo(data) {
    this.formValues = data
  }

  @Emit()
  reset() {
    Modal.info({
      title: 'Go to datatable',
      onOk: () => {
        this.$router.replace({
          name: 'MemberTable'
        })
      }
    })
  }

  @Emit()
  importOrExport() {
    const values = this.formValues
    Modal.info({
      title: `Import or Export ${this.modelName}`,
      onOk: () => {
        this.$router.replace({
          name: 'ExportHelper',
          params: {
            modelName: this.modelName,
            data: JSON.stringify({ ids: [values.id] })
          }
        })
      }
    })
  }

  @Emit()
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
    )
  }
}

export default Form.create({})(MemberForm);
