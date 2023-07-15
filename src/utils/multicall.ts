import { ethers } from 'ethers'

import { getMulticallContract } from '@/utils/contractHelpers'

export interface Call {
  address: string
  name: string
  params?: any[]
}

interface Params {
  abi: any[]
  calls: Call[]
  requireSuccess?: boolean
}

export const multicall: (params: Params) => Promise<any[]> = async ({ abi, calls }) => {
  const c = getMulticallContract()
  const itf = new ethers.utils.Interface(abi)

  const callData = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params)
  }))

  const { returnData } = await c.callStatic.aggregate(callData)

  return returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))
}

export default multicall
