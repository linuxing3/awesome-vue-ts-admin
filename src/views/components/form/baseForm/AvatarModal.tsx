import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Button,
  Col,
  Row,
  Modal,
} from 'ant-design-vue';

@Component({
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
  },
})
export default class AvatarMoal extends Vue {
  @Prop()
  visible = false

  id = null

  confirmLoading = false

  options = {
    img: '/avatar/man_2.jpg',
    autoCrop: true,
    autoCropWidth: 200,
    autoCropHeight: 200,
    fixedBox: true,
  }

  previews: {
    url: '/avatar/man_2.jpg'
  }

  edit(id) {
    this.visible = true;
    this.id = id;
  }

  close() {
    this.id = null;
    this.visible = false;
  }

  cancelHandel() {
    this.close();
  }

  okHandel() {
    const vm = this;
    vm.confirmLoading = true;
    setTimeout(() => {
      vm.confirmLoading = false;
      vm.close();
      vm.$message.success('上传头像成功');
    }, 2000);
  }

  realTime(data) {
    this.previews = data;
  }

  render() {
    const {
      visible, confirmLoading, previews, okHandel, cancelHandel,
    } = this;
    return (
      <a-modal
        title="修改头像"
        visible={visible}
        maskClosable="false"
        confirmLoading={confirmLoading}
        width="800"
        on-cancel={this.cancelHandel}
      >
        <a-row>
          <a-col xs="24" md="12" style="{height: '350px'}">
            <div class="avatar-upload-preview">
              <img src={previews.url} />
            </div>
          </a-col>
        </a-row>

        <div slot="footer">
          <a-button key="back" on-click={cancelHandel}>
            取消
          </a-button>
          <a-button
            key="submit"
            type="primary"
            loading={confirmLoading}
            on-click={okHandel}
          >
            保存
          </a-button>
        </div>
      </a-modal>
    );
  }
}
