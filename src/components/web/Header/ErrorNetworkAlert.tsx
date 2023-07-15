import React, { FC, useState, useMemo } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'

import Button from '@@/common/Button'

const ErrorNetworkAlert: FC = () => {
  const { chain } = useNetwork()
  const { isLoading, switchNetwork } = useSwitchNetwork()
  const chainId = Number(process.env.REACT_APP_CHAIN_ID)

  const isErrorChain = useMemo(() => {
    if (chain) {
      return chain.id !== chainId
    }
    return false
  }, [chain, chainId])
  // console.log(123, isErrorChain, chainId, chain, a)
  if (!isErrorChain) return null
  return (
    <div className="web-header-error-alert">
      App network Arbitrum doesn’t match network selected in wallet. To connect, please switch your wallet network to
      Arbitrum.
      <Button text onClick={() => switchNetwork?.(chainId)}>
        switch network
      </Button>
    </div>
  )
}

export default ErrorNetworkAlert
// <SelectNetworkButton />
