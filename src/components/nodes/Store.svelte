<script>
  import Node from './Node.svelte'


  export let node = {
    type: 'store',
    name: 'Store',
    fill: 'cornflowerblue',
  }
</script>


<Node
  {node}
  {...$$restProps}
/>
