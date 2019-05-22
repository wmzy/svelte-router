<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import Post from './Post.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/post/:id', component: Post }
  ]
})
</script>

<RouterProvider {router}>
  <div id="app">
      <h1>Data Fetching</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/post/1">/post/1</RouterLink></li>
        <li><RouterLink to="/post/2">/post/2</RouterLink></li>
        <li><RouterLink to="/post/3">/post/3</RouterLink></li>
      </ul>
      <div class="view"><RouterView /></div>
  </div>
</RouterProvider>
