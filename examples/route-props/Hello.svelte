<script>
export let name = 'Vue!'

let {name: n, ...attrs} = $$props;
</script>

<div>
  <h2 class="hello">Hello {name} { JSON.stringify(attrs, null, 2) }</h2>
</div>