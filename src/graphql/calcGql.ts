// import dayjs from 'dayjs'
import { gql } from '@apollo/client'

import { timeDiffType, typeStartTime } from './tools'

const calcTableAndStartTime = (type: string, startTime: number) => {
  const diffType = timeDiffType(startTime)
  const o = {
    tableName: 'fundHourlyDatas',
    startTime: String(startTime)
  }

  if (diffType === 'hour') {
    o.tableName = 'fund10MinutelyDatas'
  } else if (diffType === 'longTime') {
    o.tableName = 'fundDailyDatas'
  }
  if (type === 'DAY') {
    o.startTime = String(typeStartTime(type))
    if (diffType === 'hour') {
      o.tableName = 'fund10MinutelyDatas'
    } else {
      o.tableName = 'fundHourlyDatas'
    }
  } else if (type === 'WEEK' || type === 'MONTH' || type === 'YEAR') {
    // tableName = 'fundDailyDatas'
    o.startTime = String(typeStartTime(type))
  }
  return o
}

export const calcFundDatasGql = (fundAddress: string, type: string, createTime: number) => {
  const { tableName, startTime } = calcTableAndStartTime(type, createTime)

  return gql`query {
    ${tableName}(
      orderBy: periodStartUnix
      orderDirection: desc
      first: 1000
      where: {
        fundId: "${fundAddress.toLowerCase()}"
        periodStartUnix_gt: ${startTime}
      }
    ) {
      fundId
      periodStartUnix
      epochIndex
      aum
      roe
      nav
      sharePrice
    }
  }`
}

export const calcMiningData = (fundAddress: string, type: string, createTime: number) => {
  const { tableName, startTime } = calcTableAndStartTime(type, createTime)
  return gql`
    query {
      ${tableName}(
        orderBy: periodStartUnix
        orderDirection: asc
        first: 1000
        where: {
          fundId_in: ${fundAddress.toLowerCase()}
          periodStartUnix_gt: ${startTime}
          miningAmount_not: 0
        }
      ) {
        fundId
        name
        periodStartUnix
        sharePrice
        baseTokenPriceInUSD
        miningAmount
      }
    }
  `
}

export const calcFundDetailChartGQL = (
  fundAddress: string,
  epochs: number[],
  startTime: number,
  createTime: number
) => {
  let tableName = 'fundDailyDatas'

  const diffType = timeDiffType(startTime)
  if (epochs.length === 1) {
    if (diffType === 'hour') {
      tableName = 'fund10MinutelyDatas'
    } else if (diffType === 'day') {
      tableName = 'fundHourlyDatas'
    }
  }
  const diffCTimeType = timeDiffType(createTime)

  if (diffCTimeType === 'hour') {
    tableName = 'fund10MinutelyDatas'
  } else if (diffCTimeType === 'day') {
    tableName = 'fundHourlyDatas'
  }
  return gql`
    query {
      ${tableName}(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          fundId: "${fundAddress.toLowerCase()}"
          epochIndex_in: ${JSON.stringify(epochs)}
        }
      ) {
        fundId
        periodStartUnix
        epochIndex
        aum
        nav
        roe
        sharePrice
      }
    }
  `
}

export const calcManageFundsData = (fundAddress: string) => gql`
  query{
    funds(
      where:{
        manager: "${fundAddress.toLowerCase()}"
      }
    ) {
      id
      manager
      createTime
    }
  }
`

export const calcManageFundDetailData = (
  fundAddress: string,
  type: string,
  createTime: number | string
) => {
  const { tableName, startTime } = calcTableAndStartTime(type, Number(createTime))

  return gql`
    query {
      ${tableName}(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          fundId_in: ${fundAddress.toLowerCase()}
          periodStartUnix_gt: ${startTime}
        }
      ) {
        fundId
        periodStartUnix
        aum
        nav
        baseToken
        baseTokenPriceInUSD
      }
    }
  `
}