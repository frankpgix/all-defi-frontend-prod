import type { Signer } from 'ethers'
import Token from '@/class/Token'

// import { Products } from '@/config/products'
import { getFundPoolContract } from '@/utils/contractHelpers'
import { getUnitAmount } from '@/utils/tools'
import { estimateGas, setAllowance } from '@/utils/practicalMethod'
import { getacUSDCAddress } from '@/utils/addressHelpers'

import AllProtocol from './AllProtocol'

import { FundBaseProps, calcFundBase } from './help'
import { outcome, OutComeProps } from './help'

class FundPool {
  // 获取基金基础数据
  getFundBase = async (fundAddress: string): Promise<FundBaseProps | null> => {
    if (!fundAddress) return null
    const contract = getFundPoolContract(fundAddress)
    try {
      const response: any = await contract.baseInfo()
      return calcFundBase(response)
    } catch (error) {
      console.info(error)
      return null
    }
  }

  // 申购
  subscribe = async (
    amount: number,
    fundAddress: string | undefined,
    acToken: Token,
    signer: Signer | undefined | null
  ): Promise<OutComeProps> => {
    if (!fundAddress || !signer || amount <= 0) return outcome(4010)
    try {
      // 将参数由普通 number 类型，转成 uint256 类型，18 是精度参数
      const _amount = getUnitAmount(String(amount), acToken.decimals)
      // 创建合约连接
      const contract = getFundPoolContract(fundAddress, signer)
      // 对需要操作的币种，以及合约，进行授权操作
      const approveAc = await setAllowance(signer, fundAddress, acToken.tokenAddress, _amount)
      // 如果授权没有成功，返回失败
      if (!approveAc) return approveAc

      // 根据合约和参数，计算 gas 费用，最后的 0 是允许计算的偏差值，如果总是失败，可以将值设置大一些
      const gasLimit = await estimateGas(contract, 'subscribe', [_amount])
      //  调用合约
      const response = await contract.subscribe(_amount, { gasLimit })
      // 等待结果
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  // 取消申购
  cancelSubscribe = async (
    fundAddress: string | undefined,
    signer: Signer | undefined | null
  ): Promise<OutComeProps> => {
    if (!fundAddress || !signer) return outcome(4010)
    const contract = getFundPoolContract(fundAddress, signer)
    try {
      const gasLimit = await estimateGas(contract, 'cancelSubscribe', [])
      const response = await contract.cancelSubscribe({ gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }
  // 赎回
  redeem = async (
    amount: number,
    fundAddress: string | undefined,
    decimals: number,
    signer: Signer | undefined | null
  ): Promise<OutComeProps> => {
    if (!fundAddress || !signer || amount <= 0) return outcome(4010)
    const contract = getFundPoolContract(fundAddress, signer)
    try {
      const _amount = getUnitAmount(String(amount), 18)
      const gasLimit = await estimateGas(contract, 'redeem', [_amount])
      const response = await contract.redeem(_amount, { gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }
  // 取消赎回
  cancelRedeem = async (fundAddress: string | undefined, signer: Signer | undefined | null): Promise<OutComeProps> => {
    if (!fundAddress || !signer) return outcome(4010)
    const contract = getFundPoolContract(fundAddress, signer)
    try {
      const gasLimit = await estimateGas(contract, 'cancelRedeem', [])
      const response = await contract.cancelRedeem({ gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  // 执行赎回
  claim = async (fundAddress: string | undefined, signer: Signer | undefined | null): Promise<OutComeProps> => {
    if (!fundAddress || !signer) return outcome(4010)
    const contract = getFundPoolContract(fundAddress, signer)
    try {
      const gasLimit = await estimateGas(contract, 'claim', [])
      const response = await contract.claim({ gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  // 获取基金支持产品数据
  getSupportedDerivatives = async (fundAddress: string | undefined) => {
    if (!fundAddress) return false
    // const contract = getFundPoolContract(fundAddress)
    const { getDerivativeList } = AllProtocol
    try {
      const DerivativeList = await getDerivativeList()

      const fundBase = await this.getFundBase(fundAddress)
      const res = fundBase?.derivatives || []
      // const response: any = await contract.getSupportedDerivatives()
      return res
        .map((item: string) => {
          const derivative = DerivativeList.find(({ value }) => item === value)
          return derivative ? derivative.name : ''
        })
        .filter((item: string) => item !== '')
    } catch (error) {
      console.info(error)
      return null
    }
  }

  // 基金经理结算基金
  settleAccount = async (fundAddress: string, signer: Signer | undefined | null): Promise<OutComeProps> => {
    if (!fundAddress || !signer) return outcome(4010)
    try {
      const contract = getFundPoolContract(fundAddress, signer)
      const gasLimit = await estimateGas(contract, 'settleAccount', [])
      const response = await contract.settleAccount({ gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  // 领取赔偿的ALL
  claimCompensation = async (fundAddress: string, signer: Signer | undefined | null): Promise<OutComeProps> => {
    if (!fundAddress || !signer) return outcome(4010)
    try {
      const contract = getFundPoolContract(fundAddress, signer)
      const gasLimit = await estimateGas(contract, 'claimCompensation', [])
      const response = await contract.claimCompensation({ gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  //修改fund基础信息
  setBaseInfo = async (
    fundAddress: string,
    signer: Signer | undefined | null,
    desc: string,
    managerName: string,
    newDerivative: string[],
    delDerivative: string[],
    minAmount: string,
    maxAmount: string,
    decimals: number
  ): Promise<OutComeProps> => {
    if (!fundAddress || !signer) return outcome(4010)
    try {
      const contract = getFundPoolContract(fundAddress, signer)
      const _minAmount = getUnitAmount(String(minAmount), decimals)
      const _maxAmount = getUnitAmount(String(maxAmount), decimals)
      console.log(_minAmount, _maxAmount)
      const data = [desc, managerName, newDerivative, delDerivative, [_minAmount, _maxAmount]]
      const gasLimit = await estimateGas(contract, 'setBaseInfo', [...data])
      const response = await contract.setBaseInfo(...data, { gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }
}

export default new FundPool()
