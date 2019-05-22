<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Foo from '../views/Foo.svelte'
import Bar from './Bar.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar }
  ]
});

let route = router.currentRoute
onDestroy(router.listen(r => (route = r)))

</script>
<RouterProvider {router}>
  <div id="app">
    <h1>Named Routes</h1>
    <p>Current route name: { route.name }</p>
    <ul>
      <li><RouterLink to={{ name: 'home' }}>home</RouterLink></li>
      <li><RouterLink to={{ name: 'foo' }}>foo</RouterLink></li>
      <li><RouterLink to={{ name: 'bar', params: { id: 123 }}}>bar</RouterLink></li>
    </ul>
    <div class="view">
      <RouterView />
    </div>
  </div>
</RouterProvider>