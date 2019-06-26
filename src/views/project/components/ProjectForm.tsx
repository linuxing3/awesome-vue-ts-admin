import { Component, Mixins, Emit } from 'vue-property-decorator';
import {
  Form, Card, Dropdown, Menu, Icon, Modal,
} from 'ant-design-vue';
import { FilterFormList } from '@/interface';
import MForm from '@/components/FilterForm/MForm';
import ProjectStepForm from './stepForm';
import FormMixin from '@/utils/formMixin';
import { defaultItemList } from './config';
import './index.less';

@Component({
  name: 'ProjectForm',
  components: {
    'project-step-form': ProjectStepForm,
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
class ProjectForm extends Mixins(FormMixin) {
  modelName: string = 'project'

  formValues: any = {}

  itemList: any[] = defaultItemList

  outParams: any = {
    itemList: defaultItemList,
  }

  showAuthModal = false

  defaultStepForms = [
    ['title', 'time', 'frequency'],
    ['entity'],
    ['authorizationDate', 'authorizer'],
  ];

  toggleModal() {
    this.showAuthModal = !this.showAuthModal;
  }

  @Emit()
  authorizationStart() {
    this.$log.info('Opening modal...');
    this.showAuthModal = true;
  }

  @Emit()
  authorizationDone(values) {
    this.$log.info('Close modal...');
    this.showAuthModal = false;
    this.$message.success(JSON.stringify(values));
  }

  render() {
    const {
      defaultStepForms, showAuthModal, authorizationDone, toggleModal,
    } = this;
    return (
      <div class="base-form-wrap">
        {/* 分布获取授权模态 */}
        <project-step-form ref="StepForm" visible={showAuthModal} stepForms={defaultStepForms} on-authorizationDone={authorizationDone} on-toggleModel={toggleModal} />
        {/* 表单 */}
        <a-card title="Project Form">
          <a-dropdown slot="extra">
            <a class="ant-dropdown-link">
              <a-icon type="ellipsis" style="font-size: 22px" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a on-click={this.importOrExport}>导入导出</a>
              </a-menu-item>
              <a-menu-item>
                <a on-click={this.authorizationStart}>启动审批</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <m-form
            ref="MForm"
            modelName={this.modelName}
            item-list={this.itemList}
            save-btn={true}
            reset-btn={true}
            filter-btn={true}
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

export default Form.create({})(ProjectForm);
