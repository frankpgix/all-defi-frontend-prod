import { Signer } from 'ethers'
import { getRewardContract, getBep20Contract } from '@/utils/contractHelpers'
import { estimateGas, setAllowance } from '@/utils/practicalMethod'
import { getsALLTOKENAddress, getRewardAddress } from '@/utils/addressHelpers'

import { getUnitAmount, safeInterceptionValues } from '@/utils/tools'
import { outcome, OutComeProps } from './help'

class Reward {
  getPoolList = async (signer: Signer | null | undefined): Promise<PoolProps[]> => {
    try {
      const contract = getRewardContract(signer)
      const response = await contract.poolList(0, 999)
      console.log(response)
      return (response ?? []).map((item: any) => ({
        shareToken: item.shareToken,
        symbol: item.symbol,
        aumPerShare: Number(safeInterceptionValues(item.sharePriceInUSD, 4, 18)),
        shareBalance: Number(safeInterceptionValues(item.shareBalance, 4, 18)),
        stakeAmount: Number(safeInterceptionValues(item.stakedShare, 4, 18))
      }))
    } catch (error) {
      console.info(error)
      return []
    }
  }

  stake = async (
    addresss: string[],
    amounts: number[],
    sAllAmount: number,
    signer: Signer | null | undefined
  ): Promise<OutComeProps> => {
    if (!signer) return outcome(4010)
    if (addresss.length === 0 && sAllAmount === 0) return outcome(4010)
    const unitAmounts = amounts.map((amount) => getUnitAmount(amount, 18))
    const unitSAllAmount = getUnitAmount(sAllAmount, 18)
    try {
      if (sAllAmount !== 0) {
        // 对需要操作的币种，以及合约，进行授权操作
        const approveAc = await setAllowance(
          signer,
          getRewardAddress(),
          getsALLTOKENAddress(),
          unitSAllAmount
        )
        // // 如果授权没有成功，返回失败
        if (!approveAc) return approveAc
      }
      if (addresss.length > 0) {
        const promises = addresss.map(
          async (address, index) =>
            (await setAllowance(signer, getRewardAddress(), address, unitAmounts[index])).status
        )
        const apps = await Promise.all(promises)
        if (apps.includes(false)) return outcome(4011)
      }

      const contract = getRewardContract(signer)
      const gasLimit = await estimateGas(contract, 'stake', [addresss, unitAmounts, unitSAllAmount])
      const response = await contract.stake(addresss, unitAmounts, unitSAllAmount, { gasLimit })
      // const response = await contract.drawShareToken()
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0, null, receipt.transactionHash)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  unstake = async (
    addresss: string[],
    amounts: number[],
    signer: Signer | null | undefined
  ): Promise<OutComeProps> => {
    if (!signer || !addresss.length) return outcome(4010)
    const unitAmounts = amounts.map((amount) => getUnitAmount(amount, 18))
    try {
      const contract = getRewardContract(signer)
      const gasLimit = await estimateGas(contract, 'unstake', [addresss, unitAmounts])
      const response = await contract.unstake(addresss, unitAmounts, { gasLimit })
      // const response = await contract.drawShareToken()
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0, null, receipt.transactionHash)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  harvestAll = async (signer: Signer | null | undefined): Promise<OutComeProps> => {
    if (!signer) return outcome(4010)
    try {
      const contract = getRewardContract(signer)
      const gasLimit = await estimateGas(contract, 'harvestAll', [])
      const response = await contract.harvestAll({ gasLimit })
      // const response = await contract.drawShareToken()
      const receipt = await response.wait()
      // 返回结果
      if (receipt.status) return outcome(0, null, receipt.transactionHash)
      return outcome(500)
    } catch (error: any) {
      console.info(error)
      return outcome(500, error.reason)
    }
  }

  pendingRewardOf = async (address: string, signer: Signer | null | undefined): Promise<number> => {
    if (!signer || !address) return 0
    try {
      const contract = getRewardContract(signer)
      const response = await contract.pendingRewardOf(address)
      // console.log(safeInterceptionValues(response), 22333)
      return Number(safeInterceptionValues(response))
      // const response = await contract.drawShareToken()
      // 返回结果
    } catch (error) {
      console.info(error)
      return 0
    }
  }

  // userAccClaimedReward = async (address: string, signer: Signer | null | undefined): Promise<number> => {
  //   if (!signer || !address) return 0
  //   try {
  //     const contract = getRewardContract(signer)
  //     const response = await contract.userAccClaimedReward(address)
  //     // console.log(response)
  //     return Number(safeInterceptionValues(response))
  //     // const response = await contract.drawShareToken()
  //     // 返回结果
  //   } catch (error) {
  //     console.info(error)
  //     return 0
  //   }
  // }
  userSALLAmount = async (address: string, signer: Signer | null | undefined): Promise<number> => {
    if (!signer || !address) return 0
    try {
      const contract = getRewardContract(signer)
      const response = await contract.userSALLAmount(address)
      // console.log(response)
      return Number(safeInterceptionValues(response))
      // const response = await contract.drawShareToken()
      // 返回结果
    } catch (error) {
      console.info(error)
      return 0
    }
  }

  userRewardDashboard = async (address: string, signer: Signer | null | undefined) => {
    return {
      sALL: await this.userSALLAmount(address, signer),
      claimedReward: await this.userAccClaimedReward(address),
      pendingReward: await this.pendingRewardOf(address, signer)
    }
  }
  userAccClaimedReward = async (address: string): Promise<number> => {
    if (!address) return 0
    try {
      const contract = getRewardContract()
      const response = await contract.userAccClaimedReward(address)
      return Number(safeInterceptionValues(response))
    } catch (error) {
      console.info(error)
      return 0
    }
  }
  globalAccClaimedReward = async (): Promise<number> => {
    try {
      const contract = getRewardContract()
      const response = await contract.globalAccClaimedReward()
      return Number(safeInterceptionValues(response))
    } catch (error) {
      console.info(error)
      return 0
    }
  }

  getRewardsALLBalance = async () => {
    try {
      const contract = getBep20Contract(getsALLTOKENAddress())
      const response = await contract.balanceOf(getRewardAddress())
      return Number(safeInterceptionValues(response))
    } catch (error) {
      console.info(error)
      return 0
    }
  }
}

export interface PoolProps {
  shareToken: string
  symbol: string
  aumPerShare: number
  shareBalance: number
  stakeAmount: number
}

export default new Reward()
