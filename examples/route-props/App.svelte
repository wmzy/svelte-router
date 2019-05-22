<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Hello from './Hello.svelte'

function dynamicPropsFn (route) {
  const now = new Date()
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }
}

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Hello }, // No props, no nothing
    { path: '/hello/:name', component: Hello, props: true }, // Pass route.params to props
    { path: '/static', component: Hello, props: { name: 'world' }}, // static values
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn }, // custom logic for mapping between route and props
    { path: '/attrs', component: Hello, props: { name: 'attrs' }}
  ]
});

</script>
<RouterProvider {router}>
  <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/hello/you">/hello/you</RouterLink></li>
        <li><RouterLink to="/static">/static</RouterLink></li>
        <li><RouterLink to="/dynamic/1">/dynamic/1</RouterLink></li>
        <li><RouterLink to="/attrs">/attrs</RouterLink></li>
      </ul>
      <div class="view">
        <RouterView foo="123"></RouterView>
      </div>
  </div>
</RouterProvider>