import Vue from 'vue';
import {
  MutationOptions,
  NetworkStatus,
} from 'apollo-client';
import { DocumentNode } from 'graphql';

declare module '*.vue' {
  export default Vue;
}
declare module 'vue/types/vue' {
  interface Vue {
    Form: any;
    $log: any;
    $http: any;
    $app: any;
  }
}
