# svelte-router [![Build Status](https://img.shields.io/circleci/project/github/wmzy/svelte-router/dev.svg)](https://circleci.com/gh/wmzy/svelte-router)

> This is svelte-router which works only with svelte 3.0. 

### Introduction

`svelte-router` is a router for [svelte.js](http://svelte.dev). It was forked from [vue-router](https://github.com/vuejs/vue-router).And has the similar APIs and features:

- Nested route/view mapping
- Modular, component-based router configuration
- Route params, query, wildcards
- View transition effects powered by svelte.js' transition system
- Fine-grained navigation control (in-component-guards is not support now)
- Links with automatic active CSS classes
- HTML5 history mode or hash mode, with <del>auto-</del>fallback in IE9
- Customizable Scroll Behavior

Get started with the [vue-router documentation](http://router.vuejs.org), or play with the [examples](https://github.com/wmzy/svelte-router/tree/dev/examples) (see how to run them below).

### Install

```bash
npm i @svel/router
```
### Usage

```html
<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'

const router = new HistoryRouter({
  base: '/',
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
});
</script>

<RouterProvider {router}>
  <div id="app">
    <h1>Svelte Router</h1>
    <ul>
      <li><RouterLink to="/">/</RouterLink></li>
      <li><RouterLink to="/foo">/foo</RouterLink></li>
      <li><RouterLink to="/bar">/bar</RouterLink></li>
    </ul>
    <RouterView />
  </div>
</RouterProvider>
```

### Development Setup

``` bash
# install deps
npm install

# build dist files
npm run build

# serve examples at localhost:8080
npm run dev

# lint & run all tests
npm test

# serve docs at localhost:8080
npm run docs
```

## Releasing

- `yarn run release`
  - Ensure tests are passing `yarn run test`
  - Build dist files `VERSION=<the_version> yarn run build`
  - Build changelog `yarn run changelod`
  - Commit dist files `git add dist CHANGELOG.md && git commit -m "[build $VERSION]"`
  - Publish a new version `npm version $VERSION --message "[release] $VERSION"
  - Push tags `git push origin refs/tags/v$VERSION && git push`
  - Publish to npm `npm publish`

## Contribution

Please make sure to read the [Contributing Guide](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md) before making a pull request.

## Changelog

Details changes for each release are documented in the [release notes](https://github.com/wmzy/svelte-router/releases).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013-present Evan You
