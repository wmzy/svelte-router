<script>
import {HashRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'
import Unicode from './Unicode.svelte'

const router = new HashRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/é', component: Unicode },
    { path: '/é/:unicode', component: Unicode }
  ]
});

let route = router.currentRoute;
router.listen(r => route = r)
</script>
<RouterProvider {router}>
    <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/foo">/foo</RouterLink></li>
        <li><RouterLink to="/bar">/bar</RouterLink></li>
        <li><RouterLink to="/é">/é</RouterLink></li>
        <li><RouterLink to="/é/ñ">/é/ñ</RouterLink></li>
        <li><RouterLink to="/é/ñ?t=%25ñ">/é/ñ?t=%ñ</RouterLink></li>
        <li><RouterLink to="/é/ñ#é">/é/ñ#é</RouterLink></li>
      </ul>
      <pre id="query-t">{ route.query.t }</pre>
      <pre id="hash">{ route.hash }</pre>
      <div class="view"><RouterView /></div>
    </div>
</RouterProvider>