<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Default from '../views/Default.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'
import Baz from '../views/Baz.svelte'
import FooBar from './FooBar.svelte'
import Foobar from './FooBar1.svelte'
import WithParams from './WithParams.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home,
      children: [
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar },
        { path: 'baz', name: 'baz', component: Baz },
        { path: 'with-params/:id', component: WithParams },
        // relative redirect to a sibling route
        { path: 'relative-redirect', redirect: 'foo' }
      ]
    },
    // absolute redirect
    { path: '/absolute-redirect', redirect: '/bar' },
    // dynamic redirect, note that the target route `to` is available for the redirect function
    { path: '/dynamic-redirect/:id?',
      redirect: to => {
        const { hash, params, query } = to
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      }
    },
    // named redirect
    { path: '/named-redirect', redirect: { name: 'baz' }},

    // redirect with params
    { path: '/redirect-with-params/:id', redirect: '/with-params/:id' },

    // redirect with caseSensitive
    { path: '/foobar', component: Foobar, caseSensitive: true },

    // redirect with pathToRegexpOptions
    { path: '/FooBar', component: FooBar, pathToRegexpOptions: { sensitive: true }},

    // catch all redirect
    { path: '*', redirect: '/' }
  ]
});

</script>
<RouterProvider {router}>
  <div id="app">
      <h1>Redirect</h1>
      <ul>
        <li><RouterLink to="/relative-redirect">
          /relative-redirect (redirects to /foo)
        </RouterLink></li>

        <li><RouterLink to="/relative-redirect?foo=bar">
          /relative-redirect?foo=bar (redirects to /foo?foo=bar)
        </RouterLink></li>

        <li><RouterLink to="/absolute-redirect">
          /absolute-redirect (redirects to /bar)
        </RouterLink></li>

        <li><RouterLink to="/dynamic-redirect">
          /dynamic-redirect (redirects to /bar)
        </RouterLink></li>

        <li><RouterLink to="/dynamic-redirect/123">
          /dynamic-redirect/123 (redirects to /with-params/123)
        </RouterLink></li>

        <li><RouterLink to="/dynamic-redirect?to=foo">
          /dynamic-redirect?to=foo (redirects to /foo)
        </RouterLink></li>

        <li><RouterLink to="/dynamic-redirect#baz">
          /dynamic-redirect#baz (redirects to /baz)
        </RouterLink></li>

        <li><RouterLink to="/named-redirect">
          /named-redirect (redirects to /baz)
        </RouterLink></li>

        <li><RouterLink to="/redirect-with-params/123">
          /redirect-with-params/123 (redirects to /with-params/123)
        </RouterLink></li>

        <li><RouterLink to="/foobar">
          /foobar
        </RouterLink></li>

        <li><RouterLink to="/FooBar">
          /FooBar
        </RouterLink></li>

        <li><RouterLink to="/not-found">
          /not-found (redirects to /)
        </RouterLink></li>
      </ul>
      <RouterView class="view"></RouterView>
  </div>
</RouterProvider>