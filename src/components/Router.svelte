<script>
import { setContext, tick, onMount, onDestroy } from 'svelte';
import { writable } from 'svelte/store';
import * as contextKeys from '../context';

export let router;

onMount(() => router.init(fn => tick().then(fn)))

const route = router.currentRoute;
const routerStore = writable(router);
const routeStore = writable(route);
const matchedStore = writable(route.matched);
setContext(contextKeys.router, routerStore)
setContext(contextKeys.route, routeStore)
setContext(contextKeys.matched, matchedStore)

let removeListener;
$: {
  if (removeListener) removeListener();
  routerStore.set(router)
  const route = router.currentRoute;
  routeStore.set(route)
  matchedStore.set(route.matched)
  removeListener = router.listen(route => {
    routeStore.set(route)
    matchedStore.set(route.matched)
  })
}

onDestroy(() => removeListener());
</script>

<slot></slot>
