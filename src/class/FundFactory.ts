// import { utils } from 'ethers'
import { decodeAbiParameters, formatUnits } from 'viem'
import { getFundFactoryContract } from '@/utils/contractHelpers'
import { simpleRpcProvider } from '@/utils/simpleRpcProvider'
import { safeInterceptionValues } from '@/utils/tools'

import { baseToken } from '@/config/tokens'
import { viemClient } from '@/utils/multicall'
import FundFactoryAbi from '@/config/abi/FundFactory.json'
import { getFundFactoryAddress } from '@/utils/addressHelpers'

class FundFactory {
  FundVerified = async (
    manager: string,
    vType: 0 | 1,
    name?: string
  ): Promise<FundVerifiedItemTypes[]> => {
    const contract = getFundFactoryContract()
    const block = await simpleRpcProvider.getBlockNumber()
    // console.log(block)
    const transferEvents = await contract.queryFilter(
      'VaultReviewed',
      block - 60 * 60 * 24 * 2 * 15,
      block
    )
    // console.log(transferEvents, 'transferEvents')
    const getName = (enCode: `0x${string}`): string => {
      if (vType === 0) {
        return String(decodeAbiParameters([{ type: 'string', name: 'name' }], enCode)[0])
      }
      return name ?? ''
    }
    const data = transferEvents
      .map((item: any) => ({
        address: String(item.args.fund).toLocaleLowerCase(),
        manager: String(item.args.manager).toLocaleLowerCase(),
        hash: String(item.transactionHash).toLocaleLowerCase(),
        type: Number(item.args.vType),
        result: Boolean(item.args.pass),
        data: getName(item.args.data)
      }))
      .filter((item: any) => item.type === vType && manager.toLocaleLowerCase() === item.manager)
    // console.log(data)
    return data
  }

  getAssetPrice = async (baseAsset: string, quoteAsset: string) => {
    const contract = getFundFactoryContract()
    try {
      // console.log(baseToken)
      const res = await contract.assetPrice(baseAsset, quoteAsset)
      console.log(res, safeInterceptionValues(res, 6, 18))
      return Number(safeInterceptionValues(res, 6, 18))
    } catch (error) {
      return 1
    }
  }

  getAssetPriceInUSD = async (address: string) => {
    const contract = getFundFactoryContract()
    try {
      // console.log(baseToken)
      const res = await contract.assetPriceInUSD(address)
      return Number(safeInterceptionValues(res, 6, 18))
    } catch (error) {
      return 1
    }
  }

  getBaseTokenPriceInUSD = async (): Promise<baseTokenPriceInUSDTypes[]> => {
    try {
      const contracts = baseToken.map((item) => ({
        address: getFundFactoryAddress(),
        abi: FundFactoryAbi,
        functionName: 'assetPriceInUSD',
        args: [item.tokenAddress]
      }))
      // console.log(contracts)
      // @ts-ignore
      const res = await viemClient.multicall({ contracts })
      const data = baseToken.map((item, index) => ({
        address: item.tokenAddress,
        tokenName: item.name,
        priceInUSD: res[index].result ? Number(formatUnits(res[index].result as bigint, 18)) : 1
      }))
      return data
    } catch (error) {
      console.error(error)
      return baseToken.map((item) => ({
        address: item.tokenAddress,
        tokenName: item.name,
        priceInUSD: 1
      }))
    }
  }
}

export interface baseTokenPriceInUSDTypes {
  address: string
  tokenName: string
  priceInUSD: number
}

export interface FundVerifiedItemTypes {
  address: string
  manager: string
  hash: string
  type: number
  result: boolean
  data: string
}

const exClass = new FundFactory()
export default exClass
