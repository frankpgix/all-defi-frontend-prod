import { Signer, utils } from 'ethers'

// import Token from '@/class/Token'
import tokens from '@/config/tokens'
import { getAllProtocolContract } from '@/utils/contractHelpers'
import { getAllProtocolAddress, getALLTOKENAddress } from '@/utils/addressHelpers'
import { getUnitAmount, safeInterceptionValues } from '@/utils/tools'
import { estimateGas, setAllowance } from '@/utils/practicalMethod'
import { ProductProps } from '@/config/products'
// import multicall from '@/utils/multicall'
import { getDecimalsByAddress } from '@/config/tokens'

import { calcFundStake, FundStakeDefault, FundStakeProps } from './help'
import { outcome, OutComeProps } from './help'

class AllProtocol {
  // 创建新基金
  createFund = async (params: CreateFundProps, signer: Signer): Promise<OutComeProps> => {
    if (!signer) return outcome(4010)
    try {
      const {
        name,
        symbol,
        desc,
        managerName,
        derivatives,
        stakeAmount: amount,
        minAmount,
        maxAmount
      } = params
      let baseTokenAddress = params.baseTokenAddress
      if (baseTokenAddress === '0x0000000000000000000000000000000000000000') {
        baseTokenAddress = tokens.WETH.tokenAddress
      }
      const decimals = getDecimalsByAddress(baseTokenAddress)

      const stakeAmount = getUnitAmount(String(amount), 18)
      const subscriptionLimit = [
        getUnitAmount(String(minAmount), decimals),
        getUnitAmount(String(maxAmount), decimals)
      ]
      const contract = getAllProtocolContract(signer)
      // console.log({ name, symbol, desc, managerName, derivatives, stakeAmount, subscriptionLimit })
      const approve = await setAllowance(
        signer,
        getAllProtocolAddress(),
        getALLTOKENAddress(),
        stakeAmount
      )
      if (!approve) return approve
      const gasLimit = await estimateGas(contract, 'createFund', [
        name,
        symbol,
        desc,
        managerName,
        derivatives,
        subscriptionLimit,
        stakeAmount,
        baseTokenAddress
      ])
      const response = await contract.createFund(
        name,
        symbol,
        desc,
        managerName,
        derivatives,
        subscriptionLimit,
        stakeAmount,
        baseTokenAddress,
        { gasLimit }
      )
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0, null, receipt.transactionHash)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  // 计算质押 1 AllToken能得到多少AUM管理额度
  calcAUMLimit = async (baseTokenAddress: string): Promise<number> => {
    const _amount = getUnitAmount(String(1), 18)
    const contract = getAllProtocolContract()
    // console.log(baseTokenAddress)
    if (baseTokenAddress === '0x0000000000000000000000000000000000000000') {
      baseTokenAddress = tokens.WETH.tokenAddress
    }
    try {
      const response = await contract.calcAUMLimit(baseTokenAddress, _amount)
      const decimals = getDecimalsByAddress(baseTokenAddress)
      return Number(safeInterceptionValues(response, decimals, decimals))
    } catch (error) {
      console.info(error)
      return 20
    }
  }

  // 获取产品策略地址列表，因三方地址不变，在 config/products 中进行配置
  // 此函数已经使用
  getDerivativeList = async (): Promise<ProductProps[]> => {
    const contract = getAllProtocolContract()
    try {
      const response = await contract.derivativeList()
      return response.map((item: string) => ({ name: utils.parseBytes32String(item), value: item }))
    } catch (error) {
      return []
    }
  }

  getFundStake = async (address: string, signer: Signer): Promise<FundStakeProps> => {
    const contract = getAllProtocolContract(signer)
    try {
      const response = await contract.fundStaking(address)
      // console.log('out:', response)
      return calcFundStake(address, response)
      // return safeInterceptionValues(response)
    } catch (error) {
      return FundStakeDefault
    }
  }

  // 基金经理质押 ALL token 到某只基金
  manageStakeAllTokenToFund = async (
    amount: number,
    fundAddress: string,
    signer: Signer
  ): Promise<OutComeProps> => {
    const _amount = getUnitAmount(amount, 18)
    const contract = getAllProtocolContract(signer)
    try {
      const gasLimit = await estimateGas(contract, 'stake', [fundAddress, _amount])
      const response = await contract.stake(fundAddress, _amount, { gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0, null, receipt.transactionHash)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }
  // 基金经理质押 ALL token 到某只基金
  manageUnStakeAllTokenToFund = async (
    amount: number,
    fundAddress: string,
    signer: Signer
  ): Promise<OutComeProps> => {
    const _amount = getUnitAmount(amount, 18)
    const contract = getAllProtocolContract(signer)
    try {
      const gasLimit = await estimateGas(contract, 'unstake', [fundAddress, _amount])
      const response = await contract.unstake(fundAddress, _amount, { gasLimit })
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0, null, receipt.transactionHash)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }
  // 检查是否具有基金经理权限
  checkAuthorizedManager = async (address: string) => {
    const contract = getAllProtocolContract()
    // console.log(contract)
    try {
      return await contract.isManagerAuthorized(address)
    } catch (error) {
      console.info(error)
      return false
    }
  }

  allTokenPrice = async (baseToken: string) => {
    console.log(baseToken)
    const contract = getAllProtocolContract()
    try {
      if (baseToken === '0x0000000000000000000000000000000000000000') {
        baseToken = tokens.WETH.tokenAddress
      }
      // console.log(baseToken)
      const res = await contract.allTokenPrice(baseToken)
      return Number(safeInterceptionValues(res, 18, 18))
    } catch (error) {
      console.info(error)
      return 1
    }
  }

  fundUnstakingLimit = async (address: string) => {
    const contract = getAllProtocolContract()
    try {
      const res = await contract.fundUnstakingLimit(address)
      return Number(safeInterceptionValues(res, 4, 18))
    } catch (error) {
      console.info(error)
      return 1
    }
  }
}

export interface CreateFundProps {
  name: string
  symbol: string
  desc: string
  managerName: string
  derivatives: string[]
  stakeAmount: number
  minAmount: number
  maxAmount: number
  baseTokenAddress: string
}

export default new AllProtocol()
