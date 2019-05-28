
import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Card, Dropdown, Menu, Icon, Modal
} from 'ant-design-vue';
import { FilterFormList, Opreat } from '@/interface';
import MForm from '@/components/FilterForm/MForm';

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

  itemList: FilterFormList[] = []

  defaultItemList: FilterFormList[] = [
    {
      key: 'name',
      label: 'name',
      type: 'input',
      placeholder: 'Input Name',
    },
    {
      key: 'gender',
      label: 'gender',
      type: 'select',
      placeholder: 'male',
      options: [
        {
          label: 'male',
          value: 'male',
        },
        {
          label: 'female',
          value: 'female',
        },
      ],
    },
    {
      key: 'arrivingDate',
      label: 'arriving Date',
      type: 'date',
      placeholder: '2019-01-01',
    },
  ]

  created () {
    this.itemList = [ ...this.defaultItemList ];
  }

  setForm (itemList: FilterFormList[]) {
    this.itemList = [ ...itemList ];
  }

  reset () {
    Modal.info({
      title: 'Go to list',
      onOk: () => {
        this.$router.replace({
          name: 'MemberList'
        })
      },
      onCancel: () => {
        this.setForm(this.itemList);
      },
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
                <a to={'/import'}>Import</a>
              </a-menu-item>
              <a-menu-item>
                <a to={'/export'}>Export</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <m-form ref="MForm" item-list={this.itemList} save-btn={true} reset-btn={true} on-set-form={this.setForm} on-reset={this.reset} />
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(MemberForm);
