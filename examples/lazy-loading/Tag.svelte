<script>
import {getRoute} from '@svel/router'

const route = getRoute()
</script>

<div>
  <h2>Lazy with params</h2>
  <pre id="tagged-path">{ $route.path }</pre>
</div>
