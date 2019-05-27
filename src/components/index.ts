// 自定义全局组件
import Vue from 'vue';
import FilterTable from '@/components/FilterTable/index.vue';
import FilterForm from '@/components/FilterForm/index.vue';

Vue.component('filter-table', FilterTable);
Vue.component('filter-form', FilterForm);
// Vue.use(VueInsProgressBar, options);
