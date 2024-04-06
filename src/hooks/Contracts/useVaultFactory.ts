import { zeroAddress } from 'viem'
import { useReadContract, useReadContracts } from 'wagmi'

import { useVaultFactoryContract } from '@/hooks/Contracts/useContract'
import { useBaseTokens, useWChainToken } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { baseTokenPriceInUSDTypes } from '@/types/vault'

import { safeInterceptionValues } from '@/utils/tools'

export const useAssetPrice = (baseAsset: AddressType, quoteAsset: AddressType) => {
  const VaultFactoryContract = useVaultFactoryContract()

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
  const VaultFactoryContract = useVaultFactoryContract()
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
  const VaultFactoryContract = useVaultFactoryContract()
  const baseTokens = useBaseTokens()
  const { wChainToken } = useWChainToken()
  const { data, isLoading, isSuccess, refetch } = useReadContracts({
    contracts: baseTokens.map((baseToken) => ({
      ...VaultFactoryContract,
      functionName: 'assetPriceInUSD',
      args: [baseToken.address === zeroAddress ? wChainToken.address : baseToken.address]
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
