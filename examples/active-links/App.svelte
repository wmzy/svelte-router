<script>
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'
import Home from '../views/Home.svelte'
import About from '../views/About.svelte'
import Users from './Users.svelte'
import User from './User.svelte'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/users', component: Users,
      children: [
        { path: ':username', name: 'user', component: User }
      ]
    }
  ]
});
</script>

<RouterProvider {router}>
  <div id="app">
    <h1>Active Links</h1>
    <ul>
      <li><RouterLink to="/">/</RouterLink></li>
      <li><RouterLink to="/" exact>/ (exact match)</RouterLink></li>

      <li><RouterLink to="/users">/users</RouterLink></li>
      <li><RouterLink to="/users" exact>/users (exact match)</RouterLink></li>

      <li><RouterLink to="/users/evan">/users/evan</RouterLink></li>
      <li><RouterLink to="/users/evan#foo">/users/evan#foo</RouterLink></li>
      <li>
        <RouterLink to={{ path: '/users/evan', query: { foo: 'bar' }}}>
          /users/evan?foo=bar
        </RouterLink>
      </li>
      <li><!-- #635 -->
        <RouterLink to={{ name: 'user', params: { username: 'evan' }, query: { foo: 'bar' }}} exact>
          /users/evan?foo=bar (named view + exact match)
        </RouterLink>
      </li>
      <li>
        <RouterLink to={{ path: '/users/evan', query: { foo: 'bar', baz: 'qux' }}}>
          /users/evan?foo=bar&baz=qux
        </RouterLink>
      </li>

      <li><RouterLink to="/about">/about</RouterLink></li>

      <RouterLink tag="li" to="/about">
        <a>/about (active class on outer element)</a>
      </RouterLink>
    </ul>
    <RouterView class="view"></RouterView>
  </div>
</RouterProvider>