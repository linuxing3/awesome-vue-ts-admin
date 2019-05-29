import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Button, Modal } from 'ant-design-vue';
import exportMixin from '@/utils/exportMixin';

@Component({
  name: 'MemberTable',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
    'a-tag': Tag,
    'a-card': Card
  }
})
export default class ExportHelper extends Mixins(exportMixin) {
  modelName: string;
  data: any[] = [];

  import(e: Event) {
    this.getImportFile(e)
      .then(path => {
        this.$log.suc('Import File Path: ', path)
        this.attemptImport(path)
      })
      .catch(error => {
        this.$log.err(error)
      })
  }

  export() {
    this.attemptExport(this.data)
  }

  renderActionBtn(): JSX.Element {
    return (
      <div>
        <div class="right-btn">
          <a-button on-click={this.import} id={'import'} icon="plus" type="primary">
            Save
          </a-button>
          <a-button on-click={this.export} id={'export'} icon="cloud">
            Reset
          </a-button>
        </div>
      </div>
    )
  }

  renderContent(): JSX.Element {
    return <div>Contents goes here</div>
  }

  renderTarget(): JSX.Element {
    return <div>target file select</div>
  }

  render() {
    return (
      <div class="export-helper-wrap">
        <a-row>{this.renderContent}</a-row>
        <a-row>{this.renderTarget}</a-row>
        <a-row>{this.renderActionBtn}</a-row>
      </div>
    )
  }
}
