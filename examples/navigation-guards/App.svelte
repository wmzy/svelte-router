<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'
import Baz from './Baz.svelte'
import * as Qux from './Qux.svelte'
import Quux from './Quux.svelte'

/**
 * Signature of all route guards:
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 *
 * See http://router.vuejs.org/en/advanced/navigation-guards.html
 * for more details.
 */
function guardRoute (to, from, next) {
  if (window.confirm(`Navigate to ${to.path}?`)) {
    next()
  } else if (window.confirm(`Redirect to /baz?`)) {
    next('/baz')
  } else {
    next(false)
  }
}

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },

    // inline guard
    { path: '/foo', component: Foo, beforeEnter: guardRoute },

    // using meta properties on the route config
    // and check them in a global before hook
    { path: '/bar', component: Bar, meta: { needGuard: true }},

    // Baz implements an in-component beforeRouteLeave hook
    { path: '/baz', component: Baz },

    // Qux implements an in-component beforeRouteEnter hook
    { path: '/qux', component: Qux },

    // in-component beforeRouteEnter hook for async components
    { path: '/qux-async', component: resolve => {
      setTimeout(() => {
        resolve(Qux)
      }, 0)
    } },

    // in-component beforeRouteUpdate hook
    { path: '/quux/:id', component: Quux }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.needGuard)) {
    guardRoute(to, from, next)
  } else {
    next()
  }
})

</script>
<RouterProvider {router}>
  <div id="app">
      <h1>Navigation Guards</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/foo">/foo</RouterLink></li>
        <li><RouterLink to="/bar">/bar</RouterLink></li>
        <li><RouterLink to="/baz">/baz</RouterLink></li>
        <li><RouterLink to="/qux">/qux</RouterLink></li>
        <li><RouterLink to="/qux-async">/qux-async</RouterLink></li>
        <li><RouterLink to="/quux/1">/quux/1</RouterLink></li>
        <li><RouterLink to="/quux/2">/quux/2</RouterLink></li>
      </ul>
      <div class="view">
        <RouterView />
      </div>
  </div>
</RouterProvider>