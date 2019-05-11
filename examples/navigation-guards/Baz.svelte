<script>
import {getRoute} from '@svel/router'
const route = getRoute();
let saved = false;

// not support now
export function beforeRouteLeave (to, from, next) {
  if (saved || window.confirm('Not saved, are you sure you want to navigate away?')) {
    next()
  } else {
    next(false)
  }
}
</script>

<div>
    <p>baz ({ saved ? 'saved' : 'not saved' })</p>
    <button on:click={() => saved = true}>save</button>
</div>
