import { useEffect } from 'react'
import { signClient } from '../utils/WalletConnectUtil'
import dappStore from '@/stores/dappStore'

export const useCacheSession = () => {
  const initCacheSession = () => {
    if (signClient) {
      const session = signClient.session.values
      if (session && session.length) {
        console.log(session)
        dappStore.setTopic(session[0].topic)
        dappStore.setAppName(session[0].peer.metadata.name)
        dappStore.setIsConnect(true)
        dappStore.setLoading(false)
      }
    }
  }

  useEffect(() => {
    initCacheSession()
  }, [signClient])

  return {
    initCacheSession
  }
}
