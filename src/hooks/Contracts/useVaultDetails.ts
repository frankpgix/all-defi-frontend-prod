import { useReadContracts } from 'wagmi'

import {
  // useAllProtocolContract,
  useVaultContract,
  useVaultReaderContract
} from '@/hooks/Contracts/useContract'
import { useToken } from '@/hooks/useToken'

// import { useVaultList as useVaultListHook } from '@/hooks/useVaultList'
import { AddressType } from '@/types/base'

import {
  calcVaultBaseInfo,
  calcVaultBreachDetail,
  calcVaultDetail, // calcVaultStakedALL,
  calcVaultUserDetail
} from '@/compute/vault'
import {
  ShareCompositionDefault,
  VaultBaseInfoDefault,
  VaultBreachDetailDataDefault,
  VaultDetailDefault,
  VaultStakeDataDefault,
  VaultUserDetailDefault
} from '@/data/vault'

export const useVaultManageDetails = (vaultAddress: AddressType) => {
  const { getTokenByAddress } = useToken()

  const VaultContract = useVaultContract(vaultAddress)
  const VaultReaderContract = useVaultReaderContract()
  // const AllProtocolContract = useAllProtocolContract()
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
        // },
        // {
        //   ...AllProtocolContract,
        //   functionName: 'vaultStakedALL',
        //   args: [vaultAddress]
      }
    ]
  }) as {
    data: [
      { result: any; status: string },
      { result: any; status: string },
      { result: any; status: string }
      // { result: bigint[]; status: string }
    ]
    isLoading: boolean
    isSuccess: boolean
    refetch: () => {}
  }

  if (!isLoading && isSuccess) {
    const baseInfo =
      data[0].status === 'success'
        ? calcVaultBaseInfo(data[0].result, getTokenByAddress, vaultAddress)
        : VaultBaseInfoDefault
    const vaultDetail =
      data[1].status === 'success'
        ? calcVaultDetail(data[1].result, getTokenByAddress)
        : VaultDetailDefault
    const vaultBreachDetail =
      data[2].status === 'success'
        ? calcVaultBreachDetail(data[2].result)
        : VaultBreachDetailDataDefault
    const vaultStakedALL = VaultStakeDataDefault
    // data[3].status === 'success' ? calcVaultStakedALL(data[3].result) : VaultStakeDataDefault
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
}

export const useVaultDetails = (vaultAddress: AddressType, account: AddressType) => {
  const { getTokenByAddress } = useToken()
  // const { account } = useProfile()
  const VaultContract = useVaultContract(vaultAddress)
  const VaultReaderContract = useVaultReaderContract()
  console.log(vaultAddress, 'vaultAddress', account, 'account', VaultContract, VaultReaderContract)
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
        functionName: 'userDetail',
        args: [vaultAddress, account]
      }
    ]
  }) as {
    data: [
      { result: any; status: string },
      { result: any; status: string },
      { result: any; status: string }
    ]
    isLoading: boolean
    isSuccess: boolean
    refetch: () => {}
  }
  if (!isLoading && isSuccess) {
    const baseInfo =
      data[0].status === 'success'
        ? calcVaultBaseInfo(data[0].result, getTokenByAddress, vaultAddress)
        : VaultBaseInfoDefault
    const vaultDetail =
      data[1].status === 'success'
        ? calcVaultDetail(data[1].result, getTokenByAddress)
        : VaultDetailDefault
    const vaultUserDetail =
      data[2].status === 'success'
        ? calcVaultUserDetail(data[2].result, getTokenByAddress, vaultDetail.underlyingPriceInUSD)
        : VaultUserDetailDefault

    console.log(baseInfo, vaultDetail, vaultUserDetail, 'baseInfo, vaultDetail, vaultUserDetail')
    console.log(data, data, data, 'baseInfo, vaultDetail, vaultUserDetail')
    return {
      data: { baseInfo, vaultDetail, vaultUserDetail },
      isLoading,
      isSuccess,
      refetch
    }
  }
  return {
    data: {
      baseInfo: VaultBaseInfoDefault,
      vaultDetail: VaultDetailDefault,
      vaultUserDetail: VaultUserDetailDefault,
      vaultShareComposition: ShareCompositionDefault
    },
    isLoading,
    isSuccess,
    refetch
  }
}
