import { Component, Vue } from 'vue-property-decorator';
import { Card } from 'ant-design-vue';
import IconSelector from '@/components/IconSelector';
@Component({
  components: {
    'icon-selector': IconSelector,
    'a-card': Card,
  },
})
export default class IconHelper extends Vue {
  handleIconChange(icon) {
    console.log('change Icon', icon);
    this.$message.info(<span>选中图标 <code>{icon}</code></span>);
  }

  render() {
    const { handleIconChange } = this;
    return (
      <a-card body-style={{ padding: '24px 32px' }} bordered={false}>
        <icon-selector on-change={handleIconChange}/>
      </a-card>
    );
  }
}
