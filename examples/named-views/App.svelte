<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'
import Baz from '../views/Baz.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
});

</script>
<RouterProvider {router}>
  <div id="app">
      <h1>Named Views</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/other">/other</RouterLink></li>
      </ul>
      <div class="view one"><RouterView /></div>
      <div class="view two"><RouterView name="a" /></div>
      <div class="view three"><RouterView name="b" /></div>
  </div>
</RouterProvider>