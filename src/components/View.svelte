<script>
import { warn } from '../util/warn'
import { extend } from '../util/misc'
import { getContext, setContext, onMount } from 'svelte';
import { derived } from 'svelte/store';
import * as contextKeys from '../context';

export let name = 'default';

let routeStore = getContext(contextKeys.route);
let matchedStore = getContext(contextKeys.matched);

setContext(contextKeys.matched, derived(matchedStore, ([m, ...rest]) => rest))
const matched = derived(matchedStore, ([m]) => m)
let propsToPass, component;

$: if ($matched) {
  component = $matched.components[name]

  // resolve props
  propsToPass = resolveProps($routeStore, $matched.props && $matched.props[name]) || {}
  const {name: _, ...props} = $$props;

  propsToPass = extend(props, propsToPass)
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          `props in "${route.path}" is a ${typeof config}, ` +
          `expecting an object, function or boolean.`
        )
      }
  }
}
</script>

<svelte:component this={component} {...propsToPass}/>
