import { useReadContract, useWriteContract } from 'wagmi'

import { useVaultContract } from '@/hooks/Contracts/useContract'
import { useAllowance, useWaitReceipt } from '@/hooks/Contracts/useTools'
import { useNotify } from '@/hooks/useNotify'
import { useToken } from '@/hooks/useToken'

import { AddressType, TokenTypes } from '@/types/base'

import { calcVaultBaseInfo } from '@/compute/vault'
import { VaultBaseInfoDefault } from '@/data/vault'
import { getUnitAmount } from '@/utils/tools'

export const useBaseInfo = (vaultAddress: AddressType) => {
  const { getTokenByAddress } = useToken()
  const vaultContract = useVaultContract(vaultAddress)
  const { data, isLoading, isSuccess, refetch } = useReadContract({
    ...vaultContract,
    functionName: 'baseInfo'
  })

  if (!isLoading && isSuccess) {
    return {
      data: calcVaultBaseInfo(data, getTokenByAddress, vaultAddress),
      isLoading,
      isSuccess,
      refetch
    }
  }
  return { data: VaultBaseInfoDefault, isLoading, isSuccess, refetch }
}

export const useAllocate = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onAllowance } = useAllowance()
  const { onWaitReceipt } = useWaitReceipt()

  const onAllocate = async (
    acToken: TokenTypes,
    amount: number,
    account: AddressType,
    callback?: () => void
  ) => {
    const _amount = getUnitAmount(String(amount), acToken.decimals)

    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Allocate to vault' })

      const allowance = await onAllowance(acToken.address, vaultAddress, _amount, notifyId)
      if (!allowance) return

      writeContract(
        {
          ...vaultContract,
          functionName: 'allocate',
          args: [_amount],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Allocate to vault', type: 'success', hash })
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Allocate to vault',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onAllocate }
}

export const useCancelAllocate = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onCancelAllocate = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Cancel Allocation' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'cancelAllocation',
          args: [],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Cancel Allocation', type: 'success', hash })
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Cancel Allocation',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onCancelAllocate }
}

export const useWithhold = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onWithhold = async (amount: number, account: AddressType, callback?: () => void) => {
    const _amount = getUnitAmount(String(amount), 18)

    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Withhold from vault' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'withhold',
          args: [_amount],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Withhold from vault', type: 'success', hash })
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Withhold from vault',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onWithhold }
}

export const useCancelWithholding = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onCancelWithholding = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Cancel Withholding' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'cancelWithholding',
          args: [],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Cancel Withholding', type: 'success', hash })
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Cancel Withholding',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onCancelWithholding }
}

export const useClaim = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onClaim = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Claim AC token' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'claim',
          args: [],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Claim AC token', type: 'success', hash })
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Claim AC token',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onClaim }
}

export const useClaimCompensation = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onClaim = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Claim ALL Token' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'claimCompensation',
          args: [],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Claim ALL Token', type: 'success', hash })
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Claim ALL Token',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onClaim }
}

export const useSettleAccount = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onSettleAccount = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Settle Vault' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'settleAccount',
          args: [],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Settle Vault', type: 'success', hash })
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Settle Vault',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onSettleAccount }
}
