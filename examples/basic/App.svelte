<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'
import Unicode from '../views/Unicode.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/é', component: Unicode }
  ]
});

let n = 0;
let route = router.currentRoute;
router.listen(r => route = r)


function navigateAndIncrement () {
  const increment = () => n++
  route = router.currentRoute;
  if (router.currentRoute.path === '/') {
    router.push('/foo', increment)
  } else {
    router.push('/', increment)
  }
}
</script>
<RouterProvider {router}>
    <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/foo">/foo</RouterLink></li>
        <li><RouterLink to="/bar">/bar</RouterLink></li>
        <li><RouterLink to="/é">/é</RouterLink></li>
        <li><RouterLink to="/é?t=%25ñ">/é?t=%ñ</RouterLink></li>
        <li><RouterLink to="/é#%25ñ">/é#%25ñ</RouterLink></li>
      </ul>
      <button id="navigate-btn" on:click={navigateAndIncrement}>On Success</button>
      <pre id="counter">{ n }</pre>
      <pre id="query-t">{ route.query.t }</pre>
      <pre id="hash">{ route.hash }</pre>
      <div class="view"><RouterView /></div>
    </div>
</RouterProvider>