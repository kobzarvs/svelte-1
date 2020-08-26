<script>
  import Node from './Node.svelte'


  export let node = {
    type: 'component',
    name: 'Component',
    fill: '#edf4f6',
    color: '#333',
  }
</script>

<Node
  {node}
  {...$$restProps}
/>
