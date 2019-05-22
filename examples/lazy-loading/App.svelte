<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Tag from './Tag.svelte'

// In Webpack we can use special require syntax to signify a "split point"
// Webpack will automatically split and lazy-load the split modules.
// - https://webpack.js.org/guides/code-splitting-require/

// Combine that with Vue's async components, we can easily make our route
// components lazy-loaded only when the given route is matched.

// async components are defined as:
// - resolve => resolve(Component)
// or
// - () => Promise<Component>

// For single component, we can simply use dynamic import which returns
// a Promise.
const Foo = () => import('./Foo.svelte')

// The import() syntax is a replacement for the deprecated System.import() and
// is specified at https://github.com/tc39/proposal-dynamic-import. Webpack 2
// supports using it to indicate a code-splitting point.
// Note: if using Babel you will need `babel-plugin-syntax-dynamic-import`.

// If using Webpack 1, you will have to use AMD syntax or require.ensure:
// const Foo = resolve => require(['./Foo.svelte'], resolve)

// If you want to group a number of components that belong to the same
// nested route in the same async chunk, you can use a special comment
// to indicate a chunk name for the imported module. (note this requires
// webpack 2.4.0+)
const Bar = () => import(/* webpackChunkName: "bar" */ './Bar.svelte')
const Baz = () => import(/* webpackChunkName: "bar" */ './Baz.svelte')

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    // Just use them normally in the route config
    { path: '/foo', component: Foo },
    // mulitple parameters, `/` should not be encoded. The name is also important
    // https://github.com/vuejs/vue-router/issues/2719
    { path: '/a/:tags*', name: 'tagged', component: () => new Promise(resolve => {
      setTimeout(() => resolve(Tag), 200)
    }) },
    // Bar and Baz belong to the same root route
    // and grouped in the same async chunk.
    { path: '/bar', component: Bar,
      children: [
        { path: 'baz', component: Baz }
      ]
    }
  ]
});
</script>
<RouterProvider {router}>
    <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/foo">/foo</RouterLink></li>
        <li><RouterLink to="/bar">/bar</RouterLink></li>
        <li><RouterLink to="/bar/baz">/bar/baz</RouterLink></li>
        <li><RouterLink to="/a/b/c">/a/b/c</RouterLink></li>
      </ul>
      <div class="view"><RouterView /></div>
    </div>
</RouterProvider>