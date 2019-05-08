<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import auth from './auth'
import About from '../views/About.svelte'
import Dashboard from '../views/Dashboard.svelte'
import Login from './Login.svelte'

let loggedIn = auth.loggedIn()

auth.onChange = loggedIn => {
  loggedIn = loggedIn
}

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/about', component: About },
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})
let route = router.currentRoute;
router.listen(r => (route = r))
</script>

<RouterProvider {router}>
  <div id="app">
    <h1>Auth Flow</h1>
    <ul>
      <li>
        {#if loggedIn}
          <RouterLink to="/logout">Log out</RouterLink>
        {:else}
          <RouterLink to="/login">Log in</RouterLink>
        {/if}
      </li>
      <li>
        <RouterLink to="/about">About</RouterLink>
      </li>
      <li>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        (authenticated)
      </li>
    </ul>
    {#if route.matched.length}
      <RouterView></RouterView>
    {:else}
      <p>You are logged { loggedIn ? 'in' : 'out' }</p>
    {/if}
  </div>
</RouterProvider>
