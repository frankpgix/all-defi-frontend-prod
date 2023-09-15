// import { utils } from 'ethers'
import { decodeAbiParameters } from 'viem'
import { getFundFactoryContract } from '@/utils/contractHelpers'

class FundFactory {
  FundVerified = async (vType: 0 | 1, name?: string): Promise<FundVerifiedItemTypes[]> => {
    const contract = getFundFactoryContract()
    const transferEvents = await contract.queryFilter('FundVerified')
    const getName = (enCode: `0x${string}`): string => {
      if (vType === 0) {
        return String(decodeAbiParameters([{ type: 'string', name: 'name' }], enCode)[0])
      }
      return name ?? ''
    }
    const data = transferEvents
      .map((item: any) => ({
        address: String(item.args.fund),
        type: Number(item.args.vType),
        result: Boolean(item.args.pass),
        data: getName(item.args.data)
      }))
      .filter((item: any) => item.type === vType)
    return data
  }
}

export interface FundVerifiedItemTypes {
  address: string
  type: number
  result: boolean
  data: string
}

const exClass = new FundFactory()
export default exClass
