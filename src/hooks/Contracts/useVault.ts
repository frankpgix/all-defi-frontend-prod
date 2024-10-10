import { WriteContractErrorType } from 'viem'
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

  // console.log(error, 'error')

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

export const useStake = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onAllowance } = useAllowance()
  const { onWaitReceipt } = useWaitReceipt()

  const onStake = async (
    acToken: TokenTypes,
    amount: number,
    account: AddressType,
    callback?: () => void
  ) => {
    const _amount = getUnitAmount(String(amount), acToken.decimals)

    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Stake to vault' })

      const allowance = await onAllowance(acToken.address, vaultAddress, _amount, notifyId)
      if (!allowance) return

      writeContract(
        {
          ...vaultContract,
          functionName: 'stake',
          args: [_amount],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Stake to vault', type: 'success', hash })
          },
          onError: (error: any) => {
            callback?.()
            updateNotifyItem(notifyId, {
              title: 'Stake to vault',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onStake }
}

export const useCancelStake = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onCancelStake = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Cancel Stake' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'cancelStake',
          args: [],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Cancel Stake', type: 'success', hash })
          },
          onError: (error: any) => {
            callback?.()
            updateNotifyItem(notifyId, {
              title: 'Cancel Stake',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onCancelStake }
}

export const useUnstake = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onAllowance } = useAllowance()
  const { onWaitReceipt } = useWaitReceipt()

  const onUnstake = async (
    acToken: TokenTypes,
    amount: number,
    account: AddressType,
    callback?: () => void
  ) => {
    const _amount = getUnitAmount(String(amount), 18)

    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Unstake from vault' })

      const allowance = await onAllowance(acToken.address, vaultAddress, _amount, notifyId)
      if (!allowance) return

      writeContract(
        {
          ...vaultContract,
          functionName: 'unstake',
          args: [_amount],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Unstake from vault', type: 'success', hash })
          },
          onError: (error: any) => {
            callback?.()
            updateNotifyItem(notifyId, {
              title: 'Unstake from vault',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onUnstake }
}

export const useCancelUnstake = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onCancelUnstake = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Cancel Unstake' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'cancelUnstake',
          args: [],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            updateNotifyItem(notifyId, { title: 'Cancel Unstake', type: 'success', hash })
          },
          onError: (error: any) => {
            callback?.()
            updateNotifyItem(notifyId, {
              title: 'Cancel Unstake',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onCancelUnstake }
}

export const useClaim = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onClaim = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Claim Asset' })

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
            updateNotifyItem(notifyId, { title: 'Claim Asset', type: 'success', hash })
          },
          onError: (error: any) => {
            callback?.()
            updateNotifyItem(notifyId, {
              title: 'Claim Asset',
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

export const useRequestSettlemen = (vaultAddress: AddressType) => {
  const vaultContract = useVaultContract(vaultAddress)

  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onRequestSettlemen = async (account: AddressType, callback?: () => void) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Settle Vault' })

      writeContract(
        {
          ...vaultContract,
          functionName: 'requestSettlement',
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
            callback?.()
            updateNotifyItem(notifyId, {
              title: 'Settle Vault',
              type: 'error',
              content: error.metaMessages[0] || error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onRequestSettlemen }
}
