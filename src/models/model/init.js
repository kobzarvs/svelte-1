import {model} from './state'
import {drop} from '../view'
import {sample} from 'effector'
import {selectedNode} from '../view/state'
import {add} from './index'


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
    [id]: {id, ...node},
  }
})

model.watch(m => console.log('model', m))
