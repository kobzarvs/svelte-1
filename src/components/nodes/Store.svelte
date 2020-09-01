<script>
  import Node from './Node.svelte'


  export let mode = 'dom'
  export let node = {
    type: 'store',
    name: 'Store',
    fill: 'cornflowerblue',
  }
  console.log('$$restProps', mode)
</script>


<Node
  {mode}
  {node}
  {...$$restProps}
  let:bound={bound}
  let:size={size}
>
    {#if mode === 'svg'}
        {#if node.outlets}
            <foreignObject
              x={bound.left - bound.padding}
              y={bound.top + bound.textHeight + bound.padding}
              width={size.width}
              height={20 * Object.keys(node.outlets).length}
              style="padding: 0; margin: 0; border: 1px solid lightgray;"
            >
                {#each Object.entries(node.outlets) as input}
                    <div class="outlet {input[1].type}">
                        <div class="circle"></div>
                        {input[0]}
                    </div>
                {/each}
            </foreignObject>
        {/if}
    {/if}
</Node>


<style type="text/scss">
  .outlet {
    display: flex;
    margin: 0;
    padding: 0;
    align-items: center;
    background: white;
    &:hover {
      background: mediumseagreen;
      color: white;
    }
  }

  .outlet.in {
    justify-content: flex-start;
  }

  .outlet.out {
    justify-content: flex-end;
  }

  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border: 1px solid white;
    border-radius: 50%;
    order: 0;
    margin: 0 2px;
  }

  .in > .circle {
    background: mediumseagreen;
  }

  .out > .circle {
    order: 1;
    background: palevioletred;
  }
</style>
