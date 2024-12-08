import { maxUint256 } from 'viem'
import { useAccount } from 'wagmi'

import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'

import { config } from '@/config/wagmi'

import { useNotify } from '@/hooks/useNotify'

import { AddressType } from '@/types/base'

import { useGetErc20Contract } from './useContract'

export const useAllowance = () => {
  const { address: account } = useAccount()
  const { getErc20Contract } = useGetErc20Contract()
  const { updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onAllowance = async (
    tokenAddress: AddressType,
    contractAddress: AddressType,
    amount: bigint,
    notifyId?: string
  ) => {
    const ERC20Contract = getErc20Contract(tokenAddress)
    const allowance = (await readContract(config, {
      ...ERC20Contract,
      functionName: 'allowance',
      args: [account ?? '', contractAddress]
    })) as bigint
    if (allowance < amount) {
      const hash = await writeContract(config, {
        ...ERC20Contract,
        functionName: 'approve',
        args: [contractAddress, 1000000n]
      }).catch((error) => {
        console.error(error)
        if (notifyId) {
          updateNotifyItem(notifyId, {
            title: 'Operation failed',
            type: 'error',
            content: 'approve failed.'
          })
        }
      })
      if (hash) await onWaitReceipt(hash)
      return Boolean(hash)
    }
    return true
  }
  return { onAllowance }
}

export const useWaitReceipt = () => {
  const onWaitReceipt = async (hash: AddressType) => {
    const wait = await waitForTransactionReceipt(config, { hash })
    return wait
  }
  return { onWaitReceipt }
}
