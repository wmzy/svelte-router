<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from './Home.svelte'
import Nested from './Nested.svelte'
import NestedFoo from './NestedFoo.svelte'
import Default from '../views/Default.svelte'
import Root from '../views/Root.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'
import Baz from '../views/Baz.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/root', component: Root, alias: '/root-alias' },
    { path: '/home', component: Home,
      children: [
        // absolute alias
        { path: 'foo', component: Foo, alias: '/foo' },
        // relative alias (alias to /home/bar-alias)
        { path: 'bar', component: Bar, alias: 'bar-alias' },
        // multiple aliases
        { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] },
        // default child route with empty string as alias.
        { path: 'default', component: Default, alias: '' },
        // nested alias
        { path: 'nested', component: Nested, alias: 'nested-alias',
          children: [
            { path: 'foo', component: NestedFoo }
          ]
        }
      ]
    }
  ]
});

</script>
<RouterProvider {router}>
  <div id="app">
      <h1>Route Alias</h1>
      <ul>
        <li><RouterLink to="/root-alias">
          /root-alias (renders /root)
        </RouterLink></li>

        <li><RouterLink to="/foo">
          /foo (renders /home/foo)
        </RouterLink></li>

        <li><RouterLink to="/home/bar-alias">
          /home/bar-alias (renders /home/bar)
        </RouterLink></li>

        <li><RouterLink to="/baz">
          /baz (renders /home/baz)
        </RouterLink></li>

        <li><RouterLink to="/home/baz-alias">
          /home/baz-alias (renders /home/baz)
        </RouterLink></li>

        <li><RouterLink to="/home">
          /home (renders /home/default)
        </RouterLink></li>

        <li><RouterLink to="/home/nested-alias/foo">
          /home/nested-alias/foo (renders /home/nested/foo)
        </RouterLink></li>
      </ul>
      <RouterView class="view"></RouterView>
  </div>
</RouterProvider>