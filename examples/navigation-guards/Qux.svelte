<script>
let msg = null;

// not support now
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
      vm.msg = 'Qux'
    })
  }, 300)
}
</script>

<div>{ msg }</div>
