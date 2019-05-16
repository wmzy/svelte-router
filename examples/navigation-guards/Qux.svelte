<script context="module">
export function beforeRouteEnter (to, from, next) {
  // Note that enter hooks do not have access to `this`
  // because it is called before the component is even created.
  // However, we can provide a callback to `next` which will
  // receive the vm instance when the route has been confirmed.
  //
  // simulate an async data fetch.
  // this pattern is useful when you want to stay at current route
  // and only switch after the data has been fetched.
  setTimeout(() => {
    next(vm => {
      vm.setMessage('Qux')
    })
  }, 300)
}
</script>

<script>
let msg = null;

export function setMessage(message) {
  msg = message
}
</script>

<div>{ msg }</div>
