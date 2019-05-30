
import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Dropdown, Menu, Icon, DatePicker, Button, Modal,
} from 'ant-design-vue';
import MForm from '@/components/FilterForm/MForm';
import { FilterFormList, Opreat } from '@/interface';

import lfService from '@/utils/request.localforage';
import './index.less';

@Component({
  name: 'EventForm',
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
class EventForm extends Vue {
  modelName: string = 'event'

  itemList: FilterFormList[] = [
    {
      key: 'title', type: 'input', label: 'title', placeholder: 'Input title',
    },
    {
      key: 'date', type: 'input', label: 'date', placeholder: 'Input date',
    },
    {
      key: 'startTime', type: 'input', label: 'startTime', placeholder: 'Input startTime',
    },
    {
      key: 'duration', type: 'input', label: 'duration', placeholder: 'Input duration',
    },
    {
      key: 'applicant', type: 'input', label: 'applicant', placeholder: 'Input applicant',
    },
    {
      key: 'participants', type: 'input', label: 'participants', placeholder: 'Input participants',
    },
    {
      key: 'guests', type: 'input', label: 'guests', placeholder: 'Input guests',
    },
    {
      key: 'content', type: 'textarea', label: 'content', placeholder: 'Input content',
    },
    {
      key: 'currentDate', type: 'input', label: 'currentDate', placeholder: 'Input currentDate',
    },
    {
      key: 'reportDate', type: 'input', label: 'reportDate', placeholder: 'Input reportDate',
    },
    {
      key: 'reportContent', type: 'textarea', label: 'reportContent', placeholder: 'Input reportContent',
    },
    {
      key: 'instructionDate', type: 'input', label: 'instructionDate', placeholder: 'Input instructionDate',
    },
    {
      key: 'instruction', type: 'textarea', label: 'instruction', placeholder: 'Input instruction',
    },
    {
      key: 'priority', type: 'input', label: 'priority', placeholder: 'Input priority',
    },
    {
      key: 'userId', type: 'input', label: 'userId', placeholder: 'Input userId',
    },
    {
      key: 'projectId', type: 'input', label: 'projectId', placeholder: 'Input projectId',
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
          name: 'EventTable',
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
          params: {
            modelName: this.modelName,
          },
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
        <a-card title="EventList Form">
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
            on-set-form={this.setForm}
            on-reset={this.reset}
          />
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(EventForm);
