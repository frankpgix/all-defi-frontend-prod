import { toLower } from 'lodash'
import { erc20Abi, zeroAddress } from 'viem'
import { useAccount, useBalance, useReadContracts } from 'wagmi'

import { UNKNOWN, chainTokens, tokens, underlyingTokens } from '@/config/tokens'

import {
  AddressType,
  ChainIdTypes,
  TokenConfigTypes,
  TokenKeys,
  TokenTypes,
  UnderlyingTokenConfigTypes
} from '@/types/base'

import { ChainId as ChainIds } from '@/config'
import { DEFAULT_CHAIN_ID } from '@/config'
import { formatUnits } from '@/utils/tools'

export const useCurrChainID = (): ChainIdTypes => {
  const { chainId } = useAccount()
  console.log(Object.values(ChainIds).includes(chainId ?? DEFAULT_CHAIN_ID))
  console.log(chainId)
  if (chainId && Object.values(ChainIds).includes(chainId)) return chainId
  return DEFAULT_CHAIN_ID
}

export const useTokens = (): TokenTypes[] => {
  const { chainId, chainToken } = useChainToken()
  const tokenList = tokens.map((token: TokenConfigTypes) => ({
    ...token,
    address: token.address[chainId]
  }))
  return [chainToken, ...tokenList].filter((i) => i)
}

export const useChainToken = () => {
  const chainId = useCurrChainID()
  const chainToken = chainTokens[chainId]
  return { chainId, chainToken }
}

export const useWChainToken = () => {
  const { chainToken } = useChainToken()
  const { getTokenByName } = useToken()
  const wChainToken = getTokenByName(chainToken.wTokenName)
  return { wChainToken }
}

export const useUnderlyingTokens = () => {
  const { chainId, chainToken } = useChainToken()
  const tokens = underlyingTokens.map((token: UnderlyingTokenConfigTypes) => ({
    ...token,
    address: token.address[chainId]
  }))
  return [...tokens, chainToken]
}

export const useUnderlyingTokenOptions = () => {
  const underlyingTokens = useUnderlyingTokens()
  return underlyingTokens.map(({ name, address, icon }) => ({
    label: name,
    value: address,
    icon
  }))
}

export const useToken = () => {
  const tokens = useTokens()
  const { chainToken } = useChainToken()
  console.log(tokens, 'tokens')
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
