import { useReadContract, useWriteContract } from 'wagmi'

import { useVaultFactoryContract } from '@/hooks/Contracts/useContract'
import { useWaitReceipt } from '@/hooks/Contracts/useTools'
import { useNotify } from '@/hooks/useNotify'
import { useToken } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { CreateVaultDataType } from '@/types/createVault'

import { getUnitAmount } from '@/utils/tools'
import { safeInterceptionValues } from '@/utils/tools'

export const useCreateVault = () => {
  const VaultFactoryContract = useVaultFactoryContract()
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { getTokenByAddress } = useToken()
  const { onWaitReceipt } = useWaitReceipt()

  const onCreateVault = async (
    data: CreateVaultDataType,
    account: AddressType,
    callback?: () => void
  ) => {
    const { name, symbol, desc, managerName, underlying, minimumStake } = data
    const underlyingToken = getTokenByAddress(underlying)
    const notifyId = await createNotify({ type: 'loading', content: 'Create Vault' })
    const miniStake = getUnitAmount(minimumStake, underlyingToken.decimals)
    writeContract(
      {
        ...VaultFactoryContract,
        functionName: 'create',
        args: [name, symbol, desc, managerName, underlying, miniStake],
        account
      },
      {
        onSuccess: async (hash: AddressType) => {
          await onWaitReceipt(hash)
          callback?.()
          updateNotifyItem(notifyId, { title: 'Create Vault', type: 'success', hash })
        },
        onError: (error: any) => {
          console.log([error])
          updateNotifyItem(notifyId, {
            title: 'Create Vault',
            type: 'error',
            content: error.shortMessage
          })
        }
      }
    )
  }
  return { onCreateVault }
}

// function vaultCountLimits(address manager) external returns(uint256)

export const useVaultCountLimit = (address?: AddressType | '') => {
  const VaultFactoryContract = useVaultFactoryContract()
  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...VaultFactoryContract,
    functionName: 'vaultCountLimits',
    args: [address ?? '']
  })
  if (address && !isLoading && isSuccess) {
    return { data: Number(safeInterceptionValues(data, 0, 0)), isLoading, isSuccess, refetch }
  }
  return { data: 0, isLoading, isSuccess, refetch }
}
