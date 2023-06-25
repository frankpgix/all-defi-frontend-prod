import { useContractWrite } from 'wagmi'
import { parseEther } from 'viem'

import contracts from '@/config/contracts'
import { getTokenByAddress } from '@/config/tokens'
import { getUnitAmount } from '@/utils/tools'
import { AccountType } from '@/config/types'
import { WriteContProps } from '@/hooks/types'

const ACProtocol = contracts.ACProtocol

export const useBuyAcToken = (account: AccountType, onSettled: (data: any, error: any) => void) => {
  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    ...ACProtocol,
    functionName: 'buy',
    account,
    onSettled
  }) as WriteContProps

  const onBuyAcToken = async (baseTokenAddress: string, amount: number | string) => {
    const baseToken = getTokenByAddress(baseTokenAddress)
    const _amount = getUnitAmount(String(amount), baseToken.decimals)
    writeAsync &&
      (await writeAsync({
        args: [baseTokenAddress, _amount]
      }))
  }

  return {
    onBuyAcToken,
    isLoading,
    isSuccess
  }
}

export const useEthBuyAcToken = (
  account: AccountType,
  onSettled: (data: any, error: any) => void
) => {
  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    ...ACProtocol,
    functionName: 'ethBuy',
    account,
    onSettled
  }) as WriteContProps

  const onEthBuyAcToken = async (amount: number | string) => {
    writeAsync &&
      (await writeAsync({
        value: parseEther(String(amount))
      }))
  }
  return {
    onEthBuyAcToken,
    isLoading,
    isSuccess
  }
}
