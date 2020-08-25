import {createStore} from 'effector'


export const nodes = createStore({
  store: {
    type: 'store',
    name: '$store',
    defaultValue: JSON.stringify(null)
  },
  event: {
    type: 'event',
    name: 'event'
  }
})
