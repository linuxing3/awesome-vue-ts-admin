# Building and deploying to production

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


## From Appveyor

Update `Appveyor.yml` to automatically deploy to staging and/or production on a
successful build, which support `windows`.

See comments in that file for details.

## From Travis

Update `.travis.yml` to automatically deploy to staging and/or production on a
successful build, which support `mac` and `linux`.

See comments in that file for details.
