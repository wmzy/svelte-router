<script>
import {RouterProvider, RouterLink} from '@svel/router'
import router from './router'

let route = router.currentRoute

router.listen(r => (route = r))
</script>

<RouterProvider {router}>
  <ul>
    <li><RouterLink to="/">/</RouterLink></li>
    <li><RouterLink to="/foo">/foo</RouterLink></li>
    <li><RouterLink to="/bar">/bar</RouterLink></li>
  </ul>
  $route.path value: <span class="snippet">{ route.path }</span>
</RouterProvider>
