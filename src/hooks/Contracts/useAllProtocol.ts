import { zeroAddress } from 'viem'
import { useReadContract, useWriteContract } from 'wagmi'

import { useAllProtocolContract } from '@/hooks/Contracts/useContract'
import { useAllowance, useWaitReceipt } from '@/hooks/Contracts/useTools'
import { useAssetPrice, useAssetPriceUSD } from '@/hooks/Contracts/useVaultFactory'
import { useNotify } from '@/hooks/useNotify'
import { useToken, useWChainToken } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { CreateVaultDataType, UpdateVaultDataType } from '@/types/createVault'
import { VaultStakeType } from '@/types/vault'

import { calcCaeateVaultData, calcUpdateVaultData } from '@/compute/caeateVault'
import { calcVaultDerivativesInfo, calcVaultStakedALL } from '@/compute/vault'
import { VaultStakeDataDefault } from '@/data/vault'
import { getUnitAmount, safeInterceptionValues } from '@/utils/tools'

export const useAllTokenPrice = (baseToken: AddressType) => {
  const { getTokenByName } = useToken()
  const { wChainToken } = useWChainToken()
  const ALLTOKEN = getTokenByName('ALLTOKEN')

  if (baseToken === zeroAddress) {
    baseToken = wChainToken.address
  }
  return useAssetPrice(ALLTOKEN.address, baseToken)
}

export const useAllTokenPriceInUSD = () => {
  const { getTokenByName } = useToken()
  const ALLTOKEN = getTokenByName('ALLTOKEN')
  return useAssetPriceUSD(ALLTOKEN.address)
}

export const useVaultCountLimit = (address?: AddressType | '') => {
  const AllProtocolContract = useAllProtocolContract()
  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...AllProtocolContract,
    functionName: 'vaultCountLimit',
    args: [address ?? '']
  })
  if (address && !isLoading && isSuccess) {
    return { data: Number(safeInterceptionValues(data, 0, 0)), isLoading, isSuccess, refetch }
  }
  return { data: 0, isLoading, isSuccess, refetch }
}

export const useVaultStakedALL = (vaultAddress: AddressType) => {
  const AllProtocolContract = useAllProtocolContract()
  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...AllProtocolContract,
    functionName: 'vaultStakedALL',
    args: [vaultAddress ?? '']
  }) as { data: bigint[]; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (vaultAddress && !isLoading && isSuccess) {
    return {
      data: calcVaultStakedALL(data),
      isLoading,
      isSuccess,
      refetch
    }
  }
  return { data: VaultStakeDataDefault, isLoading, isSuccess, refetch }
}

export const useDerivativeList = () => {
  const AllProtocolContract = useAllProtocolContract()
  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...AllProtocolContract,
    functionName: 'derivativeList',
    args: []
  }) as { data: AddressType[]; isSuccess: boolean; isLoading: boolean; refetch: () => void }
  if (!isLoading && isSuccess) {
    return { data: calcVaultDerivativesInfo(data), isLoading, isSuccess, refetch }
  }
  return { data: [], isLoading, isSuccess, refetch }
}

export const useCalcAUMLimit = (underlyingToken: AddressType) => {
  const AllProtocolContract = useAllProtocolContract()
  const { getTokenByAddress } = useToken()
  const { wChainToken } = useWChainToken()
  const _amount = getUnitAmount(String(1), 18)

  if (underlyingToken === zeroAddress) {
    underlyingToken = wChainToken.address
  }

  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...AllProtocolContract,
    functionName: 'calcAUMLimit',
    args: [underlyingToken, _amount]
  }) as { data: bigint; isSuccess: boolean; isLoading: boolean; refetch: () => void }
  // console.log(data, isLoading, isSuccess)

  if (!isLoading && isSuccess) {
    const { decimals } = getTokenByAddress(underlyingToken)

    return {
      data: Number(safeInterceptionValues(data, decimals, decimals)),
      isLoading,
      isSuccess,
      refetch
    }
  }
  return { data: 20, isLoading, isSuccess, refetch }
}

