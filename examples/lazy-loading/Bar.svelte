<script>
import {RouterView} from '@svel/router'

let msg = 'This is Bar!' 
</script>

<div>
  <h2>{ msg }</h2>
  <p>I am lazy-loaded. (check out the Networks tab in Chrome devtools)</p>
  <RouterView></RouterView>
</div>
