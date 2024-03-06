// import dayjs from 'dayjs'
import { gql } from '@apollo/client'

import { timeDiffType, typeStartTime, get10MinutelyUnix } from './tools'
import { createArrayByNumber } from '@/utils/tools'

import { AddressType } from '@/types/base'

import { calcDataTypeAndStartTime } from './help'

const calcTableAndStartTime = (type: string, startTime: number, monthHouer?: boolean) => {
  // const diffType = timeDiffType(startTime)
  const o = {
    tableName: 'fundHourlyDatas',
    startTime: String(startTime)
  }
  if (type === 'DAY') {
    o.startTime = String(typeStartTime(type))
    o.tableName = 'fund10MinutelyDatas'
  } else if (type === 'WEEK') {
    o.tableName = 'fundHourlyDatas'
    o.startTime = String(typeStartTime(type))
  } else if (type === 'MONTH' || type === 'YEAR') {
    o.tableName = 'fundDailyDatas'
    o.startTime = String(typeStartTime(type))
  }
  if (monthHouer && type === 'MONTH') {
    o.tableName = 'fundHourlyDatas'
  }
  return o
}

export const calcVaultDatasGql = (fundAddress: string, type: string, createTime: number) => {
  const { startTime, dataType } = calcDataTypeAndStartTime(type, createTime)
  return gql`
    query {
      vaultIntervalDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          vaultId: "${fundAddress.toLowerCase()}"
          intervalType: "${dataType}"
          periodStartUnix_gt: ${startTime}
        }
      ) {
        intervalType
        periodStartUnix
        aum
        sharePrice
      }
    }
  `
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
        }
      ) {
        fundId
        name
        periodStartUnix
        sharePrice
        baseTokenPriceInUSD
        miningAmount
        baseToken
      }
    }
  `
}

export const calcMiningTotalDataGQL = () => {
  // console.log(get10MinutelyUnix())
  return gql`
    query {
      fund10MinutelyDatas(
        orderBy: periodStartUnix
        orderDirection: asc
        where: {
          periodStartUnix_gte: ${get10MinutelyUnix()}
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
// miningAmount_not: 0

export const calcVaultDetailChartGQL = (fundAddress: string, epoch: number, timeType: string) => {
  let dataType = '1h'
  const calcEpochs = (): number[] => {
    if (timeType === 'current epoch') return [epoch]
    if (timeType === '3 Epochs') {
      dataType = '6h'
      return Array.from(new Set([Math.max(epoch - 2, 0), Math.max(epoch - 1, 0), epoch]))
    }
    dataType = '1d'
    return createArrayByNumber(epoch)
  }

  const epochs = calcEpochs()
  return gql`
    query {
      vaultIntervalDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          vaultId: "${fundAddress.toLowerCase()}"
          intervalType: "${dataType}"
          epochIndex_in: ${JSON.stringify(epochs)}
        }
      ) {
        intervalType
        periodStartUnix
        aum
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

export const calcVaultListGQL = () => gql`
  query {
    vaults {
      id
      # verified
      name
      underlyingToken
      beginningAUM
      capacityAvailable
      managerName
      dayReturn
      weekReturn
      monthReturn
      yearReturn
      currentAPR
      epochIndex
      createTime
      stage
    }
  }
`

export const calcVaultMonthDataGql = (fundAddress: string) => {
  return gql`
    query {
      vaultNaturalMonthDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        where: {
          vaultId: "${fundAddress}"
        }
      ) {
        vaultId
        name
        periodStartUnix
        roe
        underlyingToken
      }
    }
  `
}

export const calcManageVaultDatasGql = (manager: AddressType, type: string, createTime: number) => {
  // const { tableName, startTime } = calcTableAndStartTime(type, createTime, true)
  const { startTime } = calcDataTypeAndStartTime(type, createTime)
  const calcDataType = () => {
    if (type === 'DAY') {
      return '1h'
    }
    if (type === 'WEEK') {
      return '1h'
    }
    if (type === 'MONTH') {
      return '6h'
    }
    if (type === 'YEAR') {
      return '1d'
    }
    return '1d'
  }
  const dataType = calcDataType()
  return gql`
    query {
      managerIntervalDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          manager: "${manager.toLowerCase()}"
          intervalType: "${dataType}"
          periodStartUnix_gt: ${startTime}
        }
      ) {
        id
        manager
        intervalType
        periodStartUnix
        aumInUSD
      }
    }
  `
}
