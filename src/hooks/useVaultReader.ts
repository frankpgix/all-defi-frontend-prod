import { useReadContract } from 'wagmi'
import { useVaultReaderContract } from '@/hooks/useContract'
import { AddressType } from '@/types/base'
import { VaultDetailDefault } from '@/data/vault'
import { calcVaultDetail } from '@/compute/vault'

const VaultReaderContract = useVaultReaderContract()

export const useVaultDetail = (vaultAddress: AddressType) => {
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultDetail',
    args: [vaultAddress]
  })
  if (!isLoading && isSuccess) {
    return { data: calcVaultDetail(data), isLoading, isSuccess, refetch }
  }
  return { data: VaultDetailDefault, isLoading, isSuccess, refetch }
}
