import { gql } from '@apollo/client'
// import { get10MinutelyUnix, getCurrHourUnix } from '@/utils/qraphqlTools'

export const calcFundHourlyDatasGQL = (fundAddress: string, unix: string | null) => gql`
  query {
    fundHourlyDatas(
      orderBy: periodStartUnix
      orderDirection: desc
      where: {
        fundId: "${fundAddress.toLowerCase()}"
        ${unix ? `periodStartUnix_in: ${unix}` : ''}
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
  }
`

export const calcManageFundsData = (fundAddress: string) => gql`
  query{
    funds(
      where:{
        manager: "${fundAddress.toLowerCase()}"
      }
    ) {
      id
      manager
    }
  }
`

export const calcManageFundDetailData = (fundAddress: string, unix: string | null) => gql`
  query {
    fundHourlyDatas(
      orderBy: periodStartUnix
      orderDirection: desc
      where: {
        fundId_in: ${fundAddress.toLowerCase()}
        ${unix ? `periodStartUnix_in: ${unix}` : ''}
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

export const calcMiningData = (fundAddress: string) => gql`
  query {
    fund10MinutelyDatas(
      orderBy: periodStartUnix
      orderDirection: asc
      where: {
        fundId_in: ${fundAddress.toLowerCase()}
        periodStartUnix_gt: 1688720774
        periodStartUnix_lte: 1688724281
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

export const calcFundDetailChartGQL = (fundAddress: string, epochs: number[]) => gql`
  query {
    fundHourlyDatas(
      orderBy: periodStartUnix
      orderDirection: desc
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
export const calcFundListGQL = () => gql`
  query {
    funds {
      id
      name
      baseToken
      aum
      capacityAvailable
      managerName
      dayReturn
      weekReturn
      monthReturn
      yearReturn
      currentAPR
      epochIndex
      createTime
    }
  }
`
export const calcFundDetailGQL = (fundAddress: string) => gql`
  query {
    funds(
      where: {
        id: "${fundAddress.toLowerCase()}"
      }
    ) {
      id
      name
      aum
      capacityAvailable
      dayReturn
      weekReturn
      monthReturn
      yearReturn
      currentAPR
      epochIndex
    }
  }
`
// fundId: "${'0xb8874ad74192ce798391ca316d47ad97e168128b'.toLowerCase()}"

export const calcVaultAllocationOrWithholdGQL = (fundAddress: string, type: number[]) => {
  return gql`
    query {
      vaultUserActions(
        orderBy: timestamp
        orderDirection: desc
        where: {
          vaultId: "${fundAddress.toLowerCase()}"
          actionType_in: ${JSON.stringify(type)}
        }
      ) {
        id
        investor
        vaultId
        amount
        actionType
        underlyingToken
        timestamp
      }
    }
  `
}
export const calcUniSwapRecordGQL = (fundAddress: string) => gql`
  query {
    swaps(
      orderBy: timestamp
      orderDirection: desc
      where:{
        recipient: "${fundAddress.toLowerCase()}"
      }
    ) {
      timestamp
      recipient
      token0 {
        symbol
        name
        decimals
      }
      token1 {
        symbol
        name
        decimals
      }
      amount0
      amount1
    }
  }
`

export const calcUserFundHistoryGQL = (userAddress?: string, fundAddress?: string) => {
  return gql`
    query {
      vaults {
        id
        name
      }
      vaultUserActions(
        orderBy: timestamp
        orderDirection: desc
        where: {
          ${userAddress ? `investor: "${userAddress.toLowerCase()}"` : ''}
          ${fundAddress ? `vaultId: "${fundAddress.toLowerCase()}"` : ''}
        }
      ) {
        id
        investor
        vaultId
        amount
        actionType
        underlyingToken
        timestamp
      }
    }
  `
}

export const calcUserACBuyGQL = (userAddress: string) => gql`
  query {
    acbuys(
      orderBy: timestamp
      orderDirection: desc
      where: {
        investor: "${userAddress.toLowerCase()}"
      }
    ) {
      id
      investor
      amount
      sallAmount
      underlyingToken
      timestamp
    }
  }
`

export const calcFundActionAssetGQL = (fundAddress: string) => gql`
  query {
    vaultActionAssets(
      orderBy: timestamp
      orderDirection: desc
      where: {
        vaultId: "${fundAddress.toLowerCase()}"
      }
    ) {
      id
      vaultId
      derivative
      selector
      method
      incomingAssets
      spendAssets
      incomingAssetsAmmounts
      spendAssetsAmmounts
      timestamp
    }
  }
`
