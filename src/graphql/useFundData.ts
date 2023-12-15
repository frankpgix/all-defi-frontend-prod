import { useQuery } from '@apollo/client'
import BN from 'bignumber.js'
import { sum, last, uniq } from 'lodash'
import { utils } from 'ethers'

import { getTokenByAddress } from '@/config/tokens'
// import { uniSwapClient } from '@/lib/apollo'
import { safeInterceptionValues } from '@/utils/tools'
import { getTypeUnix } from '@/utils/qraphqlTools'

import { FundDataProps, ACBuyDataProps } from './types'
import {
  calcFundHourlyDatasGQL,
  calcFundSubscribesOrRedeemsGQL,
  // calcUniSwapRecordGQL,
  calcFundDetailChartGQL,
  calcFundListGQL,
  calcFundDetailGQL,
  calcManageFundsData,
  calcManageFundDetailData,
  calcUserFundHistoryGQL,
  calcUserACBuyGQL,
  calcMiningData,
  calcFundActionAssetGQL
} from './gqls'

import { calcUserFundHistoryData, ActionType, calcActionData, RecordProps } from './help'

export const useFundListData = () => {
  const {
    loading,
    error,
    data: sData
  } = useQuery(calcFundListGQL(), {
    fetchPolicy: 'no-cache'
  })
  const data = (sData?.funds ?? []).map((item: any) => {
    const baseToken = getTokenByAddress(item.baseToken)
    return {
      name: item.name,
      managerName: item.managerName,
      epoch: item.epochIndex,
      address: item.id,
      aum: safeInterceptionValues(item.aum, baseToken.precision, baseToken.decimals),
      capacityAvailable: safeInterceptionValues(
        item.capacityAvailable,
        baseToken.precision,
        baseToken.decimals
      ),
      apr: safeInterceptionValues(item.currentAPR.split('.')[0], 4, 18),
      dayReturn: safeInterceptionValues(item.dayReturn, 4, 18),
      weekReturn: safeInterceptionValues(item.weekReturn, 4, 18),
      monthReturn: safeInterceptionValues(item.monthReturn, 4, 18),
      yearReturn: safeInterceptionValues(item.yearReturn, 4, 18),
      baseToken
    }
  })
  return { loading, data, error }
}

export const useFundDetail = (address: string) => {
  const { loading, error, data: sData } = useQuery(calcFundDetailGQL(address))
  const data = (sData?.funds ?? []).map((item: any) => {
    const baseToken = getTokenByAddress(item.baseToken)
    return {
      name: item.name,
      epoch: item.epochIndex,
      address: item.id,
      // aum: safeInterceptionValues(item.aum, 4, 18),
      aum: safeInterceptionValues(item.aum, baseToken.precision, baseToken.decimals),
      capacityAvailable: safeInterceptionValues(item.capacityAvailable, 4, 18),
      apr: safeInterceptionValues(item.currentAPR.split('.')[0], 4, 18),
      dayReturn: safeInterceptionValues(item.dayReturn, 4, 18),
      weekReturn: safeInterceptionValues(item.weekReturn, 4, 18),
      monthReturn: safeInterceptionValues(item.monthReturn, 4, 18),
      yearReturn: safeInterceptionValues(item.yearReturn, 4, 18)
    }
  })[0]
  return { loading, data: data ?? {}, error }
}

export const useManagerFundData = (managerAddress: string, type: string) => {
  // 获取基金经理所属基金
  const {
    loading: fundLoading,
    error: fundError,
    data: fundData
  } = useQuery(calcManageFundsData(managerAddress))
  // console.log(11222, fundData)
  const funds = (fundData?.funds ?? []).map((item: any) => item.id)
  // 获取基金经理全部数据
  const {
    loading: detailLoading,
    error: detailError,
    data: detailData
  } = useQuery(calcManageFundDetailData(JSON.stringify(funds), getTypeUnix(type)))
  // console.log(11222, detailData)
  // 把各个基金的数据进行拆分
  const o: Record<string, any> = {}
  funds.forEach((fundName: string) => {
    o[fundName] = (detailData?.fundHourlyDatas ?? []).filter(
      (item: any) => item.fundId === fundName
    )
  })

  // 找到长度最长的基金数据
  let maxLengthFundLength = 0
  let maxLengthFundId = ''
  Object.keys(o).forEach((fundId: string) => {
    if (o[fundId].length > maxLengthFundLength) {
      maxLengthFundLength = o[fundId].length
      maxLengthFundId = fundId
    }
  })

  // 将数据进行处理合并
  const data = (o[maxLengthFundId] ?? [])
    .map((item: any) => {
      const aums = (detailData?.fundHourlyDatas ?? [])
        .filter((fund: any) => fund.periodStartUnix === item.periodStartUnix)
        .map((fund: any) => {
          const baseToken = getTokenByAddress(fund.baseToken)
          const priceUSD = Number(safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18))
          const nav = Number(
            safeInterceptionValues(fund.nav, baseToken.precision, baseToken.decimals)
          )
          const result = BN(priceUSD).times(nav).toNumber()
          // console.log(1111, )
          return result
        })
      // console.log(detailData?.fundHourlyDatas, aums, 111)
      // TODO 更换成 navInUSD
      return {
        time: item.periodStartUnix * 1000,
        value: sum(aums)
      }
    })
    .reverse()
  // console.log(123456, data)
  const count = (last(data) as any)?.value ?? 0
  // const count = data.findLast()?.value ?? 0
  return { loading: fundLoading || detailLoading, error: fundError || detailError, data, count }
}

