<script>
import {getRoute} from '@svel/router'
const route = getRoute();
</script>
<div>This is Bar { $route.params.id }</div>
