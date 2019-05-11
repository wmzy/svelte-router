<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Foo from '../views/Foo.svelte'
import Bar from './Bar.svelte'

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}

    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash

      // specify offset of the element
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }

      if (document.querySelector(to.hash)) {
        return position
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false
    }

    return new Promise(resolve => {
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // coords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }

      // wait for the out transition to complete (if necessary)
      this.app.$root.$once('triggerScroll', () => {
        // if the resolved position is falsy or an empty object,
        // will retain current scroll position.
        resolve(position)
      })
    })
  }
}

// todo: not support now
function afterLeave () {
  this.$root.$emit('triggerScroll')
}

const router = new HistoryRouter({
  base: __dirname,
  scrollBehavior,
  routes: [
    { path: '/', component: Home, meta: { scrollToTop: true }},
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar, meta: { scrollToTop: true }}
  ]
});
</script>
<RouterProvider {router}>
  <div id="app">
      <h1>Scroll Behavior</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/foo">/foo</RouterLink></li>
        <li><RouterLink to="/bar">/bar</RouterLink></li>
        <li><RouterLink to="/bar#anchor">/bar#anchor</RouterLink></li>
        <li><RouterLink to="/bar#anchor2">/bar#anchor2</RouterLink></li>
      </ul>
      <transition name="fade" mode="out-in" @after-leave="afterLeave">
        <RouterView class="view"></RouterView>
      </transition>
  </div>
</RouterProvider>