import { bigInt2Number } from '@/utils/tools'
// 全局统计信息三件套

export interface GlobalAssetStatisticProps {
  aum: number //管理资产量
  assetInFunds: number //策略池中的资金
  historyReturn: number //历史收益
}
export const GlobalAssetStatisticDefault = {
  assetInFunds: 0,
  aum: 0,
  historyReturn: 0
}
export const calcGlobalAssetStatistic = (item: any): GlobalAssetStatisticProps => {
  return {
    assetInFunds: bigInt2Number(item.assetInFunds, 18, 2),
    aum: bigInt2Number(item.aum, 18, 2),
    historyReturn: bigInt2Number(item.historyReturn, 18, 2)
  }
}
