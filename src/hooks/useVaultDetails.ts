import { useReadContracts } from 'wagmi'
import {
  useVaultContract,
  useVaultReaderContract,
  useAllProtocolContract
} from '@/hooks/useContract'
import {
  calcVaultBaseInfo,
  calcVaultDetail,
  calcVaultBreachDetail,
  calcVaultStakedALL
} from '@/compute/vault'
import {
  VaultBaseInfoDefault,
  VaultDetailDefault,
  VaultBreachDetailDataDefault,
  VaultStakeDataDefault
} from '@/data/vault'
import { AddressType } from '@/types/base'

export const useVaultManageDetails = (vaultAddress: AddressType) => {
  const VaultContract = useVaultContract(vaultAddress)
  const VaultReaderContract = useVaultReaderContract()
  const AllProtocolContract = useAllProtocolContract()
  const { data, isLoading, isSuccess, refetch } = useReadContracts({
    contracts: [
      {
        ...VaultContract,
        functionName: 'baseInfo'
      },
      {
        ...VaultReaderContract,
        functionName: 'vaultDetail',
        args: [vaultAddress]
      },
      {
        ...VaultReaderContract,
        functionName: 'vaultBreachDetail',
        args: [vaultAddress]
      },
      {
        ...AllProtocolContract,
        functionName: 'vaultStakedALL',
        args: [vaultAddress]
      }
    ]
  }) as {
    data: [
      { result: any; status: string },
      { result: any; status: string },
      { result: any; status: string },
      { result: bigint[]; status: string }
    ]
    isLoading: boolean
    isSuccess: boolean
    refetch: () => {}
  }

  if (!isLoading && isSuccess) {
    const baseInfo =
      data[0].status === 'success' ? calcVaultBaseInfo(data[0].result) : VaultBaseInfoDefault
    const vaultDetail =
      data[1].status === 'success' ? calcVaultDetail(data[1].result) : VaultDetailDefault
    const vaultBreachDetail =
      data[2].status === 'success'
        ? calcVaultBreachDetail(data[2].result)
        : VaultBreachDetailDataDefault
    const vaultStakedALL =
      data[3].status === 'success' ? calcVaultStakedALL(data[3].result) : VaultStakeDataDefault
    return {
      data: {
        baseInfo,
        vaultDetail,
        vaultBreachDetail,
        vaultStakedALL
      },
      isLoading,
      isSuccess,
      refetch
    }
  }
  return {
    data: {
      baseInfo: VaultBaseInfoDefault,
      vaultDetail: VaultDetailDefault,
      vaultBreachDetail: VaultBreachDetailDataDefault,
      vaultStakedALL: VaultStakeDataDefault
    },
    isLoading,
    isSuccess,
    refetch
  }

  console.log(data, isLoading, isSuccess)
}
