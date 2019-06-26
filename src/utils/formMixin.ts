import { Component, Vue, Emit } from 'vue-property-decorator';
import { Form, Modal } from 'ant-design-vue';
import { upperFirst } from 'lodash';
import { FilterFormList } from '@/interface';

@Component({})
export default class FormMixin extends Vue {
  modelName: string = '';

  formValues: any = {};

  itemList: any[] = [];

  filterItemList: any[] = [];

  outParams: any = {
    itemList: [],
  };

  @Emit()
  setForm(filterItemList: string[]) {
    this.$log.info('过滤表单项目清单: ', filterItemList);
    this.itemList = this.itemList.filter(item => filterItemList.indexOf(item.key) > -1);
  }

  @Emit()
  loadEditInfo(data) {
    this.$log.info('获取表单值: ', data);
    this.formValues = data;
  }

  @Emit()
  clear() {
    this.$log.info('清除表单值');
    this.formValues = {};
  }

  @Emit()
  showDataTable() {
    this.$log.info('跳转到表格组件');
    const name = `${upperFirst(this.modelName)}Table`;
    this.$router.push({
      name,
    });
  }

  @Emit()
  importOrExport() {
    const values = this.formValues;
    const {
      outParams: { itemList },
    } = this;
    this.$log.info('导出数据', values.id);
    this.$router.replace({
      name: 'ExportHelper',
      params: {
        modelName: this.modelName,
        data: JSON.stringify({ ids: [values.id], itemList }),
      },
    });
  }

  @Emit()
  statistic() {
    this.$router.replace({
      name: 'Statistic',
    });
  }
}
