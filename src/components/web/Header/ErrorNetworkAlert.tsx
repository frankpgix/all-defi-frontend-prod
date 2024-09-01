import { FC, useMemo } from 'react'

import { useAccount, useChains, useSwitchChain } from 'wagmi'

import Button from '@@/common/Button'

const ErrorNetworkAlert: FC = () => {
  const chains = useChains()
  console.log(chains)
  const { chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const chanIds = useMemo(() => chains.map(({ id }) => id), [chains])

  const isErrorChain = useMemo(() => {
    if (chainId) {
      return !chanIds.includes(chainId)
    }
    return false
  }, [chanIds, chainId])

  if (!isErrorChain) return null
  return (
    <div className="web-header-error-alert">
      App network doesn’t match network selected in wallet. To connect, please switch your wallet
      network.
      <Button text onClick={() => switchChain({ chainId: chanIds[0] })}>
        switch network
      </Button>
    </div>
  )
}

export default ErrorNetworkAlert
