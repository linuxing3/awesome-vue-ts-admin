# awesome-manager

## First-time setup

Make sure you have the following installed:

- [Node](https://nodejs.org/en/) (at least the latest LTS)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) (at least 1.0)

Then update the following files to suit your application:

- `.circleci/config.yml` (assuming you want to automatically with continuous integration)

## Installation

```bash
# Install dependencies from package.json
yarn install
```

## Dev server

> Note: If you're on Linux and see an `ENOSPC` error when running the commands below, you must [increase the number of available file watchers](https://stackoverflow.com/questions/22475849/node-js-error-enospc#answer-32600959).

```bash
# Launch the dev server
yarn dev
yarn electron:serve
```

## Generators

This project includes generators to speed up common development tasks. Commands include:

```bash
# Generate a new Vuex/orm model and module with adjacent unit test
yarn gen model

# Generate a new table, form, view component with adjacent unit test
yarn gen component

# Generate a new route and view component with adjacent unit test
yarn gen router
```

Update existing or create new generators in the `_templates` folder, with help from the [Hygen docs](http://www.hygen.io/).

See more from [Generators](five.md)

## Aliases

To simplify referencing local modules and refactoring, you can set aliases to be shared between dev and unit tests in `aliases.config.js`. As a convention, this project uses an `@` prefix to denote aliases.

## Globals

### Base components

[Base components](https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended) (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions. Since these components are typically used in place of raw HTML element (and thus used as frequently), they're automatically globally registered for convenience. This means you don't have to import and locally register them to use them in templates.

All components under `components/helpers` folder will be included by the context.
