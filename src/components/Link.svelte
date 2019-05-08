<script>
import { createRoute, isSameRoute, isIncludedRoute } from '../util/route'
import { extend } from '../util/misc'
import {getRouter, getRoute} from '../context';

export let to;
export let append = false;
export let active = true;

function toAttributes({to, append, active, ...attr}) {
  return attr;
}

const router = getRouter();
const route = getRoute();
$: ({ location, route: targetRoute, href } = $router.resolve(to, $route, append));

let activeAttr;
$: if (active) {
  const compareTarget = location.path
    ? createRoute(null, location, null, $router)
    : targetRoute
  activeAttr = {};
  const key = active === true ? 'active' : active;
  if (isSameRoute($route, compareTarget)) activeAttr[key] = 'exact';
  else if (isIncludedRoute($route, compareTarget)) activeAttr[key] = 'inclusive';
}

function handleClick(e) {
  if (guardEvent(e)) {
    e.preventDefault()

    $router.push(location)
  }
}

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return
  // don't redirect when preventDefault called
  if (e.defaultPrevented) return
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) return
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute('target')
    if (/\b_blank\b/i.test(target)) return
  }
  return true
}
</script>

<a {...toAttributes($$props)} {...activeAttr} on:click={handleClick} {href}>
  <slot></slot>
</a>
