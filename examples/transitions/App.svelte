<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Parent from './Parent.svelte'
import Home from '../views/Home.svelte'
import Default from '../views/Default.svelte'
import Foo from '../views/Foo.svelte'
import Bar from '../views/Bar.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/parent', component: Parent,
      children: [
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar }
      ]
    }
  ]
});

</script>
<RouterProvider {router}>
  <div id="app">
    <h1>Transitions</h1>
    <ul>
      <li><RouterLink to="/">/</RouterLink></li>
      <li><RouterLink to="/parent">/parent</RouterLink></li>
      <li><RouterLink to="/parent/foo">/parent/foo</RouterLink></li>
      <li><RouterLink to="/parent/bar">/parent/bar</RouterLink></li>
    </ul>
    <transition name="fade" mode="out-in">
      <RouterView class="view"></RouterView>
    </transition>
  </div>
</RouterProvider>