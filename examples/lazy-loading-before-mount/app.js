import App from './App.svelte'

document.getElementById('load-button').addEventListener('click', (event) => {
  new App({
    target: document.body
  })
  event.target.remove()
})
