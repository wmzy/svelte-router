<script>
import {RouterView} from '@svel/router';

let transitionName = 'slide-left';

// todo: not support
export function beforeRouteUpdate (to, from, next) {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  next()
}
</script>

<div class="parent">
  <h2>Parent</h2>
  <transition :name="transitionName">
  <RouterView class="child-view"></RouterView>
  </transition>
</div>
