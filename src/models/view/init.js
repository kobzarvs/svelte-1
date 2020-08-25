import {draggedObject, dropStatus, selectedNode} from './state'
import {drop, endDrag, selectNode, startDrag} from './index'


draggedObject
  .on(startDrag, (_, data) => data)
  .on(drop, () => null)
  .reset(endDrag)

dropStatus
  .on(startDrag, () => 'started')
  .on(drop, () => 'dropped')
  .on(endDrag, () => 'canceled')

selectedNode
  .on([selectNode, startDrag], (_, node) => node)
