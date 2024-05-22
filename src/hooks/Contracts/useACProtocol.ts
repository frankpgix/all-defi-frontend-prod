import { zeroAddress } from 'viem'
import { useReadContract, useWriteContract } from 'wagmi'

import { useACProtocolContract } from '@/hooks/Contracts/useContract'
import { useAllowance, useWaitReceipt } from '@/hooks/Contracts/useTools'
import { useNotify } from '@/hooks/useNotify'
import { useToken } from '@/hooks/useToken'

import { AddressType, UnderlyingTokenTypes } from '@/types/base'

import { getUnitAmount } from '@/utils/tools'

// 申购
export const useDeposit = () => {
  const ACProtocolContract = useACProtocolContract()
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { getTokenByAddress } = useToken()
  const { onAllowance } = useAllowance()
  const { onWaitReceipt } = useWaitReceipt()

  const onDeposit = async (
    underlyingAddress: AddressType,
    amount: number,
    lockDuration: number | string,
    account: AddressType,
    callback?: () => void
  ) => {
    const underlyingToken = getTokenByAddress(underlyingAddress)
    const _amount = getUnitAmount(String(amount), underlyingToken?.decimals)

    const notifyId = await createNotify({ content: 'Deposit', type: 'loading' })
    console.log('notifyId', notifyId)
    const succNotify = (hash: string) => {
      console.log('notifyId2', notifyId)
      updateNotifyItem(notifyId, { content: 'Deposit', type: 'success', hash })
    }

    const errorNotify = (msg: any) => {
      updateNotifyItem(notifyId, {
        title: 'Deposit',
        type: 'error',
        content: msg
      })
    }

    if (underlyingAddress === zeroAddress) {
      writeContract(
        {
          ...ACProtocolContract,
          functionName: 'depositETH',
          args: [lockDuration],
          value: _amount,
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            succNotify(hash)
          },
          onError: (error: any) => errorNotify(error.reason || error.shortMessage)
        }
      )
    } else {
      const allowance = await onAllowance(
        underlyingAddress,
        ACProtocolContract.address,
        _amount,
        notifyId
      )

      if (!allowance) {
        errorNotify('Please approve first')
        return
      }
      writeContract(
        {
          ...ACProtocolContract,
          functionName: 'deposit',
          args: [underlyingAddress, _amount, lockDuration],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            succNotify(hash)
          },
          onError: (error: any) => errorNotify(error.reason || error.shortMessage)
        }
      )
    }
  }
  return { onDeposit }
}

// 赎回
export const useWithdraw = () => {
  const ACProtocolContract = useACProtocolContract()
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()
  const { onAllowance } = useAllowance()
  const { getTokenByAddress, getTokenByName } = useToken()

  const onWithdraw = async (
    underlyingAddress: AddressType,
    depositId: number,
    account: AddressType,
    callback?: () => void
  ) => {
    const underlyingToken = getTokenByAddress(underlyingAddress) as UnderlyingTokenTypes
    const acToken = getTokenByName(underlyingToken?.acTokenName)
    const notifyId = await createNotify({ content: 'Withdraw', type: 'loading' })
    const succNotify = (hash: string) => {
      updateNotifyItem(notifyId, { content: 'Withdraw', type: 'success', hash })
    }
    console.log(acToken, 'acToken')

    const errorNotify = (msg: any) => {
      updateNotifyItem(notifyId, {
        title: 'Withdraw',
        type: 'error',
        content: msg
      })
    }
    const allowance = await onAllowance(
      acToken.address,
      ACProtocolContract.address,
      999999999n,
      notifyId
    )

    if (!allowance) {
      errorNotify('Please approve first')
      return
    }
    if (underlyingAddress === zeroAddress) {
      writeContract(
        {
          ...ACProtocolContract,
          functionName: 'withdrawETH',
          args: [depositId],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            succNotify(hash)
          },
          onError: (error: any) => errorNotify(error.reason || error.shortMessage)
        }
      )
    } else {
      writeContract(
        {
          ...ACProtocolContract,
          functionName: 'withdraw',
          args: [underlyingAddress, depositId],
          account
        },
        {
          onSuccess: async (hash: AddressType) => {
            await onWaitReceipt(hash)
            callback?.()
            succNotify(hash)
          },
          onError: (error: any) => errorNotify(error.reason || error.shortMessage)
        }
      )
    }
  }
  return { onWithdraw }
}

export const useIsAllowedForDeposit = (account?: AddressType) => {
  const AllProtocolContract = useACProtocolContract()
  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...AllProtocolContract,
    functionName: 'isAllowedForDeposit',
    args: [account ?? '']
  })
  // console.log(isLoading, isSuccess, data, error)
  return { data, isLoading, isSuccess, refetch }
}
