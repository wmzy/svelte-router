<script>
import {onDestroy} from 'svelte';
import {HistoryRouter, RouterProvider, RouterLink, RouterView} from '@svel/router'

const router = new HistoryRouter({
  base: __dirname,
  routes: [
    { path: '/' },
    // params are denoted with a colon ":"
    { path: '/params/:foo/:bar' },
    // a param can be made optional by adding "?"
    { path: '/optional-params/:foo?' },
    // a param can be followed by a regex pattern in parens
    // this route will only be matched if :id is all numbers
    { path: '/params-with-regex/:id(\\d+)' },
    // asterisk can match anything
    { path: '/asterisk/*' },
    // make part of the path optional by wrapping with parens and add "?"
    { path: '/optional-group/(foo/)?bar' }
  ]
});

let route = router.currentRoute;
onDestroy(router.listen(r => (route = r)))

</script>
<RouterProvider {router}>
  <div id="app">
      <h1>Route Matching</h1>
      <ul>
        <li><RouterLink to="/">/</RouterLink></li>
        <li><RouterLink to="/params/foo/bar">/params/foo/bar</RouterLink></li>
        <li><RouterLink to="/optional-params">/optional-params</RouterLink></li>
        <li><RouterLink to="/optional-params/foo">/optional-params/foo</RouterLink></li>
        <li><RouterLink to="/params-with-regex/123">/params-with-regex/123</RouterLink></li>
        <li><RouterLink to="/params-with-regex/abc">/params-with-regex/abc</RouterLink></li>
        <li><RouterLink to="/asterisk/foo">/asterisk/foo</RouterLink></li>
        <li><RouterLink to="/asterisk/foo/bar">/asterisk/foo/bar</RouterLink></li>
        <li><RouterLink to="/optional-group/bar">/optional-group/bar</RouterLink></li>
        <li><RouterLink to="/optional-group/foo/bar">/optional-group/foo/bar</RouterLink></li>
      </ul>
      <p>Route context</p>
      <pre>{ JSON.stringify(route, null, 2) }</pre>
  </div>
</RouterProvider>