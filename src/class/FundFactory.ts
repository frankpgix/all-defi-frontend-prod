// import { utils } from 'ethers'
import { decodeAbiParameters } from 'viem'
import { getFundFactoryContract } from '@/utils/contractHelpers'
import { simpleRpcProvider } from '@/utils/simpleRpcProvider'

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
