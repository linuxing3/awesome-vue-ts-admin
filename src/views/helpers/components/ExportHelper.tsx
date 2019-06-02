import {
  Component, Vue, Mixins, Emit,
} from 'vue-property-decorator';
import {
  Tag, Icon, Card, Row, Col, Button, Modal, Select, List, Upload,
} from 'ant-design-vue';
import exportMixin from '@/utils/exportMixin';

import './index.less';

@Component({
  name: 'ExportHelper',
  components: {
    'a-icon': Icon,
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
    'a-select': Select,
    'a-tag': Tag,
    'a-card': Card,
    'a-upload-dragger': Upload,
    'a-list': List,
    'a-list-item': List.Item,
  },
})
export default class ExportHelper extends Mixins(exportMixin) {
  normalLayout = {
    span: 8,
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  }

  halfLayout = {
    span: 4,
    xl: 12,
    lg: 12,
    md: 12,
    sm: 12,
    xs: 24,
  }

  content = [
    '导出流程：',
    '第一步：将数据导出为Excel文件',
    '第二步：将Excel文件数据合并到Word',
    '',
    '导入流程：',
    '第一步：将数据输入到Excel文件的Sheet1，确认英文列标题',
    '第二步：将Excel文件导出到系统',
  ]

  import(e: Event) {
    this.getImportFile(e)
      .then((path) => {
        this.$log.suc('Import File Path: ', path);
        this.attemptImport(path);
      })
      .catch((error) => {
        this.$log.err(error);
      });
  }

  export() {
    this.attemptExport(this.data);
  }

  upload(info) {
    const { uid, name } = info.file;
    this.$log.info(name);
    return Promise.resolve(info.file);
  }

  uploadChange(info) {
    this.$log.info(name);
    return Promise.resolve(info.file);
  }

  @Emit()
  setData(data) {
    this.$log.info('Setting export data: ', data);
  }

  renderActionBtn(): JSX.Element {
    return (
      <div>
        <a-button on-click={this.import} id={'import'} icon="cloud" type="primary">
          Import
        </a-button>
        <a-button on-click={this.export} id={'export'} icon="download">
          Export
        </a-button>
      </div>
    );
  }

  renderUpload(): JSX.Element {
    return (
      <div>
        <a-upload-dragger
          name="file"
          multiple={false}
          action={this.upload}
          change={this.uploadChange}
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">点击或拖拽上次</p>
          <p class="ant-upload-hint">请确保文件格式和数据列标题的一致性</p>
        </a-upload-dragger>
      </div>
    );
  }

  renderContent(): JSX.Element {
    return (
      <div>
        <a-list size="large" bordered>
          {this.content.map(item => (
            <a-list-item>{item}</a-list-item>
          ))}
          <div slot="header">
            <h3 style="{ margin: '16px 0' }">操作说明</h3>
            {this.renderActionBtn()}
          </div>
        </a-list>
      </div>
    );
  }

  renderSampleData(): JSX.Element {
    const firstRecord = this.data[0];
    if (firstRecord) {
      return (
        <div>
          <a-list size="large" bordered>
            {Object.keys(firstRecord).map(key => <a-list-item>{key}|{firstRecord[key]}</a-list-item>)}
            <div slot="header">
              <h3 style="{ margin: '16px 0' }">数据样本</h3>
            </div>
          </a-list>
        </div>
      );
    }
    return (
        <div>
          <h3 style="{ margin: '16px 0' }">无数据样本</h3>
        </div>
    );
  }

  renderSelect(modelName, list): JSX.Element {
    return (
      <a-select style="width: 100%;" id={modelName} label={modelName}>
        {list.map((items: any, indexs: number) => (
          <a-option key={indexs} value={items.value}>
            {items.label}
          </a-option>
        ))}
      </a-select>
    );
  }

  render() {
    const { modelName } = this;
    return (
      <div style="width: 100%;" class="helper-wrap">
        <a-card title={`Import and Export [${modelName}]`}>
          <a-row>
            <a-col {...{ props: this.normalLayout }}>{this.renderContent()}</a-col>
          </a-row>
          <a-row>
            <a-col {...{ props: this.normalLayout }}>{this.renderSampleData()}</a-col>
          </a-row>
          <a-row hidden>
            <a-col {...{ props: this.normalLayout }}>{this.renderUpload()}</a-col>
          </a-row>
          <a-row slot="actions">
            <a-col {...{ props: this.halfLayout }}>
              <a-button on-click={this.import} id={'import'} icon="plus" type="primary">
                Import
              </a-button>
            </a-col>
            <a-col {...{ props: this.halfLayout }}>
              <a-button on-click={this.export} id={'export'} icon="cloud">
                Export
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </div>
    );
  }
}
