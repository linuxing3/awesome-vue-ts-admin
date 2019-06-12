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

declare module 'vue-apollo/types/options' {
  interface VueApolloMutationOptions<V, R> extends MutationOptions<R> {
    mutation: DocumentNode
    variables?: VariableFn<V>
    // optimisticResponse?: ((this: ApolloVueThisType<V>) => any) | Object;
    optimisticResponse?: ((this: ApolloVueThisType<V>) => any) | any
  }
}
