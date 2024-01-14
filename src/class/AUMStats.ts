import { getAUMStatsContract } from '@/utils/contractHelpers'
import { calcGlobalAssetStatistic, GlobalAssetStatisticDefault } from './help'
class AUMStats {
  getGlobalAssetStats = async () => {
    const contract = getAUMStatsContract()
    try {
      const response = await contract.globalAssetStats()

      // console.log(111, response)
      return calcGlobalAssetStatistic(response)
      // return response.map((item: any) => calcFundDetail(item))
      // return null
    } catch (error) {
      console.info(111, error)
      return GlobalAssetStatisticDefault
    }
  }
}

export default new AUMStats()
