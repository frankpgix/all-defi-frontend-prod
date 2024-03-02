import { useWriteContract } from 'wagmi'
import { useACProtocolContract } from '@/hooks/useContract'
import { AddressType } from '@/types/base'
import { getUnitAmount } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'
import { useNotify } from '@/hooks/useNotify'

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

    await writeContractAsync({
      ...ACProtocolContract,
      functionName: 'buy',
      args: [baseTokenAddress, _amount],
      account
    })
      .then((hash: string) => {
        console.log(hash)
        updateNotifyItem(notifyId, { content: 'Buy AC Token', type: 'success', hash })
      })
      .catch((error: any) => {
        updateNotifyItem(notifyId, {
          title: 'Buy All Token',
          type: 'error',
          content: error.shortMessage
        })
      })
  }
  return { buyAcToken }
}
