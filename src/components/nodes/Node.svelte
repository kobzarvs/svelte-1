<script>
  import {tick} from 'svelte'
  import {endDrag, startDrag, selectNode} from '../../models/view'
  import {dropStatus} from '../../models/view/state'
  import {startTmpConnect, updateNode, updateTmpConnect} from '../../models/model'


  export let mode = 'dom'
  export let node = {}
  let defaultProps = {
    name: 'Store',
    type: 'store',
    color: 'white',
    fill: 'transparent',
    size: {width: 100, height: 22},
    location: {x: 0, y: 0},
  }
  let {location, size, id, type, name, color, fill} = {...defaultProps, ...node}

  function handleDragStart(e) {
    console.log(e)
    node.location = {x: e.offsetX, y: e.offsetY}
    startDrag(node)
  }

  function handleDragEnd(e) {
    if ($dropStatus === 'dropped') return
    endDrag({type})
    updateNode(node)
  }

  function handleSelect() {
    selectNode(node)
  }

  const textHeight = 12
  const padding = 5

  $: bound = {
    left: location.x + padding,
    top: location.y + padding,
    right: location.x + size.width - padding,
    bottom: location.y + size.height - padding,
    padding,
    textHeight,
  }

  let sx, sy

  function handleMouseDownNode(e) {
    if (e.button !== 0) return

    sx = e.pageX - location.x
    sy = e.pageY - location.y
    window.addEventListener('mousemove', handleMouseMoveNode)
    window.addEventListener('mouseup', handleMouseUpNode)
    selectNode(node)
  }

  function handleMouseMoveNode(e) {
    location.x = e.pageX - sx
    location.y = e.pageY - sy
  }

  function handleMouseUpNode(e) {
    selectNode(node)
    updateNode(node)
    window.removeEventListener('mousemove', handleMouseMoveNode)
    window.removeEventListener('mouseup', handleMouseUpNode)
  }

  let inputNameMode = false
  let nodeName

  async function handleDblClickNode(e) {
    inputNameMode = true
    await tick()
    nodeName.focus()
  }

  $: size.width = Math.min(Math.max(100, (name.length + 2) * 10 + padding), 250)

  function endInputName() {
    inputNameMode = false
    console.log(name)
    updateNode({...node, name})
  }

  let scx, scy, dcx, dcy, connecting = false

  function startConnect(e) {
    if (e.button !== 0) return
    connecting = true
    scx = dcx = bound.right - padding
    scy = dcy = bound.top + padding
    startTmpConnect({scx, scy, dcx, dcy, node})
    window.addEventListener('mousemove', moveConnect)
    window.addEventListener('mouseup', endConnect)
  }

  function moveConnect(e) {
    dcx = e.offsetX
    dcy = e.offsetY
    updateTmpConnect({scx, scy, dcx, dcy, node})
  }

  function endConnect(e) {
    if (e.button !== 0) return
    connecting = false
    window.removeEventListener('mousemove', moveConnect)
    window.removeEventListener('mouseup', endConnect)
  }

</script>

{#if mode === 'dom'}
    <div
      class="node"
      draggable="true"
      on:click={handleSelect}
      on:dragstart={handleDragStart}
      on:dragend={handleDragEnd}
      style="background:{fill}; color:{color};"
    >
        {name}
    </div>
{:else if mode === 'svg'}
    <defs>
        <clipPath id="clipPath_{id}">
            <rect {...location} {...size} />
        </clipPath>
    </defs>

    <defs>
        <clipPath id="clipPath_name_{id}">
            <rect x={bound.left} y={bound.top} width={bound.right - bound.left - padding * 3} height={textHeight} />
        </clipPath>
    </defs>

    <g on:mousedown={handleMouseDownNode}
       on:dblclick={handleDblClickNode}
       style="opacity:.9;"
    >
        <g style="clip-path: url(#clipPath_{id});">
            <rect
              {...location}
              {...size}
              {fill}
              stroke="gray"
              rx="5" ry="5"
            />
            {#if !inputNameMode}
                <text
                  x={bound.left}
                  y={bound.top + textHeight}
                  fill={color}
                  font-family="monospace"
                  style="clip-path: url(#clipPath_name_{id});"
                >
                    {name}
                </text>
            {/if}
            <circle
              cx={bound.right - padding}
              cy={bound.top + padding + 1}
              r={padding}
              stroke="white"
              fill="green"
              class="node-output"
              on:mousedown|stopPropagation={startConnect}
              on:mouseup|stopPropagation={startConnect}
            />
            <line
              x1={bound.right - padding * 3}
              y1={bound.top - padding}
              x2={bound.right - padding * 3}
              y2={bound.top + padding + textHeight}
              stroke={color}
              style="opacity: .5;"
            />
            <line
              x1={location.x}
              y1={bound.top + padding + textHeight}
              x2={location.x + size.width}
              y2={bound.top + padding + textHeight}
              stroke={color}
              style="opacity: .5;"
            />
        </g>
        <slot {bound} {size} {location} {node} />
    </g>

    {#if inputNameMode}
        <foreignObject
          x={bound.left}
          y={bound.top - padding + 1}
          width={size.width - padding * 2}
          height="18"
          style="padding: 0; margin: 0;"
        >
            <input
              bind:this={nodeName}
              bind:value={name}
              type="text"
              class="node-name-input"
              on:keypress={e => e.key === 'Enter' && endInputName()}
              on:blur={endInputName}
              style="color: {color}"
            />
        </foreignObject>
    {/if}
{/if}

<style type="text/scss">
  .node {
    border: 1px solid cornflowerblue;
    border-radius: 3px;
    background: cornflowerblue;
    color: white;
    padding: 2px 4px;
    margin: 1px;
    cursor: pointer;

    &:hover {
      opacity: .9;
    }
  }

  .node-name-input {
    font-size: 1rem;
    padding: 0;
    margin: 0;
    border: none;
    border-bottom: 1px solid lightgray;
    outline: none;
    background: transparent;
    font-family: monospace;
  }

  .node-output:hover {
    fill: mediumseagreen;
    cursor: crosshair;
  }

</style>
