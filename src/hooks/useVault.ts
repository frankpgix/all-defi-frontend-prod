import { useReadContract, useWriteContract } from 'wagmi'
import { AddressType } from '@/types/base'
import { useVaultContract } from '@/hooks/useContract'
import Token from '@/class/Token'

// import { VaultBaseInfoProps } from '@/types/vault'
import { calcVaultBaseInfo } from '@/compute/vault'
import { VaultBaseInfoDefault } from '@/data/vault'
import { useNotify } from '@/hooks/useNotify'
import { getUnitAmount } from '@/utils/tools'

export const useBaseInfo = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)
  const { data, isLoading, isSuccess, refetch } = useReadContract({
    ...vaultContract,
    functionName: 'baseInfo'
  })

  if (!isLoading && isSuccess) {
    return { data: calcVaultBaseInfo(data), isLoading, isSuccess, refetch }
  }
  return { data: VaultBaseInfoDefault, isLoading, isSuccess, refetch }
}

export const useAllocate = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onAllocate = async (acToken: Token, amount: number, account: AddressType) => {
    const _amount = getUnitAmount(String(amount), acToken.decimals)

    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Allocate to vault' })

      await writeContractAsync({
        ...vaultContract,
        functionName: 'allocate',
        args: [_amount],
        account
      })
        .then((hash: string) => {
          console.log(hash)
          updateNotifyItem(notifyId, { title: 'Allocate to vault', type: 'success', hash })
        })
        .catch((error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Allocate to vault',
            type: 'error',
            content: error.shortMessage
          })
        })
    }
  }
  return { onAllocate }
}

export const useWithhold = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onWithhold = async (amount: number, account: AddressType) => {
    const _amount = getUnitAmount(String(amount), 18)

    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Withhold from vault' })

      await writeContractAsync({
        ...vaultContract,
        functionName: 'withhold',
        args: [_amount],
        account
      })
        .then((hash: string) => {
          console.log(hash)
          updateNotifyItem(notifyId, { title: 'Withhold from vault', type: 'success', hash })
        })
        .catch((error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Withhold from vault',
            type: 'error',
            content: error.shortMessage
          })
        })
    }
  }
  return { onWithhold }
}
