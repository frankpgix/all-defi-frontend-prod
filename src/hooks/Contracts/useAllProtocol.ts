import { useReadContract, useWriteContract } from 'wagmi'
import { tokens, ZERO_ADDRESS, getTokenByAddress } from '@/config/tokens'
import { useAllProtocolContract } from '@/hooks/Contracts/useContract'
import { useAssetPrice, useAssetPriceUSD } from '@/hooks/Contracts/useVaultFactory'
import { AddressType } from '@/types/base'
import { safeInterceptionValues, getUnitAmount } from '@/utils/tools'
import { calcVaultStakedALL, calcVaultDerivativesInfo } from '@/compute/vault'
import { calcCaeateVaultData, calcUpdateVaultData } from '@/compute/caeateVault'
import { VaultStakeDataDefault } from '@/data/vault'
import { CreateVaultDataType, UpdateVaultDataType } from '@/types/createVault'
import { VaultStakeType } from '@/types/vault'
import { useNotify } from '@/hooks/useNotify'

const AllProtocolContract = useAllProtocolContract()

export const useAllTokenPrice = (baseToken: AddressType) => {
  if (baseToken === ZERO_ADDRESS) {
    baseToken = tokens.WETH.address
  }
  return useAssetPrice(tokens.ALLTOKEN.address, baseToken)
}

export const useAllTokenPriceInUSD = () => {
  return useAssetPriceUSD(tokens.ALLTOKEN.address)
}

export const useVaultCountLimit = (address?: AddressType | '') => {
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
  const _amount = getUnitAmount(String(1), 18)

  if (underlyingToken === ZERO_ADDRESS) {
    underlyingToken = tokens.WETH.address
  }

  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...AllProtocolContract,
    functionName: 'calcAUMLimit',
    args: [underlyingToken, _amount]
  }) as { data: bigint; isSuccess: boolean; isLoading: boolean; refetch: () => void }
  console.log(data, isLoading, isSuccess)
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
  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onCreateVault = async (
    data: CreateVaultDataType,
    account: AddressType,
    callback: () => void
  ) => {
    const notifyId = await createNotify({ type: 'loading', content: 'Create Vault' })
    const args = calcCaeateVaultData(data)
    await writeContractAsync({
      ...AllProtocolContract,
      functionName: 'createVault',
      args,
      account
    })
      .then((hash: string) => {
        // console.log(hash)
        updateNotifyItem(notifyId, { title: 'Create Vault', type: 'success', hash })
        callback()
      })
      .catch((error: any) => {
        updateNotifyItem(notifyId, {
          title: 'Create Vault',
          type: 'error',
          content: error.shortMessage
        })
      })
  }
  return { onCreateVault }
}

export const useUpdateVault = () => {
  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onUpdateVault = async (
    vaultAddress: AddressType,
    data: UpdateVaultDataType,
    account: AddressType,
    callback: () => void
  ) => {
    const notifyId = await createNotify({ type: 'loading', content: 'Set Vault Base Info' })
    const upData = calcUpdateVaultData(data)
    await writeContractAsync({
      ...AllProtocolContract,
      functionName: 'updateVault',
      args: [vaultAddress, upData],
      account
    })
      .then((hash: string) => {
        // console.log(hash)
        updateNotifyItem(notifyId, { title: 'Set Vault Base Info', type: 'success', hash })
        callback()
      })
      .catch((error: any) => {
        updateNotifyItem(notifyId, {
          title: 'Set Vault Base Info',
          type: 'error',
          content: error.shortMessage
        })
      })
  }
  return { onUpdateVault }
}

//vault可取消质押的最大数量
export const useVaultUnstakeLimit = (vaultAddress: AddressType) => {
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
  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onVaultChangeStakeALL = async (
    vaultAddress: AddressType,
    amount: number,
    direction: VaultStakeType,
    account: AddressType,
    callback: () => void
  ) => {
    const _amount = getUnitAmount(amount, 18)

    const notifyId = await createNotify({
      type: 'loading',
      content: 'Change Vault Stake ALL Token'
    })
    console.log(direction === 'increase' ? 'stake' : 'unstake')
    await writeContractAsync({
      ...AllProtocolContract,
      functionName: direction === 'increase' ? 'stake' : 'unstake',
      args: [vaultAddress, _amount],
      account
    })
      .then((hash: string) => {
        updateNotifyItem(notifyId, { title: 'Change Vault Stake ALL Token', type: 'success', hash })
        callback()
      })
      .catch((error: any) => {
        updateNotifyItem(notifyId, {
          title: 'Change Vault Stake ALL Token',
          type: 'error',
          content: error.shortMessage
        })
      })
  }
  return { onVaultChangeStakeALL }
}
