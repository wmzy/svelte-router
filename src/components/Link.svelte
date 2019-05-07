<script>
import { warn } from '../util/warn'
import { extend } from '../util/misc'
import { getContext, setContext } from 'svelte';
import * as contextKeys from '../context';

export let to;
const router = getContext(contextKeys.router);
function handleClick(e) {
  const { location } = $router.resolve(to)
  $router.push(location)
}
</script>

<a on:click={handleClick}>
  <slot></slot>
</a>
