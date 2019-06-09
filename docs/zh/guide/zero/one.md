# State management

- [State management](#state-management)
  - [modules](#modules)
  - [plugins](#plugins)
    - [ormplugins](#ormplugins)
  - [index file](#index-file)

## modules

The `src/store/modules` directory is where all shared application state lives. Any JS file added here (apart from unit tests) will be automatically registered in the store as a [namespaced module](https://vuex.vuejs.org/en/modules.html#namespacing).

Read more in the [Vuex modules](https://vuex.vuejs.org/en/modules.html) docs.

And the batch import helper is `src/store/modules/index.ts`, which use the
webpack `require.context` to automatically import all separate module files
under the directory.

NOTE:
 *  require.context is availabe after intalled `webpack-env` and in `tsconfig.json` must set `types: ['webpack-env']`

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

Since I use `vuex/orm`, I feed that it's easier to keep all persistence logic in
the query hooks, which when create, delete, update any `model`, the hook will
automatically save it to my `localforage indexdb` datastore file.

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
