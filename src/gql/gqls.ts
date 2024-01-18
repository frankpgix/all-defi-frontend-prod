import { gql } from '@apollo/client'
import { createArrayByNumber } from '@/utils/tools'
import { calcDataTypeAndStartTime } from './help'

export const calcManageFundDatasGql = (manager: string, type: string, createTime: number) => {
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

export const calcFundDatasGql = (fundAddress: string, type: string, createTime: number) => {
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
      }
    }
  `
}

export const calcFundDetailChartGQL = (fundAddress: string, epoch: number, timeType: string) => {
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

export const calcMiningData = (fundAddress: string, type: string, createTime: number) => {
  const { dataType, startTime } = calcDataTypeAndStartTime(type, createTime)
  return gql`
    query {
      vaultIntervalDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          vaultId_in: ${fundAddress.toLowerCase()}
          intervalType: "${dataType}"
          periodStartUnix_gt: ${startTime}
        }
      ) {
        vaultId
        name
        periodStartUnix
        sharePrice
        underlyingTokenPriceInUSD
        miningShare
        underlyingToken
      }
    }
  `
}

export const calcFundMonthDataGql = (fundAddress: string) => {
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

export const calcFundListGQL = () => gql`
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
