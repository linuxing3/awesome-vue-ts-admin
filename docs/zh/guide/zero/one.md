# State management

- [Modules](#modules)
- [Plugins](#plugins)
- [Index](#index file)

## modules

The `src/store/modules` directory is where all shared application state lives. Any JS file added here (apart from unit tests) will be automatically registered in the store as a [namespaced module](https://vuex.vuejs.org/en/modules.html#namespacing).

Read more in the [Vuex modules](https://vuex.vuejs.org/en/modules.html) docs.

If you use the `vuex-nedb-module-generator`, you may have modules defined like
following pattern.

```javascript
import { ActionContext } from "vuex";
import { make } from "vuex-pathify";
import bcrypt from "bcryptjs";

import { LowdbForElectron } from "@/api/lowdb";
const DB: LowdbForElectron = new LowdbForElectron("account");

const state = {
  name: "account",
  items: [],
  cached: [],
  currentItem: {},
  status: false,
  filter: {
    search: "",
    sort: "",
  },
  token: {
    secret: "daniel",
    simpleToken: "",
    netlifyToken: "",
    firebaseToken: "",
  },
};

const mutations: any = {
  ...make.mutations(state),
  CACHE_ACCOUNT(state, newAccount) {
    state.cached.push(newAccount);
  },
};

const AccountActions = {
  async signup(ctx: ActionContext<any, any>, signupData) {
    // if exists, return
    }
  },
  async signin(ctx: ActionContext<any, any>, authData) {
    ctx.commit("SET_STATUS", true);
    ctx.commit("SET_TOKEN", {
      ...ctx.state.token,
      ...{
        simpleToken: authData.id,
      },
    });
  },
  // Logs out the current user.
  logout({ commit }) {
    commit("SET_CURRENT_ITEM", null);
  },
};

const actions: any = {
  ...make.actions(state),
  ...AccountActions,
};

const getters: any = { ...make.getters(state) };

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
