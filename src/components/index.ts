// 自定义全局组件
import Vue from 'vue';
import FilterTable from '@/components/FilterTable/index.vue';
import FilterForm from '@/components/FilterForm/index.vue';
import MForm from '@/components/FilterForm/MForm';
import MTable from '@/components/FilterTable/MTable';
import MFilter from '@/components/FilterTable/MFilter';

Vue.component('filter-table', FilterTable);
Vue.component('filter-form', FilterForm);
Vue.component('m-table', MTable);
Vue.component('m-filter', MFilter);
Vue.component('m-form', MForm);
// Vue.use(VueInsProgressBar, options);
