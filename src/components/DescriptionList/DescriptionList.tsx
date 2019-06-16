import {
  Component, Vue, Prop, Provide, Inject,
} from 'vue-property-decorator';
import { Col, Row } from 'ant-design-vue/es/grid/';
import './index.less';
import DescriptionListItem from './DescriptionListItem';

@Component({
  name: 'DescriptionList',
  components: {
    'a-col': Col,
    'a-row': Row,
    'description-list-item': DescriptionListItem,
  },
})
export default class DescriptionList extends Vue {
  @Prop({ default: '' }) title: string

  @Prop({ default: 3 }) col: number

  @Prop({ default: 'horizontal' }) layout: string

  @Prop({ default: 'large' }) size: string

  @Provide('column') column = this.col > 4 ? 4 : this.col

  render() {
    const { title, size, layout } = this;
    return (
      <div class={['description-list', size, layout === 'vertical' ? 'vertical': 'horizontal']}>
        {title ? <div class="title">{ title }</div> : null }
        <a-row>
          <slot/>
        </a-row>
      </div>
    );
  }
}
