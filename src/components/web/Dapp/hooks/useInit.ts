import { useState, useCallback, useEffect } from 'react'
import { createSignClient } from '../utils/WalletConnectUtil'
import dappStore from '@/stores/dappStore'
// import { notify } from '@@/common/Toast'
import { useNotify } from '@/hooks/useNotify'

export const useInit = () => {
  const [initialized, setInitialized] = useState(false)
  const { createNotify } = useNotify()

  const onInitialize = useCallback(async () => {
    try {
      await createSignClient()
      setInitialized(true)
      dappStore.setLoading(false)
    } catch (err: unknown) {
      // notify.error('Something Error, try late')
      createNotify({ type: 'error', content: 'Dapp Something Error, try late' })
      // alert(err)
    }
  }, [])

  useEffect(() => {
    if (!initialized) {
      onInitialize()
    }
  }, [initialized, onInitialize])

  return initialized
}
