<script>
  import {fly} from 'svelte/transition'
  import {draggedObject, dropStatus, selectedNode} from '../models/view/state'

</script>

<footer>
    <div>
        {#if $draggedObject}
            Add <b>{$draggedObject.name}</b> object to model...
        {:else if $selectedNode}
            Current node: <b>{$selectedNode.name}</b>
        {:else}
            Waiting for action...
        {/if}
    </div>
    <div class="right-status">
        Drag status: {$dropStatus}
    </div>
</footer>

<style type="text/scss">
  footer {
    flex: 1 0 100%;
    height: var(--line-height);
    border-top: 1px solid lightgray;
    box-sizing: border-box;
    padding: 0 5px;
    line-height: var(--line-height);
    background: #eeeeee;
    overflow: hidden;
    z-index: 10;

    display: flex;
    justify-content: space-between;

    .right-status {
      align-self: flex-end;
    }
  }
</style>
