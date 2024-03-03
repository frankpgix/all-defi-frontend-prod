import { useReadContract } from 'wagmi'
import { AddressType } from '@/types/base'
import { useVaultContract } from '@/hooks/useContract'

// import { VaultBaseInfoProps } from '@/types/vault'
import { calcVaultBaseInfo } from '@/compute/vault'
import { VaultBaseInfoDefault } from '@/data/vault'

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
