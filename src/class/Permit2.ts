import { Signer } from 'ethers'
import { getPermit2Contract } from '@/utils/contractHelpers'
// import { estimateGas } from '@/utils/practicalMethod'
import { outcome, OutComeProps } from './help'
// import { safeInterceptionValues } from '@/utils/tools'

class Permit2 {
  approve = async (data: any[], signer: Signer): Promise<OutComeProps> => {
    if (!signer) return outcome(4010)
    const contract = getPermit2Contract(signer)
    try {
      // Number(safeInterceptionValues('99999999999900000', 4, 18))
      // const encodeData = [
      //   ['0x221912ce795669f628c51c69b7d0873eda9c03bb', 100000000, 1234567, 1],
      //   '0x221912ce795669f628c51c69b7d0873eda9c03bb',
      //   1234576
      // ]
      // const gasLimit = await estimateGas(contract, 'approve', [encodeData])
      // console.log('approve', fundAddress, message)
      const response = await contract.approve(...data)
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0, null, receipt.transactionHash)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }
}

const outClass = new Permit2()

export default outClass
