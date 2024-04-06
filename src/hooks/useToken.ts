import { toLower } from 'lodash'
import { erc20Abi, zeroAddress } from 'viem'
import { useAccount, useBalance, useReadContracts } from 'wagmi'

import { UNKNOWN, baseTokens, chainTokens, tokens } from '@/config/tokens'

import { AddressType, ChainIdTypes, TokenConfigTypes, TokenKeys, TokenTypes } from '@/types/base'

import { DEFAULT_CHAIN_ID } from '@/config'
import { formatUnits } from '@/utils/tools'

export const useCurrChainID = (): ChainIdTypes => {
  const { chainId } = useAccount()
  return chainId ?? DEFAULT_CHAIN_ID
}

export const useTokens = (): TokenTypes[] => {
  const { chainId, chainTokenConfig } = useChainToken()
  return [chainTokenConfig, ...tokens].map((token: TokenConfigTypes) => ({
    ...token,
    address: token.address[chainId]
  }))
}

export const useChainToken = () => {
  const chainId = useCurrChainID()
  const chainTokenConfig = chainTokens[chainId]
  const chainToken = { ...chainTokenConfig, address: chainTokenConfig.address[chainId] }
  return { chainId, chainToken, chainTokenConfig }
}

export const useWChainToken = () => {
  const { chainToken } = useChainToken()
  const { getTokenByName } = useToken()
  const wChainToken = getTokenByName(chainToken.wTokenName)
  return { wChainToken }
}

export const useBaseTokens = () => {
  const { chainId, chainTokenConfig } = useChainToken()
  return [chainTokenConfig, ...baseTokens].map((token: TokenConfigTypes) => ({
    ...token,
    address: token.address[chainId]
  }))
}

export const useBaseTokenOptions = () => {
  const baseTokens = useBaseTokens()
  return baseTokens.map(({ name, address, icon }) => ({
    label: name,
    value: address,
    icon
  }))
}

export const useToken = () => {
  const tokens = useTokens()
  const { chainToken } = useChainToken()
  // console.log(tokens, 'tokens')
  const getToken = (keywords: string | AddressType, type?: 'address' | 'name' | 'symbol') => {
    if (type === 'address' && keywords === zeroAddress) return chainToken
    const token = tokens.find(
      (token: TokenTypes) => toLower(token[type ?? 'address']) === toLower(keywords)
    )
    return token ?? UNKNOWN
  }

  const getTokenByAddress = (address: AddressType) => getToken(address, 'address')
  const getTokenByName = (name: TokenKeys) => getToken(name, 'name')
  const getTokenBySymbol = (symbol: string) => getToken(symbol, 'symbol')

  return { tokens, getToken, getTokenByAddress, getTokenByName, getTokenBySymbol }
}

export const useChainTokenBalance = () => {
  const { chainToken } = useChainToken()
  const { address } = useAccount()
  const { data } = useBalance({ address })
  if (!address || !data) return 0
  return Number(formatUnits(data.value, chainToken.decimals, chainToken.precision))
}

export const useUserBalances = () => {
  const { address } = useAccount()
  const { chainToken } = useChainToken()
  const tokens = useTokens()
  const balances: Record<string, number> = {}
  const chainTokenBalances = useChainTokenBalance()

  const tokenList = tokens.filter((token) => token.address !== zeroAddress)

  const contracts = tokenList.map((token) => ({
    abi: erc20Abi,
    address: token.address,
    functionName: 'balanceOf',
    args: [address]
  }))

  const { isLoading, isSuccess, data, refetch } = useReadContracts({ contracts }) as {
    isLoading: boolean
    isSuccess: boolean
    data: { result: bigint; status: string }[]
    refetch: () => void
  }

  if (!isLoading && isSuccess) {
    tokenList.forEach((token, index) => {
      const balance =
        data?.[index] && data[index].status === 'success'
          ? Number(formatUnits(data[index].result ?? 0n, token.decimals, token.precision))
          : 0
      balances[token.name] = balance
    })
    balances[chainToken.name] = chainTokenBalances
    return { balances, refetch }
  }
  return { balances, refetch }
}
