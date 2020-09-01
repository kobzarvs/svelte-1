import {model, tmpConnect} from './state'
import {drop} from '../view'
import {createEffect, sample} from 'effector'
import {selectedNode} from '../view/state'
import {add, cancelTmpConnect, save, startTmpConnect, updateNode, updateTmpConnect} from './index'


sample({
  source: selectedNode,
  clock: drop,
  fn: (node, location) => {
    return {...node, location}
  },
  target: add,
})

let id = 0
const outlets = {
  store: {
    on: {type: 'in'},
    reset: {type: 'in'},
    restore: {type: 'in'},
    watch: {type: 'in'},
    off: {type: 'in'},
    map: {type: 'out'},
    updates: {type: 'out'}
  }
}

model.on(add, (m, node) => {
  ++id
  return {
    ...m,
    [id]: {
      id,
      ...node,
      outlets: outlets[node.type]
    },
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
  },
})

export const load = createEffect({
  handler: () => {
    const data = JSON.parse(localStorage.getItem('effector-composer-model') || '')
    id = Math.max(...Object.keys(data).map(Number))
    return data
  },
})

model.on(load.doneData, (_, data) => data)
window.model = model

let cid = 0

tmpConnect
  .on(startTmpConnect, (_, data) => data)
  .on(updateTmpConnect, (state, data) => ({...state, ...data}))
  .reset(cancelTmpConnect)
