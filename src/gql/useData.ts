import { useQuery, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import BN from 'bignumber.js'
import { uniq, last } from 'lodash'
import { getTokenByAddress } from '@/config/tokens'
import { safeInterceptionValues, calcDecimalsFloor } from '@/utils/tools'
import { removeZeroKeys } from './help'
import { calcFundMonthDataGql, calcFundListGQL } from './gqls'

export const useManageFundDatas = (gql: any) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.managerIntervalDatas ?? [])
    .map((item: any) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(String(item.aumInUSD).split('.')[0], 2, 18))
    }))
    .reverse()

  // @ts-ignore
  const count = last(data)?.value ?? 0

  return { loading, error, data, count }
}

export const useFundData = (gql: any, decimals: number, precision: number) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.vaultIntervalDatas ?? [])
    .map((item: any) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(String(item.aum).split('.')[0], precision, decimals))
    }))
    .reverse()

  return { loading, error, data }
}

export const useFundDetailChartData = (gql: any) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.vaultIntervalDatas ?? [])
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
          // const baseToken = getTokenByAddress(fund.baseToken)
          // console.log(fund.miningAmount)
          const amount = fund ? safeInterceptionValues(fund.miningAmount, 18, 18) : 0
          // todo ,这里需要USD价格
          const price = fund ? safeInterceptionValues(fund.sharePrice, 18, 18) : 0
          // console.log(safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18))
          const baseTokenPriceInUSD = fund
            ? safeInterceptionValues(fund.baseTokenPriceInUSD, 18, 18)
            : 0
          const value = BN(amount).times(price).times(baseTokenPriceInUSD).toString()
          o[name] = Number(calcDecimalsFloor(value, 2))

          // if (name === 'T0-USDC' && Number(amount) > 0) {
          //   console.log(fund.miningAmount, amount)
          //   console.log(fund.sharePrice, price)
          //   console.log(fund.baseTokenPriceInUSD, baseTokenPriceInUSD)
          // }
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
export interface FundMonthDataType {
  year: number
  month: number
  roe: string
  history?: boolean
  isRise?: boolean
  isFall?: boolean
}
export const useFundMonthData = (fundAddress: string) => {
  const gql = calcFundMonthDataGql(fundAddress)
  const { loading, data: sData } = useQuery(gql)
  const data: FundMonthDataType[] = (sData?.fundNaturalMonthDatas ?? [])
    .map((item: any) => {
      const time = item.periodStartUnix * 1000
      const year = dayjs(time).year()
      const month = dayjs(time).month() + 1
      return {
        year,
        month,
        roe: safeInterceptionValues(String(item.roe), 2, 16) + '%'
      }
    })
    .reverse()
  return { loading, data }
}

export const useFundListData = () => {
  const {
    loading,
    error,
    data: sData
  } = useQuery(calcFundListGQL(), {
    fetchPolicy: 'no-cache'
  })

  console.log(sData)
  const data = (sData?.vaults ?? []).map((item: any) => {
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
      baseToken
      // verified: item.verified
    }
  })
  // .filter((item: any) => item.verified === true)
  return { loading, data, error }
}
