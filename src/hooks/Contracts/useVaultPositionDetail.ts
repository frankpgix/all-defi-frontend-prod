import { useReadContracts } from 'wagmi'

import AaveV3PositionAbi from '@/config/abi/PositionDetail/AaveV3Position.json'
import GMXEarnPositionAbi from '@/config/abi/PositionDetail/GMXEarnPosition.json'
import GMXTradePositionAbi from '@/config/abi/PositionDetail/GMXTradePosition.json'
import UniV3NonfungiblePositionAbi from '@/config/abi/PositionDetail/UniV3NonfungiblePosition.json'
import { getContractAddress } from '@/config/contracts'

import { useToken } from '@/hooks/useToken'

import { AddressType, TokenTypes } from '@/types/base'
import {
  GMXEarnDetailTypes,
  GMXTradePositionTypes,
  UniLPDetailTypes
} from '@/types/vaultPositionDetail'

import {
  calcAaveV3Position,
  calcGMXEarnPosition,
  calcGMXTradePosition,
  calcUniV3NonfungiblePosition
} from '@/compute/vaultPositionDetail'

export const userVaultPositionDetail = (vaultAddress: AddressType, underlyingToken: TokenTypes) => {
  const { getTokenByAddress } = useToken()
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
    // console.log(data)
    const uniDetail = calcUniV3NonfungiblePosition(
      data[0].result as any[],
      underlyingToken,
      getTokenByAddress
    )
    const avveDetail = calcAaveV3Position(data[1].result as any, underlyingToken, getTokenByAddress)
    const GMXTradeDetail = calcGMXTradePosition(data[2].result as any[], getTokenByAddress)
    const GMXEarnDetail = calcGMXEarnPosition(data[3].result as any, underlyingToken)
    return { data: { uniDetail, avveDetail, GMXTradeDetail, GMXEarnDetail }, isLoading, isSuccess }
  }

  return {
    data: {
      uniDetail: [] as UniLPDetailTypes[],
      avveDetail: null,
      GMXTradeDetail: [] as GMXTradePositionTypes[],
      GMXEarnDetail: [] as GMXEarnDetailTypes[]
    },
    isLoading,
    isSuccess
  }
}
