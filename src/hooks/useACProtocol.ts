import { useWriteContract } from 'wagmi'
import { useACProtocolContract } from '@/hooks/useContract'
import { AddressType } from '@/types/base'
import { getUnitAmount } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'
import { useNotify } from '@/hooks/useNotify'
import { zeroAddress } from 'viem'

const ACProtocolContract = useACProtocolContract()

export const useBuyAcToken = () => {
  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const buyAcToken = async (
    baseTokenAddress: AddressType,
    amount: number,
    account: AddressType
  ) => {
    const baseToken = getTokenByAddress(baseTokenAddress)
    const _amount = getUnitAmount(String(amount), baseToken.decimals)
    const notifyId = await createNotify({ content: 'Buy AC Token', type: 'loading' })

    const succNotify = (hash: string) => {
      updateNotifyItem(notifyId, { content: 'Buy AC Token', type: 'success', hash })
    }

    const errorNotify = (msg: any) => {
      updateNotifyItem(notifyId, {
        title: 'Buy All Token',
        type: 'error',
        content: msg
      })
    }

    if (baseTokenAddress === zeroAddress) {
      await writeContractAsync({
        ...ACProtocolContract,
        functionName: 'ethBuy',
        args: [],
        value: _amount,
        account
      })
        .then((hash: string) => succNotify(hash))
        .catch((error: any) => errorNotify(error.shortMessage))
    } else {
      await writeContractAsync({
        ...ACProtocolContract,
        functionName: 'buy',
        args: [baseTokenAddress, _amount],
        account
      })
        .then((hash: string) => succNotify(hash))
        .catch((error: any) => errorNotify(error.shortMessage))
    }
  }
  return { buyAcToken }
}
