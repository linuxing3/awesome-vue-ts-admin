# Storybook

## Install

Using `npx` to easily install the `storybook` with `vue`
```bash
npm i -g @storybook/cli 
npx -p @storybook/cli sb init
```

The following packages will be installed, as shown in `package.json`
```javascript
    "@storybook/addon-actions": "^5.0.3",
    "@storybook/addon-links": "^5.0.3",
    "@storybook/addon-storyshots": "^5.0.3",
    "@storybook/addons": "^5.0.3",
    "@storybook/vue": "^5.0.3",
```

## Config

```bash
```

### With `vuetify`

In the `plugins/vuetify.js`
```javascript
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)

```

In the `.storybook/config.js`
```javascript
import { configure } from '@storybook/vue'

import '../src/plugins/vuetify'   // <=== added this line

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.(j|t)s$/) // <=== added js ts support here
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

```
If you got errors, consider add `webpack.config.js` in the same directory

```javascript
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = async function({ config }) {
  config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html')

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      }
    ]
  })
  config.module.rules.push({
    test: /\.less$/,
    loaders: ['style-loader', 'css-loader', 'less-loader']
  })
  config.module.rules.push({
    test: /\.styl$/,
    loader: 'style-loader!css-loader!stylus-loader'
  })

  config.plugins.push(new ForkTsCheckerWebpackPlugin())

  return config
}
```
Basicly, this will modify the `webpack` configuration to work the `storybook`, with `ts-loader` to work with typescript and `stylus` and `less` support


## Serve

### Write your stories of vuetify

```javascript
import { storiesOf } from '@storybook/vue'
import { VApp, VContent } from 'vuetify/lib' // <-- add the import

import LoveButton from './LoveButton.vue'

import DatePickerDate from '../components/examples/date-pickers/datePickerDate.vue'

// add the decorator
const appDecorator = () => {
  return {
    components: { VApp, VContent },
    template: `
      <v-app>
        <div style="background-color: rgb(134, 212, 226); padding: 20px; width: 100%; height: 100%;">
          <v-content>
            <story/>
          </v-content>
        </div>
      </v-app>
    `
  }
}

storiesOf('LoveButton', module)
  .addDecorator(appDecorator) // <-- decorate the stories
  .add('default', () => ({
    components: { LoveButton },
    template: `<love-button love="Love vue & vuetify"/>`
  }))

storiesOf('DatePickerDate', module)
  .addDecorator(appDecorator) // <-- decorate the stories
  .add('default', () => ({
    components: { DatePickerDate },
    template: `<date-picker-date />`
  }))
```

If your got errors of `date-picker` not registered, please register it in the `plugins/vuetify.js`

This reason for that is the `date-picker` is not registered locally in the `Component` file

```javascript
import Vuetify, { VFlex, VLayout, VContainer, VImg, VDatePicker } from 'vuetify/lib'
```

## Build

## Test

In the `tests/unit/setup.ts`

```javascript
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'
registerRequireContextHook()
```

In the `jest.config.js`

```javascript
module.exports = {
  setupFiles: ['<rootDir>/tests/unit/setup.ts', '<rootDir>/tests/unit/store-setup.ts'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest' // <=== added this line 
  },
  transformIgnorePatterns: ['node_modules/(?!(vuetify/|@storybook/.*\\.vue$))'], // <=== added this line
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
}
```

In the `stories.spec.ts`, input this to start `snapshots` test

```javascript
import initStoryshots from '@storybook/addon-storyshots'
initStoryshots()
```
