# 新增页面

这里的『页面』指配置了路由，能够通过链接直接访问的模块，要新建一个页面，通常只需要在脚手架的基础上进行简单的配置。

# 一、新增 `tsx` 文件

+ 新增页面
 
在 `src/views` 下新建页面的`index.tsx`文件，如果相关页面有多个，可以新建一个文件夹来放置相关文件。

+ 引用样式文件
+ 
样式文件默认使用 `LESS`，如果需要，你可以在`tsx`文件头部引入`less`文件：

# 二、将文件加入菜单和路由

加入菜单和路由的方式请参照 `路由和菜单` - `添加路由/菜单` 中的介绍完成。加好后，访问 `http://localhost:8080/new` 就可以看到新增的页面了。


# 三、新增 model

为方便管理，在`src/modeles/index.ts` 中引用 `src/store/modules/pages` 下所有的 `model`和`module`。

```javascript
const requiredModels: RequireContext = require.context(
  '../store/modules/pages',
  true,
  /.*\/models\/.*\.ts$/,
);
const models: Models = {};

requiredModels.keys().forEach((fileName: string) => {
  const fileNameMeta = last(tail(fileName.split('/'))) as string;
  const modelName = lowerFirst(fileNameMeta.replace(/(\.\/|\.ts)/g, ''));
  models[modelName] = requiredModels(fileName).default;
});

export default models;
```

布局及路由都配置好之后，回到之前新建的 `newPage.tsx`，可以开始写业务代码了！

如果需要用到 `vuex` 中的数据流，还需要在 `src/modeles` 或 `src/store/modules/pages` 中建立相应的 `model`和`module`。

# 四、自动生成模板

为方便自动创建页面和模型，使用`hygen`进行自动生成。

```bash
$ yarn gen model
$ yarn gen component
```

主要执行以下自动化操作：

+ 将在 `src/store/modules/pages` 下生成对应的 `model`和`module`。

+ 将在 `src/views` 下生成对应的 `page/index.tsx`，并在其中生成`form.tsx`和`table.tsx`两个基础组件。

+ 将在 `src/router/index.ts` 中生成对应的路由。