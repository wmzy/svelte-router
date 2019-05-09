import App from './App.svelte'
import AppView from './AppView.svelte'

// Discrete components means that a new Vue instance will be created
// and bound on multiple *independent* nodes (eg. one Vue instance
// per node); but the router should act as a singleton and keep all
// instances in sync.
Array.prototype.forEach.call(document.querySelectorAll('.app'), (target) => {
  new App({
    target
  })
})

new AppView({
  target: document.querySelector('#view')
})