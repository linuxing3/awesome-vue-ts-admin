# Building and deploying to production

- [Building and deploying to production](#building-and-deploying-to-production)
  - [From the terminal](#from-the-terminal)
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

## From Circle CI

Update `.circleci/config.yml` to automatically deploy to staging and/or
production on a successful build, which support `mac` and `linux`.

See comments in that file for details.

```yml
# Javascript Node CircleCI 2.0 configuration file
#
# Check https://circleci.com/docs/2.0/language-javascript/ for more details
#
version: 2
jobs:
  build:
    docker:
      # specify the version you desire here
      - image: circleci/node:8.10

      # Specify service dependencies here if necessary
      # CircleCI maintains a library of pre-built images
      # documented at https://circleci.com/docs/2.0/circleci-images/
      # - image: circleci/mongo:3.4.4

    working_directory: ~/repo

    steps:
      - checkout

      # Download and cache dependencies
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package.json" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-
            - v1-electron-{{ checksum "package.json" }}

      - run: yarn install

      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}

      - save_cache:
          paths:
            - $HOME/.cache/electron
            - $HOME/.cache/electron-builder
          key: v1-electron-{{ checksum "package.json" }}

      # run tests!
      # - run: yarn test:unit
      - run: yarn electron:build
      - store_artifacts:
          path: ./dist_electron
```

## From Appveyor

Update `Appveyor.yml` to automatically deploy to staging and/or production on a
successful build, which support `windows`.

See comments in that file for details.

```yml
image:
  - Visual Studio 2017

platform:
  - x86

environment:
  APPVEYOR_RDP_PASSWORD:
  APPVEYOR_SSH_KEY:
  matrix:
    - nodejs_version: '10'
  GH_TOKEN:
    secure:
  ACCESS_TOKEN:
    secure:

init:
  - ps: iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/appveyor/ci/master/scripts/enable-rdp.ps1'))
  - sh: curl -sflL 'https://raw.githubusercontent.com/appveyor/ci/master/scripts/enable-ssh.sh' | bash -e -

install:
  - ps: Install-Product node $env:nodejs_version
  - npm install -g npm@latest
  - npm install -g yarn
  - set PATH=%APPDATA%\npm;%PATH%
  - npm install

matrix:
  fast_finish: true

shallow_clone: true

test_script:
  - yarn test:unit

cache:
  - node_modules
  - "%LOCALAPPDATA%\\Yarn"
  - '%APPDATA%\npm-cache'

build_script:
  - yarn lint
  - yarn electron:build

skip_tags: true

artifacts:
  - path: dist_electron\*.exe
    name: bin
```

## From Travis

Update `.travis.yml` to automatically deploy to staging and/or production on a
successful build, which support `mac` and `linux`.

See comments in that file for details.

```yml
osx_image: xcode8.3

dist: trusty
sudo: false

language: node_js
node_js: '8'

env:
  GH_TOKEN:
    secure:
  global:
    - ELECTRON_CACHE=$HOME/.cache/electron
    - ELECTRON_BUILDER_CACHE=$HOME/.cache/electron-builder

os:
  - linux
  - osx

cache:
  directories:
    - node_modules
    - $HOME/.cache/electron
    - $HOME/.cache/electron-builder
    - $HOME/.npm/_prebuilds

script:
  - npm run electron:build

deploy:
  provider: releases
  api_key:
    secure:
  file: dist_electron\*.dmg
  skip_cleanup: true
  on:
    tags: true

branches:
  only:
    - master
```
