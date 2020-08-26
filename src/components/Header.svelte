<script>
  import {load} from '../models/model/init'
  import {save} from '../models/model'
</script>

<header>
    <div>Effector composer</div>
    <div>
        <button on:click={load}>Load</button>
        <button on:click={save}>Save</button>
    </div>
</header>

<style>
    header {
        flex: 1 0 100%;
        height: calc(var(--line-height) * 1.5);
        line-height: calc(var(--line-height) * 1.5);
        border-bottom: 1px solid darkslategray;
        box-sizing: border-box;
        padding: 0 5px;
        color: white;
        background: darkslategray;
        z-index: 10;
        font-weight: bold;

        display: flex;
        justify-content: space-between;
    }
</style>
