import {model} from './state'
import {drop} from '../view'
import {createEffect, sample} from 'effector'
import {selectedNode} from '../view/state'
import {add, save, updateNode} from './index'


sample({
  source: selectedNode,
  clock: drop,
  fn: (node, location) => {
    return {...node, location}
  },
  target: add,
})

let id = 0

model.on(add, (m, node) => {
  ++id
  return {
    ...m,
    [id]: {id, size: {width: 100, height: 50}, ...node},
  }
})

model.on(updateNode, (m, node) => {
  console.log('upd', node)
  return ({
    ...m,
    [node.id]: node,
  })
})

model.watch(m => console.log('model', m))

sample({
  source: model,
  clock: save,
  fn: (data) => {
    localStorage.setItem('effector-composer-model', JSON.stringify(data))
  }
})

export const load = createEffect({
  handler: () => {
    const data = JSON.parse(localStorage.getItem('effector-composer-model') || '')
    id = Math.max(...Object.keys(data).map(Number))
    return data
  }
})

model.on(load.doneData, (_, data) => data)
window.model = model
