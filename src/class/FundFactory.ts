import { Signer, utils } from 'ethers'
import { getFundFactoryContract } from '@/utils/contractHelpers'

class FundFactory {
  FundVerified = async (fundAddress: string, vType: 0 | 1, signer: Signer | null) => {
    if (!fundAddress || !signer) return
    const contract = getFundFactoryContract(signer)
    const transferEvents = await contract.queryFilter('FundVerified')
    console.log(111, transferEvents)
  }
}

const exClass = new FundFactory()
export default exClass
