import { Component, Mixins } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import { tableList, FilterFormList, operate } from '@/interface';
import TableMixin from '@/utils/tableMixin';
import {
  BackParams, operateBtn, tableFieldsList, filterFormItemList, defaultItemList,
} from './config';

import './index.less';

@Component({
  name: 'EmployeeTable',
  components: {
    'a-tag': Tag,
  },
})
export default class EmployeeTable extends Mixins(TableMixin) {
  modelName: string = 'employee'

  data: any[] = []

  pageParams: object = {
    pageNum: 1,
    pageSize: 100,
    page: true,
  }

  filterParams: any = {
    name: '',
  }

  BackParams: any = BackParams

  outParams: any = {}

  filterList: FilterFormList[] = filterFormItemList

  tableList: tableList[] = tableFieldsList

  operate: operate[] = operateBtn

  visible: boolean = false

  modelType: string = 'add'

  editData: object = {}

  customRender() {
    this.tableList[1].customRender = this.genderRender;
    this.tableList[4].customRender = this.dateRender;
  }

  genderRender(text: any) {
    return <a-tag color={text ? 'blue' : 'purple'}>{text ? '男' : '女'}</a-tag>;
  }

  dateRender(value: string) {
    return <a-tag color="blue">{value}</a-tag>;
  }

  render() {
    return (
      <div class="baseInfo-wrap">
        <filter-table
          ref="InfoTable"
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          scroll={{ x: 900 }}
          url={'/employee/fetch'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={true}
          dataType={'json'}
          rowKey={'id'}
          operate={this.operate}
          fetchType={'get'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
          on-export={this.export}
        />
      </div>
    );
  }
}
