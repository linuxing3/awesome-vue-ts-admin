import { Component, Vue, Emit } from 'vue-property-decorator';
import { Form, Modal } from 'ant-design-vue';
import { upperFirst } from 'lodash';
import { FilterFormList } from '@/interface';

@Component({})
export default class FormMixin extends Vue {
  modelName: string = ''

  formValues: any = {}

  itemList: any[] = []

  outParams: any = {
    itemList: [],
  }

  @Emit()
  setForm(itemList: FilterFormList[]) {
    this.itemList = [...itemList];
  }

  @Emit()
  loadEditInfo(data) {
    this.formValues = data;
  }

  @Emit()
  showDataTable() {
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
