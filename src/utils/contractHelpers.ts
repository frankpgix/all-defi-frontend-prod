import { ethers } from 'ethers'
import type { Provider } from '@ethersproject/providers'
import type { Contract } from '@ethersproject/contracts'
import type { Signer } from '@ethersproject/abstract-signer'
import type { ContractInterface } from '@ethersproject/contracts'
import { simpleRpcProvider } from '@/utils/simpleRpcProvider'
import { StaticJsonRpcProvider } from '@ethersproject/providers'

import bep20Abi from '@/config/abi/erc20.json'
import MultiCallAbi from '@/config/abi/Multicall.json'
import ACProtocolAbi from '@/config/abi/ACProtocol.json'
import AllProtocolAbi from '@/config/abi/AllProtocol.json'
import FundPoolAbi from '@/config/abi/FundPool.json'
import FundReaderAbi from '@/config/abi/FundReader.json'
import RewardAbi from '@/config/abi/Reward.json'
import UniV3ACLAbi from '@/config/abi/UniV3ACL.json'

import {
  getACProtocolAddress,
  getAllProtocolAddress,
  getMulticallAddress,
  getFundReaderAddress,
  getRewardAddress,
  getUniV3ACLAddress
} from '@/utils/addressHelpers'

export const getJsonRpcProvider = (): StaticJsonRpcProvider => {
  return new StaticJsonRpcProvider('https://arb1.arbitrum.io/rpc')
  // const local = localStorage.getItem('best-rpc')
  // const rpc = local ? JSON.parse(local)?.state.rpc : DEFAULT_PRC_URLS[CHAIN_ID]
  // // console.info(rpc)
  // return new StaticJsonRpcProvider(rpc)
}

export const getContract = (abi: ContractInterface, address: string, signer?: Signer | Provider | null): Contract => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

// 聚合调用合约地址
// 聚合调用合约
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

export const getBep20Contract = (address: string, signer?: Signer | Provider | null) => {
  return getContract(bep20Abi, address, signer)
}

// export const getUSDTContract = (signer?: Signer | Provider | null) => {
//   return getContract(USDTAbi, getUSDTAddress(), signer)
// }

export const getACProtocolContract = (signer?: Signer | Provider | null) => {
  return getContract(ACProtocolAbi, getACProtocolAddress(), signer)
}

export const getAllProtocolContract = (signer?: Signer | Provider | null) => {
  return getContract(AllProtocolAbi, getAllProtocolAddress(), signer)
}

export const getRewardContract = (signer?: Signer | Provider | null) => {
  return getContract(RewardAbi, getRewardAddress(), signer)
}

export const getFundReaderContract = (signer?: Signer | Provider | null) => {
  return getContract(FundReaderAbi, getFundReaderAddress(), signer)
}

export const getFundPoolContract = (address: string, signer?: Signer | Provider | null) => {
  return getContract(FundPoolAbi, address, signer)
}
export const getUniV3ACLContract = (signer?: Signer | Provider | null) => {
  return getContract(UniV3ACLAbi, getUniV3ACLAddress(), signer)
}
