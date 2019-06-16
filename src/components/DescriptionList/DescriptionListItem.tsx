import {
  Component, Vue, Prop, Provide, Inject,
} from 'vue-property-decorator';
import { Col } from 'ant-design-vue/es/grid/';

import './index.less';

@Component({
  name: 'DetailListItem',
  components: {
    'a-col': Col,
  },
})
export default class DescriptionListItem extends Vue {
  responsive = {
    1: { xs: 24 },
    2: { xs: 24, sm: 12 },
    3: { xs: 24, sm: 12, md: 8 },
    4: { xs: 24, sm: 12, md: 6 },
  };

  @Prop({ default: '' })
  term: string

  @Inject('column') column!: number

  render() {
    const { responsive, column } = this;
    return (
      <a-col {...{ props: responsive[column] }}>
        <div class="term">{this.$props.term}</div>
        <div class="content">{this.$slots.default}</div>
      </a-col>
    );
  }
}
