import { ethers } from 'ethers'
import type { BigNumber, Contract, Signer } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'
import type { BigNumberish } from '@ethersproject/bignumber'
import { getBep20Contract } from '@/utils/contractHelpers'
import { outcome, OutComeProps } from '@/class/help'

// gas预测
export const estimateGas = async (
  contract: Contract,
  methodName: string,
  methodArgs: unknown[] = [],
  gasMarginPer10000 = 2000
): Promise<BigNumber> => {
  if (!contract[methodName]) {
    throw new Error(`Method ${methodName} doesn't exist on ${contract.address}`)
  }

  const rawGasEstimation = await contract.estimateGas[methodName](...methodArgs)
  console.info(`real need gas:${rawGasEstimation}`)
  console.info(
    `Gas after amplification:${rawGasEstimation
      .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(gasMarginPer10000)))
      .div(ethers.BigNumber.from(10000))}`
  )
  return rawGasEstimation
    .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(gasMarginPer10000)))
    .div(ethers.BigNumber.from(10000))
}

// 消费额度授权
export const setAllowance = async (
  signer: Signer,
  spender: string,
  token: string,
  amount?: BigNumberish
): Promise<OutComeProps> => {
  const _contract = getBep20Contract(token, signer)
  const _amount = ethers.BigNumber.from(amount)
  try {
    const account = await signer.getAddress()
    const allowance = await _contract.allowance(account, spender)
    const _allowance = ethers.BigNumber.from(allowance)
    if (_allowance.lt(_amount)) {
      const gasLimit = await estimateGas(_contract, 'approve', [spender, MaxUint256])
      const tx = await _contract.approve(spender, MaxUint256, { gasLimit })
      const receipt = await tx.wait()
      if (receipt.status) return outcome(0)
      return outcome(4011)
    }
    return outcome(0)
  } catch (e: any) {
    console.log(e)
    return outcome(4011, e.reason)
  }
}

// 合约授权
export const setApproval = async (contract: Contract, account: string, spender?: string): Promise<boolean> => {
  try {
    const response = await contract.isApprovedForAll(account, spender)

    if (!response) {
      const tx = await contract.setApprovalForAll(spender, true)
      const receipt = await tx.wait()
      return receipt.status
    }
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

// 添加token到钱包
export const addToken2Wallet = async (
  address: string,
  symbol: string,
  decimals: number,
  image: string
): Promise<boolean> => {
  if (window?.ethereum?.request) {
    const status = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: { address, symbol, decimals, image }
      }
    })
    return status
  }
  return false
}
