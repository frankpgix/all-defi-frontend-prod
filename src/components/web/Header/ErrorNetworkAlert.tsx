import { FC, useMemo } from 'react'
import { useChainId, useSwitchChain, useAccount } from 'wagmi'
import { VITE_APP_CHAIN_ID } from '@/config'

import Button from '@@/common/Button'

const ErrorNetworkAlert: FC = () => {
  const { chainId } = useAccount()
  const chain = useChainId()
  const { switchChain } = useSwitchChain()
  const defaultChainId = Number(VITE_APP_CHAIN_ID)
  const isErrorChain = useMemo(() => {
    if (chainId) {
      return chainId !== defaultChainId
    }
    return false
  }, [chain, chainId])

  if (!isErrorChain) return null
  return (
    <div className="web-header-error-alert">
      App network Arbitrum doesn’t match network selected in wallet. To connect, please switch your
      wallet network to Arbitrum.
      <Button text onClick={() => switchChain({ chainId: chain })}>
        switch network
      </Button>
    </div>
  )
}

export default ErrorNetworkAlert
