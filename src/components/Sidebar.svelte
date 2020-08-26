<script>
  import Store from './nodes/Store.svelte'
  import Event from './nodes/Event.svelte'
  import Component from './nodes/Component.svelte'
  import Module from './nodes/Module.svelte'
</script>

<aside>
    <div class="sub-group">Effector</div>
    <Store />
    <Event />

    <div class="sub-group">Structure</div>
    <Component />
    <Module />
</aside>

<style>
    aside {
        flex: 0 0 100px;
        border-right: 1px solid lightgray;
        box-sizing: border-box;
        box-shadow: 2px 0 10px lightgray;
    }
    .sub-group {
        font-size: .8em;
        margin: 5px;
    }
</style>
