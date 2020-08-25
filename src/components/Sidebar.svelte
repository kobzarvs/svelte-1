<script>
    import {nodes} from '../models/nodes/state'
    import Store from './nodes/Store.svelte'
    import Event from './nodes/Event.svelte'


    let nodeList = Object.values($nodes)
</script>

<aside>
    <div>
        {#each nodeList as node}
            {#if node.type === 'store'}
                <Store />
            {:else if node.type === 'event'}
                <Event />
            {/if}
        {/each}
    </div>
</aside>

<style>
    aside {
        flex: 0 0 100px;
        height: calc(100% - var(--line-height) * 2);
        border: 1px solid red;
        box-sizing: border-box;
    }

    @media (min-width: 640px) {
    }
</style>
