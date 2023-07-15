import { useState, useCallback, useEffect } from 'react'
import { createSignClient } from '../utils/WalletConnectUtil'
import dappStore from '@/stores/dappStore'

export const useInit = () => {
  const [initialized, setInitialized] = useState(false)

  const onInitialize = useCallback(async () => {
    try {
      await createSignClient()
      setInitialized(true)
      dappStore.setLoading(false)
    } catch (err: unknown) {
      alert(err)
    }
  }, [])

  useEffect(() => {
    if (!initialized) {
      onInitialize()
    }
  }, [initialized, onInitialize])

  return initialized
}
