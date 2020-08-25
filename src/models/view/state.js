import {createStore} from 'effector'


export const draggedObject = createStore(null)
export const dropStatus = createStore('none')
export const selectedNode = createStore(null)
export const svgSize = createStore({width: 2000, height: 2000})
