# Building and deploying to production

- [Building and deploying to production](#building-and-deploying-to-production)
  - [From the terminal](#from-the-terminal)
    - [Electron-builder](#electron-builder)
      - [`background.ts` as main file](#backgroundts-as-main-file)
      - [pages](#pages)
      - [sourcemaps](#sourcemaps)
      - [i18n](#i18n)
  - [From Circle CI](#from-circle-ci)
  - [From Appveyor](#from-appveyor)
  - [From Travis](#from-travis)

## From the terminal

```bash
# Build for production with minification
yarn build
# Build for production with electron
yarn electron:build
# Or shortend
yarn dist
```

This results in your compiled application in a `dist` directory.

And the `electron` application will be in `dist_electron` directory.

### Electron-builder

#### `background.ts` as main file

```ts
function createWindows(winVar, devPath, prodPath) {
  winVar = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    winVar.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
    if (!process.env.IS_TEST) winVar.webContents.openDevTools();
  } else {
    if (!createdAppProtocol) {
      createProtocol('app');
      createdAppProtocol = true;
    }
    winVar.loadURL(`app://./${prodPath}`);
  }

  winVar.on('closed', () => {
    winVar = null;
  });
}
```

#### pages

```js
const pages = {
  index: {
    entry: 'src/main.ts',
    template: 'public/index.html',
    filename: 'index.html',
    // title: 'Index Page',
    chunks: ['chunk-vendors', 'chunk-common', 'index'],
  },
  playpage: {
    entry: 'src/playpage/main.ts',
    template: 'public/playpage.html',
    filename: 'playpage.html',
    title: 'Play Page',
    chunks: ['chunk-vendors', 'chunk-common', 'playpage'],
  },
};
```

#### sourcemaps

```js
  configureWebpack: {
    devtool: 'source-map',
  },
```

#### i18n

```js
const i18n = {
  locale: 'cn',
  fallbackLocale: 'en',
  localeDir: 'locales',
  enableInSFC: true,
};
```

## From Circle CI

Update `.circleci/config.yml` to automatically deploy to staging and/or
production on a successful build, which support `mac` and `linux`.

See comments in that file for details.


## From Appveyor

Update `Appveyor.yml` to automatically deploy to staging and/or production on a
successful build, which support `windows`.

See comments in that file for details.

## From Travis

Update `.travis.yml` to automatically deploy to staging and/or production on a
successful build, which support `mac` and `linux`.

See comments in that file for details.
