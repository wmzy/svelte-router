<script>
import {getRouter, getRoute, RouterLink, RouterView} from '@svel/router'
import auth from '../auth'

const router = getRouter();
const route = getRoute()
let email = 'joe@example.com';
let pass = '';
let error = false;

function login () {
  auth.login(email, pass, loggedIn => {
    if (!loggedIn) {
      error = true
    } else {
      $router.replace($route.query.redirect || '/')
    }
  })
}
</script>

<div>
  <h2>Login</h2>
  {#if $route.query.redirect}
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
  {/if}
  <form on:submit|preventDefault={login}>
    <label><input bind:value={email} placeholder="email"></label>
    <label><input bind:value={pass} placeholder="password" type="password"></label> (hint: password1)<br>
    <button type="submit">login</button>
    {#if error}
      <p class="error">Bad login information</p>
    {/if}
  </form>
</div>

<style>
.error {
  color: red;
}
</style>
