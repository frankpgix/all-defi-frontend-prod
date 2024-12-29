import { NULL_ADDRESS, chainTokens, tokens } from '@/config/token'

import { TokenTypes } from '@/types/base'

import { getCurrChainId } from '@/support/utils'

export const getTokens = () => {
  const chainId = getCurrChainId()
  const chainToken = chainTokens[chainId]
  const erc20Tokens = tokens
    .map((token) => ({ ...token, address: token.address[chainId] ?? NULL_ADDRESS }))
    .filter((token) => token.address !== NULL_ADDRESS)
  return [chainToken, ...erc20Tokens]
}

export const getTokenByAddress = (address: string): TokenTypes => {
  const allTokens = getTokens()
  return allTokens.find((token) => token.address === address) ?? allTokens[0]
}
