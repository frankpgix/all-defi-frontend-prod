import { proxy, subscribe } from 'valtio'
// import LegacySignClient from '@walletconnect/client'

interface State {
  loading: boolean
  isConnect: boolean
  appName: string
  topic: string
}

const state = proxy<State>({
  appName: '',
  isConnect: false,
  loading: true,
  topic: ''
})

const dappStore = {
  state,

  setAppName(value: string) {
    state.appName = value
  },

  setIsConnect(value: boolean) {
    state.isConnect = value
  },

  setLoading(value: boolean) {
    state.loading = value
  },

  setTopic(value: string) {
    state.topic = value
  }
}

// Subscribe to all state changes
const unsubscribe = subscribe(state, () => console.log('state has changed to', state))
// Unsubscribe by calling the result
unsubscribe()

export default dappStore
