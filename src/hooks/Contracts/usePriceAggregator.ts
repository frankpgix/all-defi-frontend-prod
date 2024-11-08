import { useReadContract } from 'wagmi'

import { useVaultFactoryContract } from '@/hooks/Contracts/useContract'

import { AddressType } from '@/types/base'

import { safeInterceptionValues } from '@/utils/tools'

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
