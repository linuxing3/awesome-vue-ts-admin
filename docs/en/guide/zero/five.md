# Linting & formatting

- [Linting & formatting](#linting--formatting)
  - [Languages](#languages)
  - [Scripts](#scripts)
    - [Terminal](#terminal)
    - [Pre-commit](#pre-commit)
    - [Editor](#editor)
    - [Generator](#generator)
      - [Features](#features)
      - [Templates helpers](#templates-helpers)
        - [inflection.js](#inflectionjs)
        - [change-case.js](#change-casejs)
  - [Configuration](#configuration)
  - [Configuration Eslint with standard](#configuration-eslint-with-standard)
    - [Install](#install)
    - [Usage](#usage)
  - [FAQ](#faq)

This project uses ESLint and Prettier to catch errors and avoid bikeshedding by enforcing a common code style.
Of course if you prefer Stylelint, Markdownlint, you may install them.

## Languages

- **JavaScript** is linted by ESLint and formatted by Prettier
- **HTML** (in templates and JSX) is linted by ESLint
- **CSS** is linted by Stylelint and formatted by Prettier
- **Markdown** is linted by Markdownlint and formatted by Prettier
- **JSON** is formatted by Prettier
- **Images** are minified by `imagemin-lint-staged` (only on pre-commit)

## Scripts

There are a few different contexts in which the linters run.

### Terminal

```bash
# Lint all files, fixing many violations automatically
yarn lint
yarn lint:ts
```

See `package.json` to update.

### Pre-commit

Staged files can be automatically linted and tested before each commit. See `lint-staged.config.js` to update.

I prefer `lintOnSave`.

### Editor

In supported editors, all files will be linted and formatted on-save.

### Generator

**NOTE**: Hygen 2.0 is our fastest release yet! Migrating from inquirer to enquirer yields 5x performance improvement. This comes at the cost of breaking compatibility for prompts (unless you use the new compat layer).

#### Features

✅ Build ad-hoc generators quickly and full on project scaffolds.  
✅ Local generators per project (and global, if you must)  
✅ Built-in scaffolds to quickly create generators  
✅ Full logic templates and rendering  
✅ Prompts and flows for taking in arguments  
✅ Automatic CLI arguments  
✅ Adding new files  
✅ Injecting into existing files  
✅ Running shell commands  
✅ Super fast, constantly optimized for speed

Go to the [documentation](http://www.hygen.io/quick-start) to get to know the rest of Hygen and generators.

If you're in a hurry:

- To learn how to edit generator templates, [look here](http://www.hygen.io/templates)
- To see how to use generators [look here](http://www.hygen.io/generators)
- Take a look at the [ecosystem](http://www.hygen.io/packages) and tooling built around Hygen.

#### Templates helpers

##### inflection.js

- inflection.indexOf( arr, item, from_index, compare_func );
- inflection.pluralize( 'Hat' ); // === 'Hats'
- inflection.singularize( 'Hats' ); // === 'Hat'
- inflection.inflect( str, count, singular, plural );
- inflection.camelize( 'message_properties' ); // === 'MssageProperties'
- inflection.underscore( 'messageProperties' ); // === 'mssage_properties'
- inflection.humanize( 'message_properties' ); // === 'Message prperties'
- inflection.capitalize( 'message_properties' ); // === 'Mssage_properties'
- inflection.capitalize( 'message properties', true ); // === 'Mssage properties'
- inflection.dasherize( 'Message Properties' ); // === 'Mssage-Properties'
- inflection.titleize( 'message_properties' ); // === 'Message Prperties'
- inflection.demodulize( 'Message::Bus::Properties' ); // === 'Poperties'
- inflection.tableize( 'MessageBusProperty' ); // === 'mssage_bus_properties'
- inflection.classify( 'message_bus_properties' ); // === 'MssageBusProperty'
- inflection.foreign_key( 'MessageBusProperty' ); // === 'mssage_bus_property_id'
- inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'
- inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'

##### change-case.js

- [`camel`](#camelCase) //=> "testString"
- [`pascal`](#PascalCase) //=> "TestString"
- [`param`](#param-case) //=> "test-string"
- [`snake`](#snake_case) //=> "test_string"
- [`constant`](#CONSTANT_CASE) //=> "TEST_STRING"
- [`title`](#Title Case) //=> "A Simple Test"
- [`sentence`](#sentence case) //=> "Test string"
- [`dot`](#dot.case) //=> "test.string"
- [`header`](#Header-Case) //=> "Test-String"
- [`path`](#path/case) //=> "test/string"
- [`swap`](#swapcase) // Test String => "tEST sTRING"
- [`ucFirst`](#Uppercasefirst) //=> "Test"
- [`lcFirst`](#lOWERCASEFIRST) //=> "tEST"
- [`upper`](#UPPERCASE) //=> "TEST STRING"
- [`lower`](#lowercase) //=> "test string"
- [`isUpper`](#isuppercase)
- [`isLower`](#islowercase)
- [`no`](#nocase) //=> "test string"

## Configuration

This boilerplate ships with opinionated defaults, but you can edit each tools configuration in the following config files:

- [ESLint](https://eslint.org/docs/user-guide/configuring)
  - `.eslintrc.js`
  - `.eslintignore`
- [Stylelint](https://stylelint.io/user-guide/configuration/)
  - `stylelint.config.js`
- [Markdownlint](https://github.com/markdownlint/markdownlint/blob/master/docs/configuration.md)
  - `.markdownlintrc`
- [Prettier](https://prettier.io/docs/en/configuration.html)
  - `.prettierrc.js`
  - `.prettierignore`

## Configuration Eslint with standard

ESLint [Shareable Config](http://eslint.org/docs/developer-guide/shareable-configs) for [JavaScript Standard Style](http://standardjs.com)

[![JavaScript Style Guide - Standard Style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

### Install

This module is for advanced users. You probably want to use [`standard`](http://standardjs.com) instead :)

```bash
npm install eslint-config-standard
```

### Usage

Shareable configs are designed to work with the `extends` feature of `.eslintrc` files.
You can learn more about
[Shareable Configs](http://eslint.org/docs/developer-guide/shareable-configs) on the
official ESLint website.

**If you want to set up the config automatically**, follow these steps in your project directory:

1. `npx eslint --init`
2. Select "Use a popular style guide."
3. Select "Standard."
4. Select a config file format.
5. If prompted, confirm the installation of the necessary dependencies.

The above steps will automatically set up an ESLint configuration and install the necessary dependencies for you.

**If you want to set up the config manually**, run the following command:

```bash
npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```

Then, add this to your `.eslintrc` file:

```
{
  "extends": "standard"
}
```

_Note: We omitted the `eslint-config-` prefix since it is automatically assumed by ESLint._

You can override settings from the shareable config by adding them directly into your
`.eslintrc` file.

```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unreachable': 'off',
    'no-empty': 'warn',
    'no-trailing-spaces': 'error',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/valid-v-on': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/require-prop-type-constructor': 'off',
    'vue/no-unused-components': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/html-indent': [
      'warn',
      2,
      {
        attribute: 2,
        closeBracket: 1,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/max-attributes-per-line': [
      'warn',
      2,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/no-side-effects-in-computed-properties': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
```

## FAQ

**So many configuration files! Why not move more of this to `package.json`?**

- Moving all possible configs to `package.json` can make it _really_ packed, so that quickly navigating to a specific config becomes difficult.
- When split out into their own file, many tools provide the option of exporting a config from JS. I do this wherever possible, because dynamic configurations are simply more powerful, able to respond to environment variables and much more.
