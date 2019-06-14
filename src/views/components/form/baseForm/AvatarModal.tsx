import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Button,
  Col,
  Row,
  Modal,
  Carousel
} from 'ant-design-vue';

@Component({
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
    'a-carousel': Carousel,
  },
})
export default class AvatarMoal extends Vue {
  @Prop({ default: false })
  private visible!: boolean

  id = null

  avatarList = ['/avatar/man_1.jpg', '/avatar/man_2.jpg', '/avatar/man_3.jpg']

  chosenAvatarUrl = ''

  confirmLoading = false

  chooseAvatar(avatarUrl) {
    this.chosenAvatarUrl = avatarUrl;
  }

  handleOk() {
    this.confirmLoading = true;
    this.$emit('change-avatar', this.chosenAvatarUrl);
    setTimeout(() => {
      this.confirmLoading = false;
      this.$message.success('成功');
    }, 2000);
  }

  render() {
    const {
      visible,
      confirmLoading,
      chooseAvatar,
      handleOk,
    } = this;
    return (
      <a-modal
        title="修改头像"
        visible={visible}
        maskClosable={true}
        confirmLoading={confirmLoading}
        width="360"
      >
        <a-row>
          <a-carousel>
            {this.avatarList.map(avatarUrl => (
              <div on-click={() => chooseAvatar(avatarUrl)}>
                <img size={300} src={avatarUrl} />
              </div>
            ))}
          </a-carousel>
        </a-row>
        <div slot="footer">
          <a-button
            key="submit"
            type="primary"
            loading={confirmLoading}
            on-click={handleOk}
          >
            保存
          </a-button>
        </div>
      </a-modal>
    );
  }
}
