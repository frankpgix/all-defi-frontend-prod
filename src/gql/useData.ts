import { useQuery, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import BN from 'bignumber.js'
import { uniq, last, floor } from 'lodash'
import { getTokenByAddress } from '@/config/tokens'
import { safeInterceptionValues, calcDecimalsFloor } from '@/utils/tools'
import { removeZeroKeys } from './help'

export const useManageFundDatas = (gql: any) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.managerIntervalDatas ?? [])
    .map((item: any) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(String(item.navInUSD).split('.')[0], 2, 18))
    }))
    .reverse()

  // @ts-ignore
  const count = last(data)?.value ?? 0

  return { loading, error, data, count }
}

export const useFundData = (gql: any, decimals: number, precision: number) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.fundIntervalDatas ?? [])
    .map((item: any) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(String(item.nav).split('.')[0], precision, decimals))
    }))
    .reverse()

  return { loading, error, data }
}

export const useFundDetailChartData = (gql: any) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.fundIntervalDatas ?? [])
    .map((item: any) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(String(item.sharePrice), 4, 18))
    }))
    .reverse()

  return { loading, error, data }
}

export const useMiningData = (gql: any, fundsName: string[], timeType: string) => {
  const [getData, { loading: listLoading, error: listError, data: listData }] = useLazyQuery(gql, {
    fetchPolicy: 'cache-first'
  })
  useEffect(() => void getData(), [timeType])

  const sData = listData?.fundIntervalDatas ?? []
  const timeArr = uniq(sData.map((item: any) => item.periodStartUnix))
  // console.log(sData, timeArr)
  const data = timeArr
    .map((time) => {
      const o: Record<string, any> = {
        time: Number(time) * 1000
      }
      const ss: any[] = sData.filter((item: any) => item.periodStartUnix === time)
      fundsName.forEach((name: string) => {
        const fund = ss.find((item: any) => item.name === name)
        if (fund) {
          const baseToken = getTokenByAddress(fund.baseToken)
          // console.log(fund.miningAmount)
          const amount = fund
            ? safeInterceptionValues(fund.miningAmount, baseToken.precision, baseToken.decimals)
            : 0
          // todo ,这里需要USD价格
          const price = fund
            ? safeInterceptionValues(fund.sharePrice, baseToken.precision, baseToken.decimals)
            : 0
          // console.log(safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18))
          const baseTokenPriceInUSD = fund
            ? safeInterceptionValues(fund.baseTokenPriceInUSD, 2, 18)
            : 0
          const value = BN(amount).times(price).times(baseTokenPriceInUSD).toString()
          o[name] = Number(calcDecimalsFloor(value, 2))
        }
      })
      return o
    })
    .reverse()
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
