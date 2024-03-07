import { useQuery } from '@apollo/client'
import { hexToString } from 'viem'

import { getTokenByAddress } from '@/config/tokens'
import { safeInterceptionValues } from '@/utils/tools'
import {
  calcVaultAllocationOrWithholdGQL,
  calcUserVaultHistoryGQL,
  calcUserACBuyGQL,
  calcVaultActionAssetGQL
} from './gqls'

import { calcUserVaultHistoryData, ActionType, calcActionData } from './help'
import { AddressType } from '@/types/base'
import { VaultUserActionsItemTypes, ACBuyDataTypes } from '@/types/graphql'

export const useVaultAllocationData = (vaultAddress: string) => {
  const {
    loading,
    error,
    data: sData
  } = useQuery(
    calcVaultAllocationOrWithholdGQL(vaultAddress, [
      ActionType['Allocate'],
      ActionType['Cancel Allocate']
    ])
  )
  const data = (sData?.vaultUserActions ?? []).map((item: VaultUserActionsItemTypes) =>
    calcActionData(item)
  )
  // console.log(data, sData?.fundUserActions)
  return { loading, error, data }
}

export const useVaultWithholdData = (fundAddress: string) => {
  const {
    loading,
    error,
    data: sData
  } = useQuery(
    calcVaultAllocationOrWithholdGQL(fundAddress, [
      ActionType['Withhold'],
      ActionType['Cancel Withhold']
    ])
  )
  const data = (sData?.vaultUserActions ?? []).map((item: VaultUserActionsItemTypes) =>
    calcActionData(item)
  )
  // console.log(data, sData?.fundUserActions)
  return { loading, error, data }
}

export const useUserVaultHistoryData = (userAddress: string, fundAddress?: string) => {
  const {
    loading,
    error,
    data: sData,
    refetch
  } = useQuery(calcUserVaultHistoryGQL(userAddress, fundAddress))
  const data = calcUserVaultHistoryData(sData)
  return { loading, error, data, refetch }
}

export const useUserACBuyData = (userAddress: string) => {
  const {
    loading,
    error,
    data: sData,
    refetch
  } = useQuery(calcUserACBuyGQL(userAddress), {
    // 忽略缓存，总是从网络获取数据
    fetchPolicy: 'no-cache'
  })
  // getTokenByAddress
  const data = (sData?.acbuys ?? []).map((item: ACBuyDataTypes) => {
    const token = getTokenByAddress(item.underlyingToken)
    // console.log(111, token, item)
    return {
      amount: Number(safeInterceptionValues(item.amount, token.decimals, token.decimals)),
      tokenName: token.name,
      sallAmount: Number(safeInterceptionValues(item.sallAmount, 4, 18)),
      hash: item.id.split('-')[0],
      investor: item.investor,
      timestamp: item.timestamp * 1000
    }
  })
  return { loading, error, data, refetch }
}

export const useVaultActionAssetData = (fundAddress: string) => {
  const { loading, error, data: sData } = useQuery(calcVaultActionAssetGQL(fundAddress))
  const data = (sData?.vaultActionAssets ?? [])
    .map((item: any) => {
      return {
        id: item.id.split('-')[0],
        derivative: hexToString(item.derivative, { size: 32 }),
        method: item.method,
        income: item.incomingAssets.map((tokenAddress: AddressType, index: number) => {
          const token = getTokenByAddress(tokenAddress)
          return {
            token,
            value: Number(
              safeInterceptionValues(
                item.incomingAssetsAmmounts[index],
                token.precision,
                token.decimals
              )
            )
          }
        }),
        out: item.spendAssets.map((tokenAddress: AddressType, index: number) => {
          const token = getTokenByAddress(tokenAddress)
          return {
            token,
            value: Number(
              safeInterceptionValues(
                item.spendAssetsAmmounts[index],
                token.precision,
                token.decimals
              )
            )
          }
        }),
        timestamp: item.timestamp * 1000
      }
    })
    .filter((item: any) => item.income.length > 0 || item.out.length > 0)

  // console.log(222, JSON.stringify(sData, null, '  '))
  return { loading, error, data }
}
