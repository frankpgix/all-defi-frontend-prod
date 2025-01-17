import { useQuery } from '@apollo/client'
import { safeInterceptionValues, createArrayByNumber } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'
import { uniq, last, sum } from 'lodash'
import BN from 'bignumber.js'

import {
  calcFundDatasGql,
  calcMiningData,
  calcFundDetailChartGQL,
  calcManageFundsData,
  calcManageFundDetailData
} from './calcGql'
import { FundDataProps } from './types'
import { removeZeroKeys } from './tools'
import { calcFundListGQL } from './gqls'
import { FundBaseProps, FundDetailProps } from '@/class/help'

export const useFundData = (fundAddress: string, type: string, decimals: number, createTime: number) => {
  // const gql = calcFundDatasGql(fundAddress, type, createTime)
  // console.log(gql)
  // const baseToken = getTokenByAddress(fundAddress)
  const { loading, error, data: sData } = useQuery(calcFundDatasGql(fundAddress, type, createTime))
  // console.log(11111, baseToken, sData?.fundHourlyDatas)
  const data = (sData?.fund10MinutelyDatas ?? sData?.fundHourlyDatas ?? sData?.fundDailyDatas ?? [])
    .map((item: FundDataProps) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(item.nav, decimals, decimals))
    }))
    .reverse()
  return { loading, error, data }
}

export const useMiningData = (type: string) => {
  // console.log(type)
  const { loading: fundLoading, error: fundError, data: fundData } = useQuery(calcFundListGQL())
  // console.log(fundData)
  const funds = (fundData?.funds ?? []).map((item: any) => item.id)
  const fundsName = (fundData?.funds ?? []).map((item: any) => item.name)
  const cTime = Math.min(...(fundData?.funds ?? []).map((item: any) => item.createTime))
  const {
    loading: listLoading,
    error: listError,
    data: listData
  } = useQuery(calcMiningData(JSON.stringify(funds), type, cTime))

  // console.log(listData)
  //
  const sData = listData?.fund10MinutelyDatas ?? listData?.fundHourlyDatas ?? listData?.fundDailyDatas ?? []
  const timeArr = uniq(sData.map((item: any) => item.periodStartUnix))

  // console.log(timeArr)
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
      const baseTokenPriceInUSD = fund ? safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18) : 0
      const value = BN(amount).times(price).times(baseTokenPriceInUSD).toNumber()
      o[name] = value
    })
    return o
  })
  // console.log(removeZeroKeys(data))
  return { loading: fundLoading || listLoading, error: fundError || listError, data: removeZeroKeys(data) }
  // return {}
}

export const useFundDetailChartData = (
  fundAddress: string,
  timeType: 'current epoch' | '3 Epochs' | 'all',
  fundData: FundDetailProps
) => {
  const calcEpochs = (): number[] => {
    if (timeType === 'current epoch') return [fundData.epochIndex]
    if (timeType === '3 Epochs')
      return Array.from(
        new Set([Math.max(fundData.epochIndex - 2, 0), Math.max(fundData.epochIndex - 1, 0), fundData.epochIndex])
      )
    return createArrayByNumber(fundData.epochIndex)
  }
  const epochs = calcEpochs()
  const {
    loading,
    error,
    data: sData
  } = useQuery(calcFundDetailChartGQL(fundAddress, epochs, fundData.epochStartTime, fundData.createTime))
  const data = (sData?.fundHourlyDatas ?? sData?.fundDailyDatas ?? sData?.fund10MinutelyDatas ?? [])
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

export const useManagerFundData = (managerAddress: string, type: string) => {
  // 获取基金经理所属基金
  const { loading: fundLoading, error: fundError, data: fundData } = useQuery(calcManageFundsData(managerAddress))
  // console.log(11222, fundData)

  const funds = (fundData?.funds ?? []).map((item: any) => item.id)
  const startTime = Math.max(...(fundData?.funds ?? []).map((item: any) => item.createTime), 0)
  // console.log(333, startTime)
  // createTime
  // 获取基金经理全部数据
  const {
    loading: detailLoading,
    error: detailError,
    data: detailData
  } = useQuery(calcManageFundDetailData(JSON.stringify(funds), type, startTime))
  // console.log(11222, detailData)
  // 把各个基金的数据进行拆分
  const o: Record<string, any> = {}
  funds.forEach((fundName: string) => {
    o[fundName] = (detailData?.fundHourlyDatas ?? []).filter((item: any) => item.fundId === fundName)
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
          const nav = Number(safeInterceptionValues(fund.nav, baseToken.precision, baseToken.decimals))
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
