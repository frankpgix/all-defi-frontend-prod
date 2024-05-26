import { gql } from '@apollo/client'

export const calcVaultAllocationOrWithholdGQL = (vaultAddress: string, type: number[]) => {
  console.log('JSON.stringify(type)', JSON.stringify(type))
  return gql`
    query {
      vaultUserActions(
        orderBy: timestamp
        orderDirection: desc
        where: {
          vaultAddress: "${vaultAddress.toLowerCase()}"
          actionType_in: ${JSON.stringify(type)}
        }
      ) {
        id
        investor
        vaultAddress
        vaultName
        amount
        actionType
        underlying
        timestamp
      }
    }
  `
}

export const calcUserVaultHistoryGQL = (userAddress?: string, vaultAddress?: string) => {
  return gql`
    query {
      vaultUserActions(
        orderBy: timestamp
        orderDirection: desc
        where: {
          ${userAddress ? `investor: "${userAddress.toLowerCase()}"` : ''}
          ${vaultAddress ? `vaultId: "${vaultAddress.toLowerCase()}"` : ''}
        }
      ) {
        id
        investor
        vaultAddress
        vaultName
        amount
        actionType
        underlying
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

export const calcVaultActionAssetGQL = (vaultAddress: string) => gql`
  query {
    vaultActionAssets(
      orderBy: timestamp
      orderDirection: desc
      where: {
        vaultId: "${vaultAddress.toLowerCase()}"
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