export const useCreateVault = () => {
  const AllProtocolContract = useAllProtocolContract()
  const { getTokenByAddress, getTokenByName } = useToken()
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { wChainToken } = useWChainToken()
  const ALLTOKEN = getTokenByName('ALLTOKEN')
  const { onAllowance } = useAllowance()
  const { onWaitReceipt } = useWaitReceipt()

  const onCreateVault = async (
    data: CreateVaultDataType,
    account: AddressType,
    callback?: () => void
  ) => {
    const notifyId = await createNotify({ type: 'loading', content: 'Create Vault' })
    const args = calcCaeateVaultData(data, getTokenByAddress, wChainToken.address)
    const allowance = await onAllowance(
      ALLTOKEN.address,
      AllProtocolContract.address,
      getUnitAmount(data.stakeAmount, ALLTOKEN.decimals),
      notifyId
    )
    if (!allowance) return
    writeContract(
      {
        ...AllProtocolContract,
        functionName: 'createVault',
        args,
        account
      },
      {
        onSuccess: async (hash: AddressType) => {
          await onWaitReceipt(hash)
          callback?.()
          updateNotifyItem(notifyId, { title: 'Create Vault', type: 'success', hash })
        },
        onError: (error: any) => {
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

export const useUpdateVault = () => {
  const AllProtocolContract = useAllProtocolContract()
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onUpdateVault = async (
    vaultAddress: AddressType,
    data: UpdateVaultDataType,
    account: AddressType,
    callback?: () => void
  ) => {
    const notifyId = await createNotify({ type: 'loading', content: 'Set Vault Base Info' })
    const upData = calcUpdateVaultData(data)

    writeContract(
      {
        ...AllProtocolContract,
        functionName: 'updateVault',
        args: [vaultAddress, upData],
        account
      },
      {
        onSuccess: async (hash: AddressType) => {
          await onWaitReceipt(hash)
          callback?.()
          updateNotifyItem(notifyId, { title: 'Set Vault Base Info', type: 'success', hash })
        },
        onError: (error: any) => {
          //onError
          updateNotifyItem(notifyId, {
            title: 'Set Vault Base Info',
            type: 'error',
            content: error.shortMessage
          })
        }
      }
    )
  }
  return { onUpdateVault }
}

//vault可取消质押的最大数量
export const useVaultUnstakeLimit = (vaultAddress: AddressType) => {
  const AllProtocolContract = useAllProtocolContract()
  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...AllProtocolContract,
    functionName: 'vaultUnstakeLimit',
    args: [vaultAddress]
  }) as { data: bigint; isSuccess: boolean; isLoading: boolean; refetch: () => void }
  if (!isLoading && isSuccess) {
    return { data: Number(safeInterceptionValues(data, 4, 18)), isLoading, isSuccess, refetch }
  }
  return { data: 0, isLoading, isSuccess, refetch }
}

export const useVaultChangeStakeALL = () => {
  const AllProtocolContract = useAllProtocolContract()
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onWaitReceipt } = useWaitReceipt()

  const onVaultChangeStakeALL = async (
    vaultAddress: AddressType,
    amount: number,
    direction: VaultStakeType,
    account: AddressType,
    callback?: () => void
  ) => {
    const _amount = getUnitAmount(amount, 18)

    const notifyId = await createNotify({
      type: 'loading',
      content: 'Change Vault Stake ALL Token'
    })
    // console.log(direction === 'increase' ? 'stake' : 'unstake')
    writeContract(
      {
        ...AllProtocolContract,
        functionName: direction === 'increase' ? 'stake' : 'unstake',
        args: [vaultAddress, _amount],
        account
      },
      {
        onSuccess: async (hash: AddressType) => {
          await onWaitReceipt(hash)
          callback?.()
          updateNotifyItem(notifyId, {
            title: 'Change Vault Stake ALL Token',
            type: 'success',
            hash
          })
        },
        onError: (error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Change Vault Stake ALL Token',
            type: 'error',
            content: error.shortMessage
          })
        }
      }
    )
  }
  return { onVaultChangeStakeALL }
}
