<script>
import {getRoute} from '@svel/router'
const route = getRoute();
</script>

<div>{ $route.params.id }</div>
