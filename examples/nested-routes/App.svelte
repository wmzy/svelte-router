<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Default from '../views/Default.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'
import Baz from '../views/Baz.svelte'
import Parent from './Parent.svelte'
import Qux from './Qux.svelte'
import Quux from './Quux.svelte'
import Quy from './Quy.svelte'
import Quuy from './Quuy.svelte'
import Zap from './Zap.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', redirect: '/parent' },
    {
      path: '/parent',
      component: Parent,
      children: [
        // an empty path will be treated as the default, e.g.
        // components rendered at /parent: Root -> Parent -> Default
        { path: '', component: Default },

        // components rendered at /parent/foo: Root -> Parent -> Foo
        { path: 'foo', component: Foo },

        // components rendered at /parent/bar: Root -> Parent -> Bar
        { path: 'bar', component: Bar },

        // NOTE absolute path here!
        // this allows you to leverage the component nesting without being
        // limited to the nested URL.
        // components rendered at /baz: Root -> Parent -> Baz
        { path: '/baz', component: Baz },

        {
          path: 'qux/:quxId',
          component: Qux,
          children: [
            { path: 'quux', name: 'quux', component: Quux },
            { path: 'quuy', name: 'quuy', component: Quuy }
          ]
        },

        { path: 'quy/:quyId', component: Quy },

        { name: 'zap', path: 'zap/:zapId?', component: Zap }
      ]
    }
  ]
});

let route = router.currentRoute;
router.listen(r => route = r)
</script>

<RouterProvider {router}>
  <div id="app">
    <h1>Nested Routes</h1>
    <ul>
      <li><RouterLink to="/parent">/parent</RouterLink></li>
      <li><RouterLink to="/parent/foo">/parent/foo</RouterLink></li>
      <li><RouterLink to="/parent/bar">/parent/bar</RouterLink></li>
      <li><RouterLink to="/baz">/baz</RouterLink></li>
      <li><RouterLink to="/parent/qux/123">/parent/qux</RouterLink></li>
      <li><RouterLink to="/parent/quy/123">/parent/quy</RouterLink></li>
      <li><RouterLink to={{name: 'zap'}}>/parent/zap</RouterLink></li>
      <li><RouterLink to={{name: 'zap', params: {zapId: 1}}}>/parent/zap/1</RouterLink></li>
      <li><RouterLink to={{ params: { zapId: 2 }}}>{'{ params: { zapId: 2 }}'} (relative params)</RouterLink></li>
      <li><RouterLink to="/parent/qux/1/quux">/parent/qux/1/quux</RouterLink></li>
      <li><RouterLink to="/parent/qux/2/quux">/parent/qux/2/quux</RouterLink></li>
    </ul>
    <div class="view">
      <RouterView />
    </div>
  </div>
</RouterProvider>