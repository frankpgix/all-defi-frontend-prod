import { maxUint256 } from 'viem'
import { useAccount } from 'wagmi'

import { readContract, writeContract } from '@wagmi/core'

import { config } from '@/config/wagmi'

import { useNotify } from '@/hooks/useNotify'

import { AddressType } from '@/types/base'

import { sleep } from '@/utils/tools'

import { useGetErc20Contract } from './useContract'

export const useAllowance = () => {
  const { address: account } = useAccount()
  const { getErc20Contract } = useGetErc20Contract()
  const { updateNotifyItem } = useNotify()

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
        args: [contractAddress, maxUint256]
      }).catch(() => {
        if (notifyId) {
          updateNotifyItem(notifyId, {
            title: 'Approve',
            type: 'error',
            content: 'approve failed.'
          })
        }
      })
      await sleep(5000)
      return Boolean(hash)
    }
    return true
  }
  return { onAllowance }
}
