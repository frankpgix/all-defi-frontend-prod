import { gql } from '@apollo/client'

import { AddressType } from '@/types/base'

import { createArrayByNumber } from '@/utils/tools'

import { calcDataTypeAndStartTime } from './help'

export const calcVaultDatasGql = (vaultAddress: string, type: string, createTime: number) => {
  const { startTime, dataType } = calcDataTypeAndStartTime(type, createTime)
  return gql`
    query {
      vaultIntervalDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          vaultAddress: "${vaultAddress.toLowerCase()}"
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

export const calcMiningData = (vaultAddress: string, type: string, createTime: number) => {
  const { dataType, startTime } = calcDataTypeAndStartTime(type, createTime)
  return gql`
    query {
      vaultIntervalDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          vaultAddress_in: ${vaultAddress.toLowerCase()}
          intervalType: "${dataType}"
          periodStartUnix_gt: ${startTime}
        }
      ) {
        vaultAddress
        name
        periodStartUnix
        sharePrice
        underlyingPriceInUSD
        miningShare
        underlying
      }
    }
  `
}

export const calcVaultDetailChartGQL = (vaultAddress: string, epoch: number, timeType: string) => {
  let dataType = '1h'
  const calcEpochs = (): number[] => {
    if (timeType === 'current epoch') return [epoch]
    if (timeType === '3 Epochs') {
      dataType = '1h'
      return Array.from(new Set([Math.max(epoch - 2, 0), Math.max(epoch - 1, 0), epoch]))
    }
    dataType = '6h'
    return createArrayByNumber(epoch)
  }

  const epochs = calcEpochs()
  console.log(epochs, 'epochs')
  return gql`
    query {
      vaultIntervalDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        first: 1000
        where: {
          vaultAddress: "${vaultAddress.toLowerCase()}"
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
export const calcVaultGroupChartGQL = (vaultAddress: string[], epoch: number, timeType: string) => {
  let dataType = '1h'
  const calcEpochs = (): number[] => {
    if (timeType === 'current epoch') return [epoch]
    if (timeType === '3 Epochs') {
      dataType = '1h'
      return Array.from(new Set([Math.max(epoch - 2, 0), Math.max(epoch - 1, 0), epoch]))
    }
    dataType = '6h'
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
          vaultAddress_in: ${JSON.stringify(vaultAddress)}
          intervalType: "${dataType}"
          epochIndex_in: ${JSON.stringify(epochs)}
        }
      ) {
        intervalType
        periodStartUnix
        aum
        underlying
        underlyingPriceInUSD
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
      underlying
      beginningAUM
      # capacityAvailable
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

export const calcVaultMonthDataGql = (vaultAddress: string) => {
  return gql`
    query {
      vaultNaturalMonthDatas(
        orderBy: periodStartUnix
        orderDirection: desc
        where: {
          vaultAddress: "${vaultAddress}"
        }
      ) {
        vaultAddress
        name
        periodStartUnix
        roe
        underlying
      }
    }
  `
}

export const calcUserDepositDataGql = (userAddress: string) => {
  return gql`
    query {
      deposits(
        orderBy: timestamp
        orderDirection: desc
        where: {
          user: "${userAddress.toLocaleLowerCase()}"
        }
      ) {
        id
        user
        underlying
        amount
        lockDuration
        timestamp
        depositId
      }
      withdrawals(
        orderBy: timestamp
        orderDirection: desc
        where: {
          user: "${userAddress.toLocaleLowerCase()}"
        }
      ) {
        id
        user
        underlying
        amount
        timestamp
        depositId
      }
    }
  `
}

export const calcManageVaultDatasGql = (manager: AddressType, type: string, createTime: number) => {
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