export const useFundHourData = (fundAddress: string, type: string, decimals: number) => {
  // const baseToken = getTokenByAddress(fundAddress)
  const {
    loading,
    error,
    data: sData
  } = useQuery(calcFundHourlyDatasGQL(fundAddress, getTypeUnix(type)))
  // console.log(11111, baseToken, sData?.fundHourlyDatas)
  const data = (sData?.fundHourlyDatas ?? [])
    .map((item: FundDataProps) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(item.nav, decimals, decimals))
    }))
    .reverse()
  return { loading, error, data }
}

export const useFundDetailChartData = (fundAddress: string, epochs: number[]) => {
  const { loading, error, data: sData } = useQuery(calcFundDetailChartGQL(fundAddress, epochs))
  const data = (sData?.fundHourlyDatas ?? [])
    .map((item: FundDataProps) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(item.sharePrice, 4, 18))
    }))
    .reverse()
  const dataLength = data.length
  // console.log(dataLength)
  if (dataLength > 60) {
    const remainder = ~~(dataLength / 30)
    return {
      loading,
      error,
      data: data.filter((item: any, index: number) => index % remainder === 0)
    }
  }
  return { loading, error, data }
}

export const useFundSubscribesData = (fundAddress: string) => {
  const {
    loading,
    error,
    data: sData
  } = useQuery(
    calcFundSubscribesOrRedeemsGQL(fundAddress, [
      ActionType['Allocate'],
      ActionType['Cancel Allocate']
    ])
  )
  const data = (sData?.fundUserActions ?? []).map((item: RecordProps) => calcActionData(item))
  // console.log(data, sData?.fundUserActions)
  return { loading, error, data }
}

export const useFundRedeemsData = (fundAddress: string) => {
  const {
    loading,
    error,
    data: sData
  } = useQuery(
    calcFundSubscribesOrRedeemsGQL(fundAddress, [
      ActionType['Withhold'],
      ActionType['Cancel Withhold']
    ])
  )
  const data = (sData?.fundUserActions ?? []).map((item: RecordProps) => calcActionData(item))
  // console.log(data, sData?.fundUserActions)
  return { loading, error, data }
}

export const useUserFundHistoryData = (userAddress: string, fundAddress?: string) => {
  const {
    loading,
    error,
    data: sData,
    refetch
  } = useQuery(calcUserFundHistoryGQL(userAddress, fundAddress))
  const data = calcUserFundHistoryData(sData)
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
  const data = (sData?.acbuys ?? []).map((item: ACBuyDataProps) => {
    const token = getTokenByAddress(item.baseToken)
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

export const useMiningData = (type: string) => {
  // console.log(type)
  const { loading: fundLoading, error: fundError, data: fundData } = useQuery(calcFundListGQL())
  const funds = (fundData?.funds ?? []).map((item: any) => item.id)
  const fundsName = (fundData?.funds ?? []).map((item: any) => item.name)
  const cTime = Math.min(...(fundData?.funds ?? []).map((item: any) => item.createTime))
  const {
    loading: listLoading,
    error: listError,
    data: listData
  } = useQuery(calcMiningData(JSON.stringify(funds), getTypeUnix(type, cTime)))

  const sData = listData?.fund10MinutelyDatas ?? []
  const timeArr = uniq(sData.map((item: any) => item.periodStartUnix))
  const data = timeArr.map((time) => {
    const o: Record<string, any> = {
      time: Number(time) * 1000
    }
    const ss = sData.filter((item: any) => item.periodStartUnix === time)
    fundsName.forEach((name: string) => {
      const fund = ss.find((item: any) => item.name === name)
      // console.log(1234, fund)
      const amount = fund ? safeInterceptionValues(fund.miningAmount, 2, 18) : 0
      // todo ,这里需要USD价格
      const price = fund ? safeInterceptionValues(fund.sharePrice, 2, 18) : 0
      const baseTokenPriceInUSD = fund
        ? safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18)
        : 0
      o[name] = BN(amount).times(price).times(baseTokenPriceInUSD).toNumber()
    })
    return o
  })
  // console.log(data)
  return { loading: fundLoading || listLoading, error: fundError || listError, data }
}

export const useFundActionAssetData = (fundAddress: string) => {
  const { loading, error, data: sData } = useQuery(calcFundActionAssetGQL(fundAddress))
  const data = (sData?.fundActionAssets ?? [])
    .map((item: any) => {
      return {
        id: item.id.split('-')[0],
        derivative: utils.parseBytes32String(item.derivative),
        method: item.method,
        income: item.incomingAssets.map((tokenAddress: string, index: number) => {
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
        out: item.spendAssets.map((tokenAddress: string, index: number) => {
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
