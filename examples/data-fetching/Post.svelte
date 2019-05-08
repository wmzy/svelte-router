<script>
import { slide } from 'svelte/transition';
import {getRoute} from '@svel/router'
import { getPost } from './api'

let loading = false;
let post = null;
let error = null;
const route = getRoute();

$: {
  error = post = null
  loading = true
  getPost($route.params.id, (err, p) => {
    loading = false
    if (err) {
      error = err.toString()
    } else {
      post = p
    }
  })
}
</script>

<div class="post">
  {#if loading}
    <div class="loading">Loading...</div>
  {/if}
  {#if error}
    <div class="error">
      { error }
    </div>
  {/if}
  <!--
    giving the post container a unique key triggers transitions
    when the post id changes.
  -->
  {#if post}
    <div transition:slide|local class="-content">
      <h2>{ post.title }</h2>
      <p>{ post.body }</p>
    </div>
  {/if}
</div>

<style>
.loading {
  position: absolute;
  top: 10px;
  right: 10px;
}
.error {
  color: red;
}
.content {
  transition: all .35s ease;
  position: absolute;
}
.slide-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-leave-active {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
