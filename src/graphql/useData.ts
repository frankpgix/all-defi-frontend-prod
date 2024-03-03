import { useQuery, useLazyQuery } from '@apollo/client'
import { safeInterceptionValues, createArrayByNumber } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'
import { uniq, last } from 'lodash'
// import { useMemo } from 'react'
import BN from 'bignumber.js'
import { sum } from '@/utils/tools'
import { useEffect, useCallback } from 'react'
// import { useDebounceEffect, useMount } from 'ahooks'
import { toLower } from 'lodash'
import {
  calcFundDatasGql,
  calcMiningData,
  calcFundDetailChartGQL,
  calcVaultListGQL
  // calcManageFundsData,
  // calcManageFundDetailData,
  // calcMiningTotalDataGQL
} from './calcGql'

import { FundDataProps } from './types'
import { removeZeroKeys } from './tools'
import { FundDetailProps } from '@/class/help'

export const useFundData = (gql: any, timeType: string, decimals: number, precision: number) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.fund10MinutelyDatas ?? sData?.fundHourlyDatas ?? sData?.fundDailyDatas ?? [])
    .map((item: FundDataProps) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(item.nav, precision, decimals))
    }))
    .reverse()

  if (timeType === 'MONTH') {
    const mData = data
      .map((item: FundDataProps, index: number) => (index % 6 === 0 ? item : null))
      .filter((item: FundDataProps) => item)
    return { loading, error, data: mData }
  }

  return { loading, error, data }
}

export const useMiningData = (gql: any, fundsName: string[], timeType: string) => {
  const [getData, { loading: listLoading, error: listError, data: listData }] = useLazyQuery(gql, {
    fetchPolicy: 'cache-first'
  })

  useEffect(() => void getData(), [timeType])

  const sData =
    listData?.fund10MinutelyDatas ?? listData?.fundHourlyDatas ?? listData?.fundDailyDatas ?? []
  const timeArr = uniq(sData.map((item: any) => item.periodStartUnix))
  // console.log(sData, timeArr)
  const data = timeArr.map((time) => {
    const o: Record<string, any> = {
      time: Number(time) * 1000
    }
    const ss: any[] = sData.filter((item: any) => item.periodStartUnix === time)
    fundsName.forEach((name: string) => {
      const fund = ss.find((item: any) => item.name === name)
      if (fund) {
        const baseToken = getTokenByAddress(fund.baseToken)
        // console.log(baseToken)
        const amount = fund
          ? safeInterceptionValues(fund.miningAmount, baseToken.decimals, baseToken.decimals)
          : 0
        // todo ,这里需要USD价格
        const price = fund ? safeInterceptionValues(fund.sharePrice, 18, 18) : 0
        // console.log(safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18))
        const baseTokenPriceInUSD = fund
          ? safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18)
          : 0
        const value = BN(amount).times(price).times(baseTokenPriceInUSD).toNumber()
        o[name] = value
      }
    })
    return o
  })
  // console.log(removeZeroKeys(data))
  // console.log(data)
  return {
    loading: listLoading,
    error: listError,
    data: removeZeroKeys(data)
  }
  // return {}
  // return { loading: true, error: null, data: [], count: 0 }
}
// export const useMiningData = (type: string) => {
//   // console.log(type)
//   const { loading: fundLoading, error: fundError, data: fundData } = useQuery(calcFundListGQL())
//   // console.log(fundData)
//   const funds = (fundData?.funds ?? []).map((item: any) => item.id)
//   const fundsName = (fundData?.funds ?? []).map((item: any) => item.name)
//   const cTime = Math.min(...(fundData?.funds ?? []).map((item: any) => item.createTime))
//   const {
//     loading: listLoading,
//     error: listError,
//     data: listData
//   } = useQuery(calcMiningData(JSON.stringify(funds), type, cTime))

//   // console.log(listData)
//   //
//   const sData =
//     listData?.fund10MinutelyDatas ?? listData?.fundHourlyDatas ?? listData?.fundDailyDatas ?? []
//   const timeArr = uniq(sData.map((item: any) => item.periodStartUnix))

