<script>
  import {drop} from '../models/view'
  import {selectedNode, svgSize} from '../models/view/state'
  import {pannable} from './helpers/pannable'
  import {model} from '../models/model/state'
  import Store from './nodes/Store.svelte'
  import Event from './nodes/Event.svelte'
  import Module from './nodes/Module.svelte'
  import Component from './nodes/Component.svelte'


  const components = {
    store: Store,
    event: Event,
    module: Module,
    component: Component,
  }

  let main
  let size = $svgSize
  let over = false
  $: nodeList = Object.values($model)

  function handleDragEnter(e) {
    over = true
  }

  function handleDragLeave(e) {
    over = false
  }

  function handleDrop(e) {
    over = false
    drop({
      x: e.offsetX - $selectedNode.location.x,
      y: e.offsetY - $selectedNode.location.y,
    })
  }
</script>

<main
  class:over
  bind:this={main}
  on:dragenter={handleDragEnter}
  on:dragleave={handleDragLeave}
  on:dragover|preventDefault
  on:drop={handleDrop}
  use:pannable
>
    <svg class="main-svg" {...size}>
        {#each nodeList as node}
            <svelte:component
              id={node.id}
              key={node.id}
              this={components[node.type]}
              mode="svg"
              location={node.location}
            />
        {/each}
    </svg>
</main>

<style>
    main {
        flex: 1 1 calc(100% - 100px);
        height: calc(100% - var(--line-height) * 2.5);
        box-sizing: border-box;
        overflow: auto;
        border: 1px solid transparent;
    }

    .over {
        border: 1px solid blue;
        z-index: 11;
    }

    .main-svg {
        /*border: 1px solid red;*/
        box-sizing: border-box;
    }

</style>
