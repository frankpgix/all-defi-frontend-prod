import { useReadContracts } from 'wagmi'
import Token from '@/class/Token'
import { getContractAddress } from '@/config/contracts'
import { AddressType } from '@/types/base'
// import { safeInterceptionValues } from '@/utils/tools'
// userVaultPositionDetail
import UniV3NonfungiblePositionAbi from '@/config/abi/PositionDetail/UniV3NonfungiblePosition.json'
import AaveV3PositionAbi from '@/config/abi/PositionDetail/AaveV3Position.json'
import GMXTradePositionAbi from '@/config/abi/PositionDetail/GMXTradePosition.json'
import GMXEarnPositionAbi from '@/config/abi/PositionDetail/GMXEarnPosition.json'

import { calcUniV3NonfungiblePosition } from '@/compute/vaultPositionDetail'
import { UniLPDetailTypes } from '@/types/vaultPositionDetail'

export const userVaultPositionDetail = (vaultAddress: AddressType, underlyingToken: Token) => {
  const { data, isLoading, isSuccess } = useReadContracts({
    contracts: [
      {
        address: getContractAddress('UniV3NonfungiblePosition'),
        abi: UniV3NonfungiblePositionAbi,
        functionName: 'detail',
        args: [vaultAddress]
      },
      {
        address: getContractAddress('AaveV3Position'),
        abi: AaveV3PositionAbi,
        functionName: 'detail',
        args: [vaultAddress]
      },
      {
        address: getContractAddress('GMXTradePosition'),
        abi: GMXTradePositionAbi,
        functionName: 'detail',
        args: [vaultAddress]
      },
      {
        address: getContractAddress('GMXEarnPosition'),
        abi: GMXEarnPositionAbi,
        functionName: 'detail',
        args: [vaultAddress]
      }
    ]
  })

  if (!isLoading && isSuccess) {
    console.log(data)
    const uniDetail = calcUniV3NonfungiblePosition(data[0].result as any[], underlyingToken)
    return { data: { uniDetail }, isLoading, isSuccess }
  }

  return { data: { uniDetail: [] as UniLPDetailTypes[] }, isLoading, isSuccess }
}
