import { Component, Vue } from 'vue-property-decorator';
import { FilterFormList, Opreat } from '@/interface';

import './index.less';
import { getValue } from '@/utils/helper';

@Component({
  name: 'crudForm',
})
class CrudForm extends Vue {
  modelName: string = 'member'

  editData: any = {}

  pageParams: object = {
    pageNum: 1,
    pageSize: 100,
    page: true,
  }

  formParams: any = {}

  filterParams: any = {
    name: '',
    gender: '',
    department: '',
    fromEntity: '',
    arrivingDate: '',
  }

  backParams: any = {
    code: 'data.result.resultCode',
    codeOK: '0',
    message: 'data.result.resultMessage',
    data: 'data.entity',
    params: 'config.params',
  }

  outParams: any = {}

  itemList: FilterFormList[] = [
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

  get id() {
    return this.$route.params.id || -1;
  }

  mounted() {
    this.$log.suc('CrudFrom Mounted hook');
    this.$nextTick(async () => {
      this.getFormParams();
      this.getEditData();
    });
  }

  setForm(params) {
    this.itemList = params;
  }

  resetForm() {
    this.itemList = this.formParams.columns;
  }

  /**
   * @method 获取表格数据
   */
  getFormParams() {
    window.ajax.request({
      url: `/${this.modelName}`,
      method: 'get',
    }).then((res) => {
      this.$log.suc('Form Fetch response:', res);
      const code = getValue(this.backParams.code, res);
      if (code === this.backParams.codeOK) {
        this.formParams = getValue(this.backParams.params, res);
        this.$log.suc('MTable table data:', this.formParams);
      } else {
        this.$message.error(getValue(this.backParams.message, res));
      }
    });
  }

  getEditData() {
    this.$log.suc('getting edit data...');
    // For add new record
    if (this.id === -1) {
      window.ajax.request({
        url: `/${this.modelName}`,
        method: 'get',
      }).then((res) => {
        this.$log.suc(res);
        const Entity = res.config.params.model;
        this.editData = new Entity();
        this.editData.id = -1;
        this.$log.suc('Crud Form Edit Data:', this.editData);
      });
    } else {
      // for edit a exiting record
      window.ajax.request({
        url: `/${this.modelName}`,
        method: 'get',
        data: { id: this.id },
      }).then((res) => {
        this.editData = res.data.entity;
        this.$log.suc('Crud Form Edit Data:', this.editData);
      });
    }
  }

  render() {
    const {
      modelName, editData, itemList, formParams, outParams, backParams,
    } = this;
    return (
      <div class="base-form-wrap">
        {this.id}
        <filter-form
          modelName={modelName}
          editData={editData}
          itemList={itemList}
          formParams={formParams}
          backParams={backParams}
          outParams={outParams}
          saveBtn={true}
          resetBtn={true}
          fetchType={'post'}
          on-set-form={this.setForm}
          on-reset={this.resetForm}
          on-current-change={this.resetForm}
          on-clear-out-params={this.resetForm}
        />
      </div>
    );
  }
}

export default CrudForm;
