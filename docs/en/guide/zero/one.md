# State management

- [Config](#config)
- [Modules](#modules)
- [Plugins](#plugins)
- [Index](#index file)

## config

In your `vue.config.js` file, your can use `chainWebpack` to customize the webpack config

You can find the several config of `vue-service` in `@vue/cli-service/lib/config`

```javascript
module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
    const resolveLocal = require('../util/resolveLocal')
    const getAssetPath = require('../util/getAssetPath')
    const inlineLimit = 4096

    const genAssetSubPath = dir => {
      return getAssetPath(
        options,
        `${dir}/[name]${options.filenameHashing ? '.[hash:8]' : ''}.[ext]`
      )
    }

    const genUrlLoaderOptions = dir => {
      return {
        limit: inlineLimit,
        // use explicit fallback to avoid regression in url-loader>=1.1.0
        fallback: {
          loader: 'file-loader',
          options: {
            name: genAssetSubPath(dir)
          }
        }
      }
    }

    webpackConfig
      .mode('development')
      .context(api.service.context)
      .entry('app')
        .add('./src/main.js')
        .end()
      .output
        .path(api.resolve(options.outputDir))
        .filename(isLegacyBundle ? '[name]-legacy.js' : '[name].js')
        .publicPath(options.publicPath)

    webpackConfig.resolve
      .extensions
        .merge(['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'])
        .end()
      .modules
        .add('node_modules')
        .add(api.resolve('node_modules'))
        .add(resolveLocal('node_modules'))
        .end()
      .alias
        .set('@', api.resolve('src'))
        .set(
          'vue$',
          options.runtimeCompiler
            ? 'vue/dist/vue.esm.js'
            : 'vue/dist/vue.runtime.esm.js'
        )

    webpackConfig.resolveLoader
      .modules
        .add('node_modules')
        .add(api.resolve('node_modules'))
        .add(resolveLocal('node_modules'))

    webpackConfig.module
      .noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/)

    // js is handled by cli-plugin-babel ---------------------------------------

    // vue-loader --------------------------------------------------------------
    const vueLoaderCacheConfig = api.genCacheConfig('vue-loader', {
      'vue-loader': require('vue-loader/package.json').version,
      /* eslint-disable-next-line node/no-extraneous-require */
      '@vue/component-compiler-utils': require('@vue/component-compiler-utils/package.json').version,
      'vue-template-compiler': require('vue-template-compiler/package.json').version
    })

    webpackConfig.module
      .rule('vue')
        .test(/\.vue$/)
        .use('cache-loader')
          .loader('cache-loader')
          .options(vueLoaderCacheConfig)
          .end()
        .use('vue-loader')
          .loader('vue-loader')
          .options(Object.assign({
            compilerOptions: {
              preserveWhitespace: false
            }
          }, vueLoaderCacheConfig))

    webpackConfig
      .plugin('vue-loader')
      .use(require('vue-loader/lib/plugin'))

    // static assets -----------------------------------------------------------

    webpackConfig.module
      .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .options(genUrlLoaderOptions('img'))

    // do not base64-inline SVGs.
    // https://github.com/facebookincubator/create-react-app/pull/1180
    webpackConfig.module
      .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
          .loader('file-loader')
          .options({
            name: genAssetSubPath('img')
          })

    webpackConfig.module
      .rule('media')
        .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .options(genUrlLoaderOptions('media'))

    webpackConfig.module
      .rule('fonts')
        .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
        .use('url-loader')
          .loader('url-loader')
          .options(genUrlLoaderOptions('fonts'))

    // Other common pre-processors ---------------------------------------------

    webpackConfig.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
        .end()

    // shims

    webpackConfig.node
      .merge({
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // process is injected via DefinePlugin, although some 3rd party
        // libraries may require a mock to work properly (#934)
        process: 'mock',
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
      })

    const resolveClientEnv = require('../util/resolveClientEnv')
    webpackConfig
      .plugin('define')
        .use(require('webpack/lib/DefinePlugin'), [
          resolveClientEnv(options)
        ])

    webpackConfig
      .plugin('case-sensitive-paths')
        .use(require('case-sensitive-paths-webpack-plugin'))

    // friendly error plugin displays very confusing errors when webpack
    // fails to resolve a loader, so we provide custom handlers to improve it
    const { transformer, formatter } = require('../util/resolveLoaderError')
    webpackConfig
      .plugin('friendly-errors')
        .use(require('@soda/friendly-errors-webpack-plugin'), [{
          additionalTransformers: [transformer],
          additionalFormatters: [formatter]
        }])
  })
}
```


## modules

The `src/store/modules` directory is where all shared application state lives. Any JS file added here (apart from unit tests) will be automatically registered in the store as a [namespaced module](https://vuex.vuejs.org/en/modules.html#namespacing).

Read more in the [Vuex modules](https://vuex.vuejs.org/en/modules.html) docs.


I prefer to use `vuex-pathify` to automatically `make` mutations, actions and getters from state. Cheers!

```javascript
import { make } from "vuex-pathify";

const state = {
  name: "account",
  items: [],
  currentItem: {},
  filter: {
    search: "",
    sort: "",
  }
};

const mutations: any = {
  ...make.mutations(state)
};

const actions: any = {
  ...make.actions(state)
};

const getters: any = { 
  ...make.getters(state) 
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
```

And the batch import helper is `src/store/modules/index.ts`, which use the
webpack `require.context` to automatically import all separate module files
under the directory.

```javascript
import { toLower } from "lodash";

let files = require["context"](".", false, /\.ts$/);
let modules = {};

files.keys().forEach(key => {
  if (key === "./index.ts") return;
  let moduleName = toLower(key.replace(/(\.\/|\.ts)/g, ""));
  modules[moduleName] = files(key).default;
});

console.log(modules);
export default modules;
```

## plugins

### ormplugins

#### Vuex ORM Plugin: LocalForage

##### Installation

- General usage

``` js
import VuexORM from '@vuex-orm/core'
import VuexORMLocalForage from 'vuex-orm-localforage'
import database from './database'

// datebase.register(some model, some module)
VuexORM.use(VuexORMLocalForage, {
  database
})

export default () => new Vuex.Store({
  namespaced: true,
  plugins: [VuexORM.install(database)]
})
```

- Core concepts

```js
import Context from './common/context';
import Action from './actions/Action'
import Fetch from './actions/Fetch'
import Persist from './actions/Persist'
import Get from './actions/Get'
import Destroy from './actions/Destroy'

export default class VuexOrmLocalForage {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  constructor(components, options) {
    Context.setup(components, options);
    this.setupActions();
    this.setupModels();
    this.setupLifecycles();
  }

  /**
   * This method will setup following Vuex actions: $fetch, $get
   */
  setupActions() {
    const context = Context.getInstance();

    context.components.Actions.$get = Get.call.bind(Get);
    context.components.Actions.$fetch = Fetch.call.bind(Fetch);
    context.components.Actions.$create = Persist.create.bind(Persist);
    context.components.Actions.$update = Persist.update.bind(Persist);
    context.components.Actions.$delete = Destroy.call.bind(Destroy);
  }

  /**
   * This method will setup following model methods: Model.$fetch, Model.$get, Model.$create,
   * Model.$update, Model.$delete
   */
  setupModels() {
    const context = Context.getInstance();

    /**
     * Transform Model and Modules
     */
    _.map(context.database.entities, entity => {
      entity.model = Action.transformModel(entity.model);
      return entity;
    });

    context.components.Model.$fetch = function (config = {}) {
      return this.dispatch('$fetch', config);
    };

    context.components.Model.$get = function (config = {}) {
      return this.dispatch('$get', config);
    };

    context.components.Model.$create = function (config = {}) {
      return this.dispatch('$create', config);
    };

    context.components.Model.$update = function (config = {}) {
      return this.dispatch('$update', config);
    };

    context.components.Model.$delete = function (config = {}) {
      return this.dispatch('$delete', config);
    };
  }

  setupLifecycles() {
    const context = Context.getInstance();

    if (context.options.beforeCreate) {
      context.components.Query.on('beforeCreate', context.options.beforeCreate);
    }
  }
}
```

Actions in `vuex-orm-localforage` is defined as following, basiclly just add `localforage` instance to `model`

```js
import localforage from 'localforage';
import _ from 'lodash';
import Context from '../common/context';

export default class Action {
  /**
   * Transform Model to include ModelConfig
   * @param {object} model
   */
  static transformModel(model) {
    // skipping... 
    const context = Context.getInstance();
    // Here use localforage and attach to model
    model.$localStore = localforage.createInstance({
      name: Context.getInstance().options.name,
      storeName: model.entity,
    });

    return model;
  }
}
```

Implement the `$localStore` methods like `Fetch`

```js
import Action from './Action';
import Context from '../common/context';

export default class Fetch extends Action {
  /**
   * Call $fetch method
   * @param {object} store
   * @param {object} params
   */
  static async call({ state, dispatch }) {
    const context = Context.getInstance();
    const model = context.getModelFromState(state);

    const records = [];

    return model.$localStore.iterate((record) => { // added ==> iterate all item
      records.push(record); // added ==> added to records as temprary array
    }).then(() => dispatch('insertOrUpdate', { // added ==> load records into vuex
      data: records,
    }));
  }
}
```



Implement the `$localStore` methods like `persist`

```js
import Action from './Action';
import Model from '../orm/Model';
import Context from '../common/context';

export default class Persist extends Action {
  /**
   * Is called when an item is inserted or updated in the store
   *
   * @param {object} store
   * @param {object} payload
   */
  static async call({ dispatch }, payload, action = 'insertOrUpdate') {
    return dispatch(action, payload).then((result) => {
      const promises = []; // promise queue
      const context = Context.getInstance();

      // Iterate results from model when running the `insertOrUpdate` hook
      Object.keys(result).forEach((entity) => {
        result[entity].forEach((record) => {
          const model = context.getModelByEntity(entity);
          const key = this.getRecordKey(record);
          const data = Model.getPersistableFields(model).reduce((entry, field) => {
            entry[field] = record[field]; // set entry key to record key
            return entry;
          }, {});

          promises.push(model.$localStore.setItem(key, data)); // added setItem in promises queue
        });
      });

      return Promise.all(promises).then(() => result); // run promises and return result
    });
  }

  static create(context, payload) {
    return this.call(context, payload); // return result from call create and update
  }

  static update(context, payload) {
    return this.call(context, payload, 'update');
  }
}
```

- Lowdb Plugin

Since I use `vuex/orm`, I feed that it's easier to keep all persistence logic in
the query hooks, which when create, delete, update any `model`, the hook will
automatically save it to my `lowdb` datastore file.

```javascript
import VuexORM, { Database, Query, Model } from "@vuex-orm/core";
import models from "@/api/models";
import modules from "@/store/modules";
import { curry } from "lodash";
// Query hooks will use model to interact with lowdb
Query.on("afterCreate", function(model: Model) {
});

Query.on("beforeDelete", function(model: Model) {
});

Query.on("afterUpdate", function(model: Model) {
});

export const registerDatabase = (models: any, modules: any): Database => {
  const database = new Database();
  Object.keys(models).map(key => {
    console.log(`Registering ORM for ${key} model`);
    database.register(models[key], modules[key] || {});
  });
  return database;
};

export const curriedRegisterDatabase = curry(registerDatabase);
export const curriedDatabase = curriedRegisterDatabase(models)(modules);

export const database = registerDatabase(models, modules);

const ormPlugin = VuexORM.install(database);

export default ormPlugin;
```

### lowdb plugins

As for reading data from persistent lowdb store file, I use a separate vuex
plugin which will read the data and inject to the store root state.


```javascript
export default options => {
  const entity = options.namespace || "data";
  return store => {
    const DB: LowdbForElectron = new LowdbForElectron(entity);
    const entityArray: any[] = DB.all(entity);
    const NSModel: Model = models[entity];
    if (Array.isArray(entityArray)) {
      NSModel.commit(state => (state.data = stateObjectFromArray(entityArray)));
    }
  }
}
```

Since the `vuex/orm` query data and return a array, but the `vuex` state takes
different plain format, I use a `stateObjectFromArray` helper functions to
transform it.

The original data format is like `[{"_id": "1", "name": "joe"}]`, the result
will be `{"1": {...}}`

```javascript
export function stateObjectFromArray<T extends any, K extends string>(a: Array<T>): { K: T } {
  return a.reduce((res, item) => {
    res[item["_id"]] = item;
    return res;
  }, Object.create(null));
}
```

Of course, if you use `lodash/keyBy`, which you can do `keyBy([o,...], (o)=> o["_id"])`

## index file

The state entry file in `index.ts` is the entry the Vuex store.

For simplicity, I use `vuex/orm` plugins to handle all the models, leaving
flexibility to module definition here.

But if you like, you can generate your modules and included modules here

```javascript
import modules from "./modules"
import plugins from "./plugins";
export default new Vuex.Store({
  state: {},
  modules,
  plugins,
});
```


Vuex ORM is a plugin for [Vuex](https://github.com/vuejs/vuex) to enable Object-Relational Mapping access to the Vuex Store. Vuex ORM lets you create "normalized" data schema within Vuex Store with relationships such as "Has One" and "Belongs To Many" like any other usual ORM library. It also provides fluent API to get, search and update Store state.

Vuex ORM is heavily inspired by Redux recipe of ["Normalizing State Shape"](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) and ["Updating Normalized Data"](http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html). Learn more about the concept and motivation of Vuex ORM at [What Is Vuex ORM?](https://vuex-orm.github.io/vuex-orm/guide/prologue/what-is-vuex-orm.html).

## Documentation

You can check out the full documentation for Vuex ORM at https://vuex-orm.github.io/vuex-orm.

## Questions & Discussions

Join us on our [Slack Channel](https://join.slack.com/t/vuex-orm/shared_invite/enQtNDQ0NjE3NTgyOTY2LTI0YjE5YmNmMDIxNWZlNmJhM2EyMDg1MDRkODA4YmQwMDU5OWRkZmNhN2RmOTZkZGZkODQxZTRkYjhmYmJiNTY) for any questions and discussions.

Although there is the Slack Channel, do not hesitate to open an [issue](https://github.com/vuex-orm/vuex-orm/issues) for any question you might have. We're always more than happy to hear any feedback, and we don't care what kind of form they are.

## Examples

You can find example application built with Vuex ORM at https://github.com/vuex-orm/vuex-orm-examples.

## Quick Start

Here's a very simple quick start guide that demonstrates how it feels like to be using Vuex ORM.

### Install Vuex ORM

Install Vuex ORM by npm or yarn.

```bash
$ npm install @vuex-orm/core

$ yarn add @vuex-orm/core
```

### Create Models

First, let's declare your models extending Vuex ORM `Model`. Here we assume that there are Post model and User model. Post model has a relationship with User – the post "belongs to" a user by the `author` key.

```js
// User Model
import { Model } from '@vuex-orm/core'

export default class User extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'users'

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      email: this.attr('')
    }
  }
}
```

```js
// Post Model
import { Model } from '@vuex-orm/core'
import User from './User'

export default class Post extends Model {
  static entity = 'posts'

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      title: this.attr(''),
      body: this.attr(''),
      published: this.attr(false),
      author: this.belongsTo(User, 'user_id')
    }
  }
}
```

With above example, you can see that the `author` field at `Post` model has a relation of `belongsTo` with `User` model.

### Register Models to the Vuex Store

Next, it's time for you to register models to Vuex. To do so, you first have to register models to the Database and then register the database to Vuex Store as Vuex plugin using VuexORM's `install` method.

```js
import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import User from './User'
import Post from './Post'

Vue.use(Vuex)

// Create a new database instance.
const database = new VuexORM.Database()

// Register Models to the database.
database.register(User)
database.register(Post)

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})

export default store
```

Now you are ready to go. Vuex ORM is going to create `entities` module in Vuex Store. Which means there will be `store.state.entities` state inside Vuex Store.

### Inserting Records to the Vuex Store

You can use Model's `insert` method, or dispatch Vuex Action to create new records in Vuex Store. Let's say we want to save a single post data to the store.

```js
// Assuming this data structure is the response from the API backend.
const posts = [
  {
    id: 1,
    title: 'Hello, world!',
    body: 'Some awesome body text...',
    author: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    }
  }
]

Post.insert({ data: posts })

// Or...

store.dispatch('entities/posts/insert', { data: posts })
```

By executing `insert` method, Vuex ORM creates the following schema in Vuex Store.

```js
// Inside `store.state.entities`.
{
  posts: {
    data: {
      '1': {
        id: 1,
        user_id: 1,
        title: 'Hello, world!',
        body: 'Some awesome body...',
        author: null
      }
    }
  },

  users: {
    data: {
      '1': {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
  }
}
```

See how `posts` and `users` are decoupled from each other. This is what it means for "normalizing" the data.

### Accessing the Data

Vuex ORM provides a way to query, and fetch data in an organized way through Model methods, or Vuex Getters.

```js
// Fetch all post records.
Post.all()

// Or...

store.getters['entities/posts/all']()

/*
  [
    {
      id: 1,
      user_id: 1,
      title: 'Hello,
      world!',
      body: 'Some awesome body...',
      author: null
    },
    ...
  ]
*/

// Fetch single record with relation.
Post.query().with('author').first()

// Or...

store.getters['entities/posts/query']().with('author').first()

/*
  {
    id: 1,
    user_id: 1,
    title: 'Hello, world!',
    body: 'Some awesome body...',
    author: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    }
  }
*/
```

Cool right? To get to know more about Vuex ORM, please [see the documentation](https://vuex-orm.github.io/vuex-orm)

## Plugins

Vuex ORM can be extended via a plugin to add additional features. Here is the list of available plugins.

- [Vuex ORM Axios](https://github.com/vuex-orm/plugin-axios) – The plugin to sync the store against a RESTful API.
- [Vuex ORM GraphQL](https://github.com/vuex-orm/plugin-graphql) – The plugin to sync the store against a [GraphQL](https://graphql.org) API.
- [Vuex ORM Search](https://github.com/vuex-orm/plugin-search) – The plugin adds a search() method to filter records using fuzzy search logic from the [Fuse.js](http://fusejs.io).
- [Vuex ORM Change Flags](https://github.com/vuex-orm/plugin-change-flags) - Vuex ORM plugin for adding IsDirty / IsNew flags to model entities.

## Resources

- [Vue](https://vuejs.org)
- [Vuex](https://vuex.vuejs.org)

You may find a list of awesome things related to Vuex ORM at [Awesome Vuex ORM](https://github.com/vuex-orm/awesome-vuex-orm).

## Contribution

We are excited that you are interested in contributing to Vuex ORM! Anything from raising an issue, submitting an idea of a new feature, or making a pull request is welcome!

### Development

```bash
$ npm run build
```

Compile files and generate bundles in `dist` directory.

```bash
$ npm run lint
```

Lint files using a rule of Standard JS.

```bash
$ npm run test
```

Run the test using [Mocha Webpack](https://github.com/zinserjan/mocha-webpack).

```bash
$ npm run test:watch
```

Run the test in watch mode.

```bash
$ npm run test:perf
```

Run the performance test.

```bash
$ npm run coverage
```

Generate test coverage in `coverage` directory.


## Vuex Pathify

Pathify makes working with Vuex **easy**, with a **declarative**, **state-based**, **path syntax**:

![pathify-diagram](docs/assets/img/readme/pathify-path.png)


Paths can reference any **module**, **property** or **sub-property**:

![pathify-diagram](docs/assets/img/readme/pathify-diagram.png)


**Get** or **set** data without **syntax juggling** or worrying about **implementation**:

![pathify-diagram](docs/assets/img/readme/pathify-accessors.png)


Set up **one or two-way** data binding on **any** store value without **bloat** or **fuss**:

![pathify-diagram](docs/assets/img/readme/pathify-computed.png)


Wire **multiple** properties or sub-properties using **array**, **object** and **wildcard** formats:

![pathify-diagram](docs/assets/img/readme/pathify-computed-many.png)


Map **store actions** in exactly the same way, even using **wildcards**:

![pathify-diagram](docs/assets/img/readme/pathify-actions.png)

Set up your store – **no matter how complex** – in a single line:

![pathify-diagram](docs/assets/img/readme/pathify-store.png)


And... that's it.



## Vuex comparison

Conversely, working with Vuex directly requires is much more work.

Store setup is a manual and laborious process:

![vuex-mutations](docs/assets/img/readme/vuex-store.png)
 
Getting and setting values requires juggling accessors, syntax and naming:

![vuex-code](docs/assets/img/readme/vuex-accessors.png)

Component wiring can require up to 4 different helpers, name juggling, plus additional template binding:

![vuex-helpers](docs/assets/img/readme/vuex-helpers.png)

Writing computed properties takes this much code **per property** for 2-way wiring:

![vuex-helpers](docs/assets/img/readme/vuex-computed.png)

Essentially, vanilla Vuex takes a lot of manual JavaScript coding to both set up and maintain.

Check out the [code comparison](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/main?initialpath=code) demo which illustrates a reduction in Vuex code when using Pathify, of between **2 and 14 times** (or more) depending on store size and setup.


## Summary

In practical terms, Pathify results in:

- less cognitive overhead
- zero store boilerplate
- one-liner wiring
- cleaner code
- lighter files


### Next steps

Get started:

- [Installation](https://www.npmjs.com/package/vuex-pathify)
- [Documentation](https://davestewart.github.io/vuex-pathify)

Demos:

- [Simple demo](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/simple)
- [Main demo](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/main)
- [Nuxt demo](https://github.com/davestewart/vuex-pathify-demos/tree/master/nuxt)

## vuex-class

Binding helpers for Vuex and vue-class-component

## Dependencies

- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)
- [vue-class-component](https://github.com/vuejs/vue-class-component)

## Installation

```bash
$ npm install --save vuex-class
# or
$ yarn add vuex-class
```

## Example

```js
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const someModule = namespace('path/to/module')

@Component
export class MyComp extends Vue {
  @State('foo') stateFoo
  @State(state => state.bar) stateBar
  @Getter('foo') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo
  @someModule.Getter('foo') moduleGetterFoo

  // If the argument is omitted, use the property name
  // for each state/getter/action/mutation type
  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created () {
    this.stateFoo // -> store.state.foo
    this.stateBar // -> store.state.bar
    this.getterFoo // -> store.getters.foo
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
    this.moduleGetterFoo // -> store.getters['path/to/module/foo']
  }
}
```

## vuex-persist

A Typescript-ready [Vuex](https://vuex.vuejs.org/) plugin that enables
you to save the state of your app to a persisted storage like
Cookies or localStorage.

[![Paypal Donate](https://img.shields.io/badge/Donate-Paypal-2244dd.svg)](https://paypal.me/championswimmer)

**Info :**
[![GitHub stars](https://img.shields.io/github/stars/championswimmer/vuex-persist.svg?style=social&label=%20vuex-persist)](http://github.com/championswimmer/vuex-persist)
[![npm](https://img.shields.io/npm/v/vuex-persist.svg?colorB=dd1100)](http://npmjs.com/vuex-persist)
[![npm](https://img.shields.io/npm/dw/vuex-persist.svg?colorB=fc4f4f)](http://npmjs.com/vuex-persist)
[![license](https://img.shields.io/github/license/championswimmer/vuex-persist.svg)]()

**Status :**
[![Build Status](https://travis-ci.org/championswimmer/vuex-persist.svg?branch=master)](https://travis-ci.org/championswimmer/vuex-persist)
[![codebeat badge](https://codebeat.co/badges/dc97dea1-1e70-45d5-b3f1-fec2a6c3e4b0)](https://codebeat.co/projects/github-com-championswimmer-vuex-persist-master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0fdc0921591d4ab98b0c0c173ef22649)](https://www.codacy.com/app/championswimmer/vuex-persist?utm_source=github.com&utm_medium=referral&utm_content=championswimmer/vuex-persist&utm_campaign=Badge_Grade)
[![Code Climate](https://codeclimate.com/github/championswimmer/vuex-persist/badges/gpa.svg)](https://codeclimate.com/github/championswimmer/vuex-persist)
[![codecov](https://codecov.io/gh/championswimmer/vuex-persist/branch/master/graph/badge.svg)](https://codecov.io/gh/championswimmer/vuex-persist)

**Sizes :**
[![npm:size:gzip](https://img.shields.io/bundlephobia/minzip/vuex-persist.svg?label=npm:size:gzip)](https://bundlephobia.com/result?p=vuex-persist)
[![umd:min:gzip](https://img.badgesize.io/https://unpkg.com/vuex-persist?compression=gzip&label=umd:min:gzip)](https://unpkg.com/vuex-persist)
[![umd:min:brotli](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/vuex-persist?compression=brotli&label=umd:min:brotli)](https://cdn.jsdelivr.net/npm/vuex-persist)

#### Table of Contents

- [State management](#state-management)
  - [config](#config)
  - [modules](#modules)
  - [plugins](#plugins)
    - [ormplugins](#ormplugins)
      - [Vuex ORM Plugin: LocalForage](#vuex-orm-plugin-localforage)
        - [Installation](#installation)
    - [lowdb plugins](#lowdb-plugins)
  - [index file](#index-file)
  - [Documentation](#documentation)
  - [Questions & Discussions](#questions--discussions)
  - [Examples](#examples)
  - [Quick Start](#quick-start)
    - [Install Vuex ORM](#install-vuex-orm)
    - [Create Models](#create-models)
    - [Register Models to the Vuex Store](#register-models-to-the-vuex-store)
    - [Inserting Records to the Vuex Store](#inserting-records-to-the-vuex-store)
    - [Accessing the Data](#accessing-the-data)
  - [Plugins](#plugins)
  - [Resources](#resources)
  - [Contribution](#contribution)
    - [Development](#development)
  - [Vuex Pathify](#vuex-pathify)
  - [Vuex comparison](#vuex-comparison)
  - [Summary](#summary)
    - [Next steps](#next-steps)
  - [vuex-class](#vuex-class)
  - [Dependencies](#dependencies)
  - [Installation](#installation-1)
  - [Example](#example)
  - [vuex-persist](#vuex-persist)
      - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Compatibility](#compatibility)
  - [Installation](#installation-2)
    - [Vue CLI Build Setup (using Webpack or some bundler)](#vue-cli-build-setup-using-webpack-or-some-bundler)
    - [Transpile for `target: es5`](#transpile-for-target-es5)
    - [Directly in Browser](#directly-in-browser)
    - [Tips for NUXT](#tips-for-nuxt)
  - [Usage](#usage)
    - [Steps](#steps)
    - [Constructor Parameters -](#constructor-parameters)
    - [Usage Notes](#usage-notes)
      - [Reducer](#reducer)
      - [Circular States](#circular-states)
  - [Examples](#examples-1)
    - [Simple](#simple)
    - [Detailed](#detailed)
    - [Support Strict Mode](#support-strict-mode)
    - [Note on LocalForage and async stores](#note-on-localforage-and-async-stores)
  - [Unit Testing](#unit-testing)
    - [Jest](#jest)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Features

- 📦 NEW in v1.5
  - distributed as esm and cjs both (via module field of package.json)
  - better tree shaking as a result of esm
- 🎗 NEW IN V1.0.0
  - Support localForage and other Promise based stores
  - Fix late restore of state for localStorage
- Automatically save store on mutation.
- Choose which mutations trigger store save, and which don't, using `filter` function
- Works perfectly with modules in store
- Ability to save partial store, using a `reducer` function
- Automatically restores store when app loads
- You can create mulitple VuexPersistence instances if you want to -
  - Save some parts of the store to localStorage, some to sessionStorage
  - Trigger saving to localStorage on data download, saving to cookies on authentication result

## Compatibility

- [VueJS](http://vuejs.org) - v2.0 and above
- [Vuex](http://vuex.vuejs.org) - v2.1 and above

## Installation

### Vue CLI Build Setup (using Webpack or some bundler)

```shell
npm install --save vuex-persist
```

or

```shell
yarn add vuex-persist
```

### Transpile for `target: es5`
This module is distributed in 3 formats

 - umd build `/dist/umd/index.js` in **es5** format
 - commonjs build `/dist/cjs/index.js` in **es2015** format
 - esm build `/dist/esm/index.js` in **es2015** format

When using with Webpack (or Vue CLI 3), the esm file gets used by default.
If your project has a `es6` or `es2015` target, you're good, but if
for backwards compatibility, you are compiling your project to `es5` then
this module also needs to be transpiled.

To enable transpilation of this module

```js
// in your vue.config.js
module.exports = {
  /* ... other config ... */
  transpileDependencies: ['vuex-persist']
}
```

### Directly in Browser

```html
<!-- We need lodash.merge so get lodash first -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuex-persist"></script>
```

### Tips for NUXT

This is a plugin that works [only on the client side](https://nuxtjs.org/guide/plugins/#client-side-only).
So we'll register it as a ssr-free plugin.

```js
// Inside - nuxt.config.js
export default {
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ]
}
```

```js
// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({store}) => {
    return new VuexPersistence({
        /* your options */
    }).plugin(store);
}
```

## Usage

### Steps

Import it

```js
import VuexPersistence from 'vuex-persist'
```

> NOTE: In browsers, you can directly use `window.VuexPersistence`

Create an object

```js
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
```

Use it as Vue plugin. (in typescript)

```typescript
const store = new Vuex.Store<State>({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  plugins: [vuexLocal.plugin]
})
```

(or in Javascript)

```js
const store = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  plugins: [vuexLocal.plugin]
}
```

### Constructor Parameters -

When creating the VuexPersistence object, we pass an `options` object
of type `PersistOptions`.
Here are the properties, and what they mean -

| Property        | Type                                   | Description                                                                                                                                                                          |
| --------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| key             | string                                 | The key to store the state in the storage <br>_**Default: 'vuex'**_                                                                                                                  |
| storage         | Storage (Web API)                      | localStorage, sessionStorage, localforage or your custom Storage object. <br>Must implement getItem, setItem, clear etc. <br> _**Default: window.localStorage**_                     |
| saveState       | function<br> (key, state[, storage])   | If not using storage, this custom function handles <br>saving state to persistence                                                                                                   |
| restoreState    | function<br> (key[, storage]) => state | If not using storage, this custom function handles <br>retrieving state from storage                                                                                                 |
| reducer         | function<br> (state) => object         | State reducer. reduces state to only those values you want to save. <br>By default, saves entire state                                                                               |
| filter          | function<br> (mutation) => boolean     | Mutation filter. Look at `mutation.type` and return true <br>for only those ones which you want a persistence write to be triggered for. <br> Default returns true for all mutations |
| modules         | string[]                               | List of modules you want to persist. (Do not write your own reducer if you want to use this)                                                                                         |
| asyncStorage    | boolean                                | Denotes if the store uses Promises (like localforage) or not <br>_**Default: false**_                                                                                                |
| supportCircular | boolean                                | Denotes if the state has any circular references to itself (state.x === state)                                                                                                       |

### Usage Notes

#### Reducer

Your reducer should not change the shape of the state.

```javascript
const persist = new VuexPersistence({
  reducer: (state) => state.products,
  ...
})
```

Above code is **wrong**
You intend to do this instead

```js
const persist = new VuexPersistence({
  reducer: (state) => ({products: state.products}),
  ...
})
```

#### Circular States

If you have circular structures in your state

```js
let x = { a: 10 }
x.x = x
x.x === x.x.x // true
x.x.x.a === x.x.x.x.a //true
```

`JSON.parse()` and `JSON.stringify()` will not work.
You'll need to install `circular-json`

```
npm install circular-json
```

And when constructing the store, add `supportCircular` flag

```js
new VuexPersistence({
  supportCircular: true,
  ...
})
```

## Examples

### Simple

Quick example -

```typescript
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const store = new Vuex.Store<State>({
  state: {
    user: { name: 'Arnav' },
    navigation: { path: '/home' }
  },
  plugins: [new VuexPersistence().plugin]
})

export default store
```

### Detailed

Here is an example store that has 2 modules, `user` and `navigation`
We are going to save user details into a Cookie _(using js-cookie)_
And, we will save the navigation state into _localStorage_ whenever
a new item is added to nav items.
So you can use multiple VuexPersistence instances to store different
parts of your Vuex store into different storage providers.

**Warning:** when working with modules these should be registered in
the Vuex constructor. When using `store.registerModule` you risk the
(restored) persisted state being overwritten with the default state
defined in the module itself.

```typescript
import Vue from 'vue'
import Vuex, { Payload, Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'
import { module as userModule, UserState } from './user'
import navModule, { NavigationState } from './navigation'

export interface State {
  user: UserState
  navigation: NavigationState
}

Vue.use(Vuex)

const vuexCookie = new VuexPersistence<State, Payload>({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) =>
    Cookies.set(key, state, {
      expires: 3
    }),
  modules: ['user'], //only save user module
  filter: (mutation) => mutation.type == 'logIn' || mutation.type == 'logOut'
})
const vuexLocal = new VuexPersistence<State, Payload>({
  storage: window.localStorage,
  reducer: (state) => ({ navigation: state.navigation }), //only save navigation module
  filter: (mutation) => mutation.type == 'addNavItem'
})

const store = new Vuex.Store<State>({
  modules: {
    user: userModule,
    navigation: navModule
  },
  plugins: [vuexCookie.plugin, vuexLocal.plugin]
})

export default store
```

### Support Strict Mode

This now supports [Vuex strict mode](https://vuex.vuejs.org/en/strict.html)
(Keep in mind, **NOT** to use strict mode in production)
In strict mode, we cannot use `store.replaceState` so instead we use a mutation

You'll need to keep in mind to add the **`RESTORE_MUTATION`** to your mutations
See example below

To configure with strict mode support -

```typescript
import Vue from 'vue'
import Vuex, { Payload, Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexPersist = new VuexPersistence<any, any>({
  strictMode: true, // This **MUST** be set to true
  storage: localStorage,
  reducer: (state) => ({ dog: state.dog }),
  filter: (mutation) => mutation.type === 'dogBark'
})

const store = new Vuex.Store<State>({
  strict: true, // This makes the Vuex store strict
  state: {
    user: {
      name: 'Arnav'
    },
    foo: {
      bar: 'baz'
    }
  },
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: [vuexPersist.plugin]
})
```

Some of the most popular ways to persist your store would be -

- **[js-cookie](https://npmjs.com/js-cookie)** to use browser Cookies
- **window.localStorage** (remains, across PC reboots, untill you clear browser data)
- **window.sessionStorage** (vanishes when you close browser tab)
- **[localForage](http://npmjs.com/localForage)** Uses IndexedDB from the browser

### Note on LocalForage and async stores

There is Window.Storage API as defined by HTML5 DOM specs, which implements the following -

```typescript
interface Storage {
  readonly length: number
  clear(): void
  getItem(key: string): string | null
  key(index: number): string | null
  removeItem(key: string): void
  setItem(key: string, data: string): void
  [key: string]: any
  [index: number]: string
}
```

As you can see it is an entirely synchronous storage. Also note that it
saves only string values. Thus objects are stringified and stored.

Now note the representative interface of Local Forage -

```typescript
export interface LocalForage {
  getItem<T>(key: string): Promise<T>
  setItem<T>(key: string, data: T): Promise<T>
  removeItem(key: string): Promise<void>
  clear(): Promise<void>
  length(): Promise<number>
  key(keyIndex: number): Promise<string>
  _config?: {
    name: string
  }
}
```

You can note 2 differences here -

1. All functions are asynchronous with Promises (because WebSQL and IndexedDB are async)
2. It works on objects too (not just strings)

I have made `vuex-persist` compatible with both types of storages, but this comes
at a slight cost.
When using asynchronous (promise-based) storages, your state will **not** be
immediately restored into vuex from localForage. It will go into the event loop
and will finish when the JS thread is empty. This can invoke a delay of few seconds.
[Issue #15](https://github.com/championswimmer/vuex-persist/issues/15) of this repository explains
what you can do to _find out_ when store has restored.

## Unit Testing

### Jest

When testing with Jest, you might find this error -

```
TypeError: Cannot read property 'getItem' of undefined
```

This is because there is no localStorage in Jest. You can add the following Jest plugins to solve this
https://www.npmjs.com/package/jest-localstorage-mock
