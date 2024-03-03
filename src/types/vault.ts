import { AddressType } from '@/types/base'
import Token from '@/class/Token'

// Vaults Global Asset Statistics Props
export interface GlobalAssetStatisticProps {
  vaultAUMInUSD: number //基金中的资产规模
  overallAUMInUSD: number //平台总AUM
  overallReturnInUSD: number //历史累计收益
}

// Vault baseInfo Props
export interface VaultBaseInfoProps {
  underlyingToken: Token
  acToken: string
  address: string
  createTime: number
  name: string
  symbol: string
  desc: string
  manager: string
  managerName: string
  managerFeePercent: number
  platFeePercent: number
  derivatives: AddressType[]
  derivativesInfo: { name: string; value: AddressType }[]
  subscriptionMinLimit: number
  subscriptionMaxLimit: number
}
