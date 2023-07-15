import { Signer } from 'ethers'
import { getUniV3ACLContract } from '@/utils/contractHelpers'
import { estimateGas } from '@/utils/practicalMethod'
import { outcome, OutComeProps } from './help'
// import { safeInterceptionValues } from '@/utils/tools'

class UniV3ACL {
  registerPermitSingle = async (fundAddress: string, message: any, signer: Signer): Promise<OutComeProps> => {
    if (!signer) return outcome(4010)
    const contract = getUniV3ACLContract(signer)
    // try {
    // Number(safeInterceptionValues('99999999999900000', 4, 18))
    // const encodeData = [
    //   ['0x221912ce795669f628c51c69b7d0873eda9c03bb', 100000000, 1234567, 1],
    //   '0x221912ce795669f628c51c69b7d0873eda9c03bb',
    //   1234576
    // ]
    // const gasLimit = await estimateGas(contract, 'registerPermitSingle', [encodeData])
    console.log('registerPermitSingle', fundAddress, message)
    const response = await contract.registerPermitSingle(fundAddress, message)
    const receipt = await response.wait()
    // 返回结果
    if (receipt.status) return outcome(0)
    return outcome(500)
    // } catch (error: any) {
    //   console.info(error)
    //   return outcome(500, error.reason)
    // }
  }
}

export default new UniV3ACL()
