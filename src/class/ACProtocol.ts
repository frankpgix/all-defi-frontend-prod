import type { Signer } from 'ethers'

import { getTokenByAddress } from '@/config/tokens'
import { getACProtocolContract } from '@/utils/contractHelpers'
import { estimateGas, setAllowance } from '@/utils/practicalMethod'
import { getACProtocolAddress } from '@/utils/addressHelpers'
import { getUnitAmount } from '@/utils/tools'
import { outcome, OutComeProps } from './help'

class ACProtocol {
  // 入金并质押 USDC to sacUSDC
  buyAllToken = async (
    baseTokenAddress: string,
    amount: number,
    signer: Signer | undefined | null
  ): Promise<OutComeProps> => {
    if (!signer) return outcome(4010)
    const baseToken = getTokenByAddress(baseTokenAddress)
    // 将参数由普通 number 类型，转成 uint256 类型，18 是精度参数
    const _amount = getUnitAmount(String(amount), baseToken.decimals)
    // 创建合约连接
    const contract = getACProtocolContract(signer)
    // const baseTokenAddress = baseToken.tokenAddress
    try {
      if (baseTokenAddress === '0x0000000000000000000000000000000000000000') {
        const response = await contract.ethBuy({ value: _amount })
        // 等待结果
        const receipt = await response.wait()
        console.log(response, receipt)
        // 返回结果
        if (receipt.status) return outcome(0, null, receipt.transactionHash)
        return outcome(500)
      } else {
        // 对需要操作的币种，以及合约，进行授权操作
        const approve = await setAllowance(
          signer,
          getACProtocolAddress(),
          baseTokenAddress,
          _amount
        )
        console.log(approve)
        // 如果授权没有成功，返回失败
        if (!approve.status) return approve
        // 根据合约和参数，计算 gas 费用，最后的 0 是允许计算的偏差值，如果总是失败，可以将值设置大一些
        const gasLimit = await estimateGas(contract, 'buy', [baseTokenAddress, _amount])
        //  调用合约
        const response = await contract.buy(baseTokenAddress, _amount, { gasLimit })
        // 等待结果
        const receipt = await response.wait()
        console.log(response, receipt)
        // 返回结果
        if (receipt.status) return outcome(0, null, receipt.transactionHash)
        return outcome(500)
      }
    } catch (e: any) {
      // 如果失败，返回失败
      return outcome(500, e.reason)
    }
  }
  ethBuy = async () => {
    console.log(1)
  }
}

export default new ACProtocol()

export interface UserStakesProps {
  stakeId: number
  startTime: number
  endTime: number
  amount: number
  totalReward: number
  cliamedReward: number
  pendingReward: number
  redeemedAmount: number
}
