import { erc20Abi, zeroAddress } from 'viem'
import { useAccount, useBalance, useReadContracts } from 'wagmi'

import { DEFAULT_CHAIN_ID } from '@/config'
import { UNKNOWN, baseTokens, ethConfig, tokens } from '@/config/token'
import { AddressType, TokenConfigTypes, TokenTypes } from '@/types/base'
import { formatUnits } from '@/utils/tools'

export const useCurrChainID = (): number => {
  const { chainId } = useAccount()
  return chainId ?? DEFAULT_CHAIN_ID
}

export const useTokens = (): TokenTypes[] => {
  const chainId = useCurrChainID()
  return tokens.map((token: TokenConfigTypes) => ({
    ...token,
    // @ts-ignore
    address: token.address[chainId]
  }))
}

export const useBaseTokens = () => {
  const chainId = useCurrChainID()
  return baseTokens.map((token: TokenConfigTypes) => ({
    ...token,
    // @ts-ignore
    address: token.address[chainId]
  }))
}

export const useToken = () => {
  const tokens = useTokens()

  const getToken = (keywords: string | AddressType, type?: 'address' | 'name' | 'symbol') => {
    const token = tokens.find((token: TokenTypes) => token[type ?? 'address'] === keywords)
    return token ?? UNKNOWN
  }

  const getTokenByAddress = (address: AddressType) => getToken(address, 'address')
  const getTokenByName = (name: string) => getToken(name, 'name')
  const getTokenBySymbol = (symbol: string) => getToken(symbol, 'symbol')

  return { tokens, getToken, getTokenByAddress, getTokenByName, getTokenBySymbol }
}

export const useETHBalance = () => {
  const { address } = useAccount()
  const { data } = useBalance({ address })
  if (!address || !data) return 0
  return Number(formatUnits(data.value, ethConfig.decimals, ethConfig.precision))
}

export const useUserBalances = () => {
  const { address } = useAccount()
  const tokens = useTokens()
  const balances: Record<string, number> = {}
  const ethBalances = useETHBalance()

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
    balances.ETH = ethBalances
    return { balances, refetch }
  }
  return { balances, refetch }
}
