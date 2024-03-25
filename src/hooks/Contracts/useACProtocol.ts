import { useWriteContract } from 'wagmi'
import { zeroAddress } from 'viem'
import { useACProtocolContract } from '@/hooks/Contracts/useContract'
import { AddressType } from '@/types/base'
import { getUnitAmount } from '@/utils/tools'
// import { getTokenByAddress } from '@/config/tokens'
import { useNotify } from '@/hooks/useNotify'
import { useToken } from '@/hooks/Tokens/useToken'

const ACProtocolContract = useACProtocolContract()

export const useBuyAcToken = () => {
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { getTokenByAddress } = useToken()

  const buyAcToken = async (
    baseTokenAddress: AddressType,
    amount: number,
    account: AddressType
  ) => {
    const baseToken = getTokenByAddress(baseTokenAddress)
    const _amount = getUnitAmount(String(amount), baseToken?.decimals)
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
      writeContract(
        {
          ...ACProtocolContract,
          functionName: 'ethBuy',
          args: [],
          value: _amount,
          account
        },
        {
          onSuccess: (hash: string) => succNotify(hash),
          onError: (error: any) => errorNotify(error.shortMessage)
        }
      )
    } else {
      writeContract(
        {
          ...ACProtocolContract,
          functionName: 'buy',
          args: [baseTokenAddress, _amount],
          account
        },
        {
          onSuccess: (hash: string) => succNotify(hash),
          onError: (error: any) => errorNotify(error.shortMessage)
        }
      )
    }
  }
  return { buyAcToken }
}
