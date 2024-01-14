// import { decodeAbiParameters, parseAbiParameters } from 'viem'
import { Signer, utils } from 'ethers'
import { getTokenByAddress } from '@/config/tokens'
import { sum, isNaN } from 'lodash'
import BN from 'bignumber.js'
import { safeInterceptionValues } from '@/utils/tools'

import { getFundReaderContract } from '@/utils/contractHelpers'

import {
  FundProps,
  FundDetailProps,
  calcFundDetail,
  GlobalAssetStatisticProps,
  GlobalAssetStatisticDefault,
  calcGlobalAssetStatistic,
  FundUserDataProps,
  calcFundUserDetail,
  FundBreachDetailProps,
  calcFundBreachDetail,
  ShareCompositionProps,
  ShareCompositionDefault,
  calcShareComposition,
  AssetCompositionProps,
  calcAssetComposition,
  FundUserListDataProps,
  calcFundBase
} from './help'

class FundReader {
  // 获取所有基金列表
  getFundList = async (): Promise<FundDetailProps[] | null> => {
    const contract = getFundReaderContract()
    try {
      const response = await contract.vaultDetailList(0, 999, false)
      // console.log(111, response)
      return response.map((item: any) => calcFundDetail(item))
      // return null
    } catch (error) {
      console.info(111, error)
      return null
    }
  }

  //获取经理管理的基金列表
  getManagerFundList = async (address: string): Promise<FundDetailProps[] | null> => {
    try {
      const res = (await this.getFundList()) ?? []
      console.log(res)
      return res.filter((item) => item.manager.toLowerCase() === address.toLowerCase())
    } catch (error) {
      console.info(error)
      return []
    }
  }

  // 获取用户参与的基金基础信息列表
  getUserFundList = async (signer: Signer): Promise<FundUserListDataProps[] | null> => {
    const contract = getFundReaderContract(signer)
    // const res = await contract.getUserFundList()
    // console.log(res)
    // return null
    try {
      const [fundList, detailList] = await contract.userDetailList(0, 999, false)
      const list = fundList
        .map((item: any, index: number) => {
          const fund: FundProps = calcFundBase(item)
          fund.data = calcFundUserDetail(detailList[index])
          fund.address = fund.data.address
          return fund
        })
        .filter(
          (item: FundUserListDataProps) =>
            item.data.subscribingACToken + item.data.unclaimedACToken + item.data.shares !== 0
        )
      // console.log(list, 222)
      return list
    } catch (error) {
      console.info(error)
      return null
    }
  }

  // 获取基金动态数据
  getFundDetail = async (fundAddress: string): Promise<FundDetailProps | null> => {
    if (!fundAddress) return null
    const contract = getFundReaderContract()
    try {
      const response: any = await contract.vaultDetail(fundAddress)
      return calcFundDetail(response)
    } catch (error) {
      return null
    }
  }

  // 获取用户基金信息
  getFundUserDetail = async (
    fundAddress: string | undefined,
    userAddress: string | undefined,
    signer: Signer | undefined | null
  ): Promise<FundUserDataProps | null> => {
    if (!fundAddress || !signer || !userAddress) return null
    const contract = getFundReaderContract(signer)
    try {
      const response: any = await contract.userDetail(fundAddress, userAddress)
      return calcFundUserDetail(response)
    } catch (error) {
      return null
    }
  }

  // 查看基金 Shares 构成
  getShareComposition = async (
    fundAddress: string,
    userAddress: string,
    signer: Signer | undefined | null
  ): Promise<ShareCompositionProps> => {
    if (!userAddress || !fundAddress || !signer) return ShareCompositionDefault
    try {
      const contract = getFundReaderContract(signer)
      const response = await contract.shareCompositionOf(fundAddress, userAddress)
      // 返回结果
      return calcShareComposition(response)
    } catch (error) {
      console.info(error)
      return ShareCompositionDefault
    }
  }
  // 基金违约冻结信息
  getFundBreachDetail = async (fundAddress: string): Promise<FundBreachDetailProps | null> => {
    if (!fundAddress) return null
    const contract = getFundReaderContract()
    // console.log(contract)
    try {
      const response: any = await contract.vaultBreachDetail(fundAddress)
      // console.log('vaultBreachDetail', response)
      return calcFundBreachDetail(response)
    } catch (error) {
      console.info(error)
      return null
    }
  }
  //获取基金资产分布情况
  getAssetComposition = async (
    fundAddress: string,
    baseTokenAddress: string
  ): Promise<AssetCompositionProps[] | null> => {
    // console.log(111, fundAddress, baseTokenAddress)
    if (!fundAddress || !baseTokenAddress) return null
    const contract = getFundReaderContract()
    try {
      const response: any = await contract.assetComposition(fundAddress)
      const data = response
        .map((item: any) => calcAssetComposition(item, baseTokenAddress))
        .filter((item: AssetCompositionProps) => item.value > 0)
      const sumValue = sum(data.map((item: AssetCompositionProps) => item.value))
      return data.map((item: AssetCompositionProps) => {
        const percentage = BN(item.value).div(sumValue).times(100).toNumber()
        item.percentage = isNaN(percentage) ? 0 : percentage
        return item
      })
    } catch (error) {
      console.info(error)
      return null
    }
  }
  // 获取全局统计数据
  getGlobalAssetStatistic = async (): Promise<GlobalAssetStatisticProps> => {
    const contract = getFundReaderContract()
    try {
      const response = await contract.globalAssetStatistic()
      // console.log(response)
      return calcGlobalAssetStatistic(response)
    } catch (error) {
      console.info(error)
      return GlobalAssetStatisticDefault
    }
  }

  getFundUpdatingData = async (
    fundAddress: string,
    baseToken: string
  ): Promise<FundUpdateDataTypes | null> => {
    const contract = getFundReaderContract()
    try {
      const res = await contract.vaultUpdatingData(fundAddress)
      const abiCoder = utils.defaultAbiCoder
      const types = [
        'tuple(string desc, string managerName, uint256[2] subscriptionLimit, bytes32[] derivativesToAdd, bytes32[] derivativesToRemove, address[] assetsToAdd, address[] assetsToRemove)'
      ]
      const { precision, decimals } = getTokenByAddress(baseToken)
      if (res.params === '0x') {
        return {
          verifyStatus: -1,
          data: {
            desc: '',
            managerName: '',
            derivativesToAdd: [],
            derivativesToRemove: [],
            assetsToAdd: [],
            assetsToRemove: [],
            subscriptionLimit: []
          }
        }
      }
      const updateData = abiCoder.decode(types, res.params)[0]
      return {
        verifyStatus: res.verifyStatus,
        data: {
          desc: updateData.desc,
          managerName: updateData.managerName,
          derivativesToAdd: updateData.derivativesToAdd,
          derivativesToRemove: updateData.derivativesToRemove,
          assetsToAdd: updateData.assetsToAdd,
          assetsToRemove: updateData.assetsToRemove,
          subscriptionLimit: updateData.subscriptionLimit.map((item: string) =>
            Number(safeInterceptionValues(item, precision, decimals))
          )
        }
      }
      // return calcGlobalAssetStatistic(res)
    } catch (error) {
      console.info(error)
      return null
    }
  }
}

const ExportFundReader = new FundReader()

export default ExportFundReader

interface FundUpdateDataTypes {
  verifyStatus: -1 | 0 | 1 | 2
  data: {
    desc: string
    managerName: string
    derivativesToAdd: string[]
    derivativesToRemove: string[]
    assetsToAdd: string[]
    assetsToRemove: string[]
    subscriptionLimit: number[]
  }
}
