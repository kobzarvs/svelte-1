export function pannable(node) {
  let sx, sy, dragging = false

  function handleMouseDown(e) {
    if (e.button === 1) {
      node.addEventListener('mousemove', handleMouseMove)
      node.addEventListener('mouseup', handleMouseUp)
      sx = e.pageX
      sy = e.pageY
      dragging = true
      console.log('start pan', sx, sy, node.scrollTop, node.scrollLeft)
    }
  }

  function handleMouseMove(e) {
    if (dragging) {
      node.scrollLeft -= e.movementX
      node.scrollTop -= e.movementY
    }
  }

  function handleMouseUp(e) {
    if (dragging) {
      node.removeEventListener('mousemove', handleMouseMove)
      node.removeEventListener('mouseup', handleMouseUp)
      console.log('end', sx, sy)
      dragging = false
    }
  }

  node.addEventListener('mousedown', handleMouseDown)

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
    }
  }
}
