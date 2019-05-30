import {
  Component, Vue, Mixins, Emit,
} from 'vue-property-decorator';
import {
  Tag, Card, Row, Col, Button, Modal, Select,
} from 'ant-design-vue';
import exportMixin from '@/utils/exportMixin';

import './index.less';

@Component({
  name: 'MemberTable',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
    'a-select': Select,
    'a-tag': Tag,
    'a-card': Card,
  },
})
export default class ExportHelper extends Mixins(exportMixin) {
  get modelName() {
    return this.$route.params.modelName || 'member';
  }

  data: any[] = [];

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

  @Emit()
  setData(data) {
    this.$log.info('Setting export data: ', data);
    this.data = data;
  }

  renderActionBtn(): JSX.Element {
    return (
      <div>
        <div class="right-btn">
          <a-button on-click={this.import} id={'import'} icon="cloud" type="primary">
            Import
          </a-button>
          <a-button on-click={this.export} id={'export'} icon="download">
            Export
          </a-button>
        </div>
      </div>
    );
  }

  renderContent(): JSX.Element {
    return <div>Contents goes here</div>;
  }

  renderTarget(): JSX.Element {
    return <div>{
      this.data.map(item => item.id)
    }</div>;
  }

  render() {
    const { modelName } = this;
    return (
      <div class="export-helper-wrap" on-set-data={this.setData}>
        <a-card title={`Import and Export [${modelName}]`}>
        <a-select
            style="width: 100%;"
            id={modelName}
            label={modelName}
          >
          {[{ label: 'member', value: 'member' }, { label: 'member', value: 'member' }].map((items: any, indexs: number) => (
              <a-option key={indexs} value={items.value}>
                {items.label}
              </a-option>
          ))}
          </a-select>
          <a-row>
            <a-col>
              {this.renderContent()}
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              {this.renderTarget()}
            </a-col>
          </a-row>
          <a-row slot="actions">
            <a-col>
              <div>
                <div class="right-btn">
                  <a-button on-click={this.import} id={'import'} icon="plus" type="primary">
                    Import
                  </a-button>
                  <a-button on-click={this.export} id={'export'} icon="cloud">
                    Export
                  </a-button>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </div>
    );
  }
}
