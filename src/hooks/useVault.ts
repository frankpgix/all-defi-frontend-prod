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

  const onAllocate = async (
    acToken: Token,
    amount: number,
    account: AddressType,
    callback?: () => void
  ) => {
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
          if (callback) callback()
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

export const useCancelAllocate = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onCancelAllocate = async (account: AddressType) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Cancel Allocation' })

      await writeContractAsync({
        ...vaultContract,
        functionName: 'cancelAllocation',
        args: [],
        account
      })
        .then((hash: string) => {
          // console.log(hash)
          updateNotifyItem(notifyId, { title: 'Cancel Allocation', type: 'success', hash })
        })
        .catch((error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Cancel Allocation',
            type: 'error',
            content: error.shortMessage
          })
        })
    }
  }
  return { onCancelAllocate }
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

export const useCancelWithholding = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onCancelWithholding = async (account: AddressType) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Cancel Withholding' })

      await writeContractAsync({
        ...vaultContract,
        functionName: 'cancelWithholding',
        args: [],
        account
      })
        .then((hash: string) => {
          // console.log(hash)
          updateNotifyItem(notifyId, { title: 'Cancel Withholding', type: 'success', hash })
        })
        .catch((error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Cancel Withholding',
            type: 'error',
            content: error.shortMessage
          })
        })
    }
  }
  return { onCancelWithholding }
}

export const useClaim = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onClaim = async (account: AddressType) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Claim AC token' })

      await writeContractAsync({
        ...vaultContract,
        functionName: 'claim',
        args: [],
        account
      })
        .then((hash: string) => {
          console.log(hash)
          updateNotifyItem(notifyId, { title: 'Claim AC token', type: 'success', hash })
        })
        .catch((error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Claim AC token',
            type: 'error',
            content: error.shortMessage
          })
        })
    }
  }
  return { onClaim }
}

export const useClaimCompensation = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onClaim = async (account: AddressType) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Claim ALL Token' })

      await writeContractAsync({
        ...vaultContract,
        functionName: 'claimCompensation',
        args: [],
        account
      })
        .then((hash: string) => {
          console.log(hash)
          updateNotifyItem(notifyId, { title: 'Claim ALL Token', type: 'success', hash })
        })
        .catch((error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Claim ALL Token',
            type: 'error',
            content: error.shortMessage
          })
        })
    }
  }
  return { onClaim }
}

export const useSettleAccount = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onSettleAccount = async (account: AddressType) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Settle Vault' })

      await writeContractAsync({
        ...vaultContract,
        functionName: 'settleAccount',
        args: [],
        account
      })
        .then((hash: string) => {
          console.log(hash)
          updateNotifyItem(notifyId, { title: 'Settle Vault', type: 'success', hash })
        })
        .catch((error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Settle Vault',
            type: 'error',
            content: error.shortMessage
          })
        })
    }
  }
  return { onSettleAccount }
}
