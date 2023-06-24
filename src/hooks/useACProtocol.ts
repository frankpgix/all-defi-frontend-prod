import { useContractWrite, useAccount } from 'wagmi'
import { parseEther } from 'viem'

import contracts from '@/config/contracts'
import { getTokenByAddress } from '@/config/tokens'
import { getUnitAmount } from '@/utils/tools'

const ACProtocol = contracts.ACProtocol

export const useBuyAcToken = (onSettled) => {
  const { address } = useAccount()
  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    ...ACProtocol,
    functionName: 'buy',
    account: address,
    onSettled
  })

  const onBuyAcToken = async (baseTokenAddress: string, amount: number | string) => {
    const baseToken = getTokenByAddress(baseTokenAddress)
    const _amount = getUnitAmount(String(amount), baseToken.decimals)
    await writeAsync({
      args: [baseTokenAddress, _amount]
    })
  }

  return {
    onBuyAcToken,
    isLoading,
    isSuccess
  }
}

export const useEthBuyAcToken = (onSettled) => {
  const { address } = useAccount()
  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    ...ACProtocol,
    functionName: 'ethBuy',
    account: address,
    onSettled
  })

  const onEthBuyAcToken = async (amount: number | string) => {
    await writeAsync({
      value: parseEther(String(amount))
    })
  }
  return {
    onEthBuyAcToken,
    isLoading,
    isSuccess
  }
}
