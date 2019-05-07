<script>
import {getRoute, RouterLink, RouterView} from 'vue-router'

const route = getRoute()

</script>

<div class="nested-parent-other">
  <h3>quy</h3>
  <pre>{ JSON.stringify(Object.keys($route.params)) }</pre>
</div>
