import { tokenss } from '@/config/tokens'
import contracts from '@/config/contracts'
import { Address, ChainId } from '@/config/types'
import { VITE_APP_CHAIN_ID } from '@/config'

export const getAddress = (address: Address): string => {
  const chainId = VITE_APP_CHAIN_ID
  // @ts-ignore
  const addressChainID = address[chainId]
  return addressChainID
    ? (addressChainID ?? '').toLowerCase()
    : address[ChainId.MAINNET].toLowerCase()
}

// export const getSymbol = (address: string): string => {
//   const find = Object.values(tokens).find((token) => getAddress(token.address) === address.toLowerCase())
//   return find?.symbol ?? ''
// }

// export const getMulticallAddress = () => {
//   return getAddress(contracts.multiCall)
// }

/************** Contracts **************/
// 聚合调用合约地址
export const getMulticallAddress = () => {
  return getAddress(contracts.multiCall)
}

export const getACProtocolAddress = (): string => {
  return getAddress(contracts.ACProtocol)
}

export const getAllProtocolAddress = (): string => {
  return getAddress(contracts.AllProtocol)
}

export const getFundReaderAddress = (): string => {
  return getAddress(contracts.FundReader)
}

export const getRewardAddress = (): string => {
  return getAddress(contracts.Reward)
}
export const getUniV3ACLAddress = (): string => {
  return getAddress(contracts.UniV3ACL)
}

export const getPermit2Address = (): string => {
  return getAddress(contracts.Permit2)
}

export const getFundFactoryAddress = (): string => {
  return getAddress(contracts.FundFactory)
}
export const getAUMStatsAddress = (): string => {
  return getAddress(contracts.AUMStats)
}

/************** Tokens **************/
export const getUSDCAddress = (): string => {
  return tokenss.USDC.tokenAddress
}

export const getacUSDCAddress = (): string => {
  return tokenss.acUSDC.tokenAddress
}

export const getsacUSDCAddress = (): string => {
  return tokenss.sacUSDC.tokenAddress
}

export const getALLTOKENAddress = (): string => {
  return tokenss.ALLTOKEN.tokenAddress
}

export const getsALLTOKENAddress = (): string => {
  return tokenss.sALLTOKEN.tokenAddress
}
