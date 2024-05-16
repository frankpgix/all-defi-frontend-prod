import { hexToString } from 'viem'

import { useQuery } from '@apollo/client'

import { useToken } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { ACBuyDataTypes, UserDepositDataTypes, VaultUserActionsItemTypes } from '@/types/graphql'

import { safeInterceptionValues } from '@/utils/tools'

import { calcUserDepositDataGql } from './calcGql'
import {
  calcUserACBuyGQL,
  calcUserVaultHistoryGQL,
  calcVaultActionAssetGQL,
  calcVaultAllocationOrWithholdGQL
} from './gqls'
import { ActionType, calcActionData, calcUserVaultHistoryData } from './help'

export const useVaultAllocationData = (vaultAddress: string) => {
  const { getTokenByAddress } = useToken()
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
    calcActionData(item, getTokenByAddress)
  )
  // console.log(data, sData?.fundUserActions)
  return { loading, error, data }
}

export const useVaultWithholdData = (fundAddress: string) => {
  const { getTokenByAddress } = useToken()
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
    calcActionData(item, getTokenByAddress)
  )
  // console.log(data, sData?.fundUserActions)
  return { loading, error, data }
}

export const useUserVaultHistoryData = (userAddress: string, fundAddress?: string) => {
  const { getTokenByAddress } = useToken()
  const {
    loading,
    error,
    data: sData,
    refetch
  } = useQuery(calcUserVaultHistoryGQL(userAddress, fundAddress))
  const data = calcUserVaultHistoryData(sData, getTokenByAddress)
  return { loading, error, data, refetch }
}

export const useUserACBuyData = (userAddress: string) => {
  const { getTokenByAddress } = useToken()
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

export const useUserDepositData = (userAddress: string) => {
  const { getTokenByAddress } = useToken()
  const {
    loading,
    error,
    data: sData,
    refetch
  } = useQuery(calcUserDepositDataGql(userAddress), {
    // 忽略缓存，总是从网络获取数据
    fetchPolicy: 'no-cache'
  })
  // console.log(111222, error, sData)
  // getTokenByAddress
  const data = (sData?.deposits ?? []).map((item: UserDepositDataTypes) => {
    const token = getTokenByAddress(item.underlying)
    console.log(111, token, item)
    return {
      id: item.id,
      amount: Number(safeInterceptionValues(item.amount, token.decimals, token.decimals)),
      tokenName: token.name,
      hash: item.id.split('-')[0],
      user: item.user,
      lockDuration: item.lockDuration,
      timestamp: item.timestamp * 1000,
      depositId: item.depositId,
      underlying: item.underlying,
      token
    }
  })
  return { loading, error, data, refetch }
}

export const useVaultActionAssetData = (fundAddress: string) => {
  const { getTokenByAddress } = useToken()
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
