import { boot } from 'quasar/wrappers'
import { StateInterface } from '../store'

export default boot<StateInterface>(async ({ store }) => {
  try {
    await store.dispatch('wedding/getUser')
  } catch (error) {
    console.log('boot user error', error)
  }
})
