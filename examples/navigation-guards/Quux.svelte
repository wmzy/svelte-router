<script>
import {getRoute} from '@svel/router'
const route = getRoute();
let prevId = 0

// not support now
export function beforeRouteUpdate (to, from, next) {
  prevId = from.params.id;
  next()
}
</script>

<div>id:{ $route.params.id } prevId:{ prevId }</div>