//   // console.log(timeArr)
//   const data = timeArr.map((time) => {
//     const o: Record<string, any> = {
//       time: Number(time) * 1000
//     }
//     const ss = sData.filter((item: any) => item.periodStartUnix === time)
//     fundsName.forEach((name: string) => {
//       const fund = ss.find((item: any) => item.name === name)
//       console.log(1234, fund)
//       const amount = fund ? safeInterceptionValues(fund.miningAmount, 2, 18) : 0
//       // todo ,这里需要USD价格
//       const price = fund ? safeInterceptionValues(fund.sharePrice, 2, 18) : 0
//       // console.log(safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18))
//       const baseTokenPriceInUSD = fund
//         ? safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18)
//         : 0
//       const value = BN(amount).times(price).times(baseTokenPriceInUSD).toNumber()
//       o[name] = value
//     })
//     return o
//   })
//   // console.log(removeZeroKeys(data))
//   return {
//     loading: fundLoading || listLoading,
//     error: fundError || listError,
//     data: removeZeroKeys(data)
//   }
//   // return {}
// }

// export const useMiningTotalData = () => {
//   const { loading, error, data: sData } = useQuery(calcMiningTotalDataGQL())
//   console.log(sData)
//   const arr = (sData?.fund10MinutelyDatas ?? []).map((fund: any) => {
//     const amount = safeInterceptionValues(fund.miningAmount, 18, 18)
//     const price = safeInterceptionValues(fund.sharePrice, 18, 18)
//     const baseTokenPriceInUSD = safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18)
//     const value = BN(amount).times(price).times(baseTokenPriceInUSD).toNumber()
//     console.log(amount, price, baseTokenPriceInUSD)

//     return value
//   })

//   const total = sum(arr)
//   console.log(arr, total)
//   return { data: 0, loading }
// }

export const useFundDetailChartData = (
  fundAddress: string,
  timeType: 'current epoch' | '3 Epochs' | 'all',
  fundData: FundDetailProps
) => {
  const calcEpochs = (): number[] => {
    if (timeType === 'current epoch') return [fundData.epochIndex]
    if (timeType === '3 Epochs')
      return Array.from(
        new Set([
          Math.max(fundData.epochIndex - 2, 0),
          Math.max(fundData.epochIndex - 1, 0),
          fundData.epochIndex
        ])
      )
    return createArrayByNumber(fundData.epochIndex)
  }
  const epochs = calcEpochs()
  const {
    loading,
    error,
    data: sData
  } = useQuery(
    calcFundDetailChartGQL(fundAddress, epochs, fundData.epochStartTime, fundData.createTime)
  )
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
      data: data.filter((_: any, index: number) => index % remainder === 0)
    }
  }
  return { loading, error, data }
}

export const useManagerFundData = (gql: any, fundData: any[], startTime: number, type: string) => {
  // 获取基金经理所属基金
  const funds = (fundData ?? []).map((item: any) => toLower(item.address))

  const {
    loading,
    error,
    data: detailData
  } = useQuery(gql, {
    fetchPolicy: 'cache-first'
  })
  // 把各个基金的数据进行拆分
  const o: Record<string, any> = {}
  const sData =
    detailData?.fundHourlyDatas ??
    detailData?.fundDailyDatas ??
    detailData?.fund10MinutelyDatas ??
    []

  funds.forEach((fundName: string) => {
    o[fundName] = sData.filter((item: any) => item.fundId === fundName)
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
      const aums = sData
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
  return { loading, error, data, count }

  // return { loading: true, error: null, data: [], count: 0 }
}

export const useVaultListData = (): { loading: boolean; data: any[]; error: any } => {
  const {
    loading,
    error,
    data: sData
  } = useQuery(calcVaultListGQL(), {
    fetchPolicy: 'no-cache'
  })

  console.log(sData, 'sData')
  const data = (sData?.vaults ?? [])
    .map((item: any) => {
      const baseToken = getTokenByAddress(item.underlyingToken)
      return {
        name: item.name,
        managerName: item.managerName,
        epoch: item.epochIndex,
        address: item.id,
        aum: safeInterceptionValues(item.beginningAUM, baseToken.precision, baseToken.decimals),
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
        baseToken,
        status: item.stage,
        verified: item.stage !== 0
      }
    })
    .filter((item: any) => item.verified === true)
  return { loading, data, error }
}
