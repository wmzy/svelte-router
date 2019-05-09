<script>
import {RouterProvider, RouterView} from '@svel/router'
import router from './router'

let route = router.currentRoute

router.listen(r => (route = r))
</script>

<RouterProvider {router}>
  <RouterView class="view"></RouterView>
  $route.path value: <span class="snippet">{ route.path }</span>
</RouterProvider>
