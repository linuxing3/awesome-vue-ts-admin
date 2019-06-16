import { Component, Prop, Vue } from 'vue-property-decorator';

import './index.less';

@Component({
  name: 'FooterToolBar',
})
export default class FooterToolbar extends Vue {
  @Prop({ default: 'ant-pro-footer-toolbar' })
  prefixCls: string

  @Prop({ default: '' })
  extra: string | object

  render() {
    const { extra } = this;
    return (
      <div class="prefixCls">
        <div style="float: left">
          <slot name="extra">{ extra }</slot>
        </div>
        <div style="float: right">
          <slot/>
        </div>
      </div>
    );
  }
}
