import App from './App.svelte'
import './models/init'


const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
})

export default app
