<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import TheFoo from '../views/Foo.svelte'

const Foo = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(TheFoo), 10)
  })

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    // Just use them normally in the route config
    { path: '/async', component: Foo }
  ]
});

router.onReady(() => {
  router.push('/async')
})
</script>
<RouterProvider {router}>
    <div id="app">
      <h1>Async</h1>
      <div class="view"><RouterView /></div>
    </div>
</RouterProvider>