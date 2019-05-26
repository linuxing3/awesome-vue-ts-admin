import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import lfService from '@/utils/request.localforage';

@Component({
  name: 'MemberTable',
  components: {
    'a-tag': Tag,
  },
})
export default class MemberTable extends Vue {
  render() {
    return (
      <div class="export-helper-wrap">
        export helper
      </div>
    );
  }
}
