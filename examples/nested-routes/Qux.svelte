<script>
import {RouterLink, RouterView} from 'vue-router'

</script>

<div class="nested-parent">
  <h3>qux</h3>
  <RouterLink to={ {name: 'quux'} }>/quux</RouterLink>
  <RouterView class="nested-child"></RouterView>
</div>
