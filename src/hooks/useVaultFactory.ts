// import { useEffect, useCallback } from 'react'

import { useReadContract, useReadContracts } from 'wagmi'
import { AddressType } from '@/types/base'
import { safeInterceptionValues } from '@/utils/tools'
import { baseTokens, tokens, ZERO_ADDRESS } from '@/config/tokens'
import { useVaultFactoryContract } from '@/hooks/useContract'
import { baseTokenPriceInUSDTypes } from '@/types/vault'

// import { getVaultReviewed } from '@/api/vaultList'
// import contracts from '@/config/contracts'

// allTokenPrice = async (baseToken: string) => {
//   // console.log(baseToken)
//   // const contract = getAllProtocolContract()
//   const { getAssetPrice } = FundFactory
//   try {
//     if (baseToken === '0x0000000000000000000000000000000000000000') {
//       baseToken = tokens.WETH.tokenAddress
//     }
//     // console.log(baseToken)
//     const res = await getAssetPrice(tokens.ALLTOKEN.tokenAddress, baseToken)
//     // console.log(safeInterceptionValues(res, 6, 18))
//     return res
//   } catch (error) {
//     console.info(error)
//     return 1
//   }
// }
const VaultFactoryContract = useVaultFactoryContract()

export const useAssetPrice = (baseAsset: AddressType, quoteAsset: AddressType) => {
  const { data, isLoading, isSuccess } = useReadContract({
    ...VaultFactoryContract,
    functionName: 'assetPrice',
    args: [baseAsset, quoteAsset]
  })

  if (baseAsset && quoteAsset && !isLoading && isSuccess) {
    return {
      data: Number(safeInterceptionValues(data, 6, 18)),
      isLoading,
      isSuccess
    }
  }
  return {
    data: 0,
    isLoading,
    isSuccess
  }
}

export const useAssetPriceUSD = (quoteAsset: AddressType) => {
  const { data, isLoading, isSuccess } = useReadContract({
    ...VaultFactoryContract,
    functionName: 'assetPriceInUSD',
    args: [quoteAsset]
  })
  if (!isLoading && isSuccess) {
    return {
      data: Number(safeInterceptionValues(data, 6, 18)),
      isLoading,
      isSuccess
    }
  }
  return {
    data: 0,
    isLoading,
    isSuccess
  }
}

export const useBaseTokenPriceUSD = () => {
  const { data, isLoading, isSuccess, refetch } = useReadContracts({
    contracts: baseTokens.map((baseToken) => ({
      ...VaultFactoryContract,
      functionName: 'assetPriceInUSD',
      args: [baseToken.address === ZERO_ADDRESS ? tokens.WETH.address : baseToken.address]
    }))
  })
  if (!isLoading && isSuccess) {
    return {
      data: baseTokens.map((baseToken, index) => ({
        address: baseToken.address,
        tokenName: baseToken.name,
        priceInUSD: Number(safeInterceptionValues(data[index].result, 6, 18))
      })) as baseTokenPriceInUSDTypes[],
      isLoading,
      isSuccess,
      refetch
    }
  }

  return {
    data: baseTokens.map((baseToken) => ({
      address: baseToken.address,
      tokenName: baseToken.name,
      priceInUSD: 1
    })) as baseTokenPriceInUSDTypes[],
    isLoading,
    isSuccess,
    refetch
  }
}

// export const useVaultReviewed = (manager: AddressType, vType: 0 | 1, name?: string) => {
//   const getData = useCallback(async () => {
//     await getVaultReviewed(manager, vType, name)
//   }, [])

//   useEffect(() => {
//     void getData()
//   }, [])
//   // const { data: blockBigint } = useBlockNumber()
//   // console.log(safeInterceptionValues(blockBigint ?? 0, 0, 0))
// }
