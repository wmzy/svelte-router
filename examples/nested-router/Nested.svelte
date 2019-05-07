<script>
import {AbstractRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'

const router = new AbstractRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
});

let route = router.currentRoute;
router.listen(r => route = r)

</script>

<RouterProvider {router}>
  <div class="child">
    <p>Child router path: { route.fullPath }</p>
    <ul>
      <li><RouterLink to="/foo">/foo</RouterLink></li>
      <li><RouterLink to="/bar">/bar</RouterLink></li>
    </ul>
    <RouterView/>
  </div>
</RouterProvider>