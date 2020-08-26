<script>
  import Node from './Node.svelte'


  export let node = {
    type: 'event',
    name: 'Event',
    fill: 'mediumseagreen',
  }
</script>

<Node
  {node}
  {...$$restProps}
/>
