<script>
  import Node from './Node.svelte'

  export let node = {
    type: 'module',
    name: 'Module',
    fill: '#edf4f6',
    color: '#555',
  }
</script>

<Node
  {node}
  {...$$restProps}
/>
