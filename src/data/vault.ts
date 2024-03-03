import { getTokenByAddress } from '@/config/tokens'

// Vaults Global Asset Statistics Default Data
export const GlobalAssetStatisticDefault = {
  overallAUMInUSD: 0,
  vaultAUMInUSD: 0,
  overallReturnInUSD: 0
}

export const VaultBaseInfoDefault = {
  underlyingToken: getTokenByAddress('0x'),
  acToken: '',
  address: '-',
  createTime: 0,
  name: '-',
  symbol: '-',
  desc: '-',
  manager: '-',
  managerName: '-',
  managerFeePercent: 0,
  platFeePercent: 0,
  derivatives: [],
  derivativesInfo: [],
  subscriptionMinLimit: 0,
  subscriptionMaxLimit: 0
}
