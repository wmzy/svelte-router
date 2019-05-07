<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'
import Nested from './Nested.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/nested-router', component: Nested },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
});

let route = router.currentRoute;
router.listen(r => route = r)
</script>

<RouterProvider {router}>
    <div id="app">
      <h1>Nested Routers</h1>
      <p>Root router path: { route.fullPath }</p>
      <ul>
        <li><RouterLink to="/nested-router">/nested-router</RouterLink></li>
        <li><RouterLink to="/foo">/foo</RouterLink></li>
        <li><RouterLink to="/bar">/bar</RouterLink></li>
      </ul>
      <RouterView class="view"></RouterView>
    </div>
</RouterProvider>