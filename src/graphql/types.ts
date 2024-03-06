import { AddressType } from '@/types/base'
export interface FundDataProps {
  fundId: string
  periodStartUnix: number
  epochIndex: number
  aum: string
  nav: string
  roe: string
  sharePrice: string
}

export interface FundSubscribesAndRedeemsDataProps {
  id: string
  investor: string
  fundId: string
  amount: string
  timestamp: number
  epochIndex: string
}

export interface UniSwapRecordDataProps {
  timestamp: string
  recipient: string
  token0: {
    symbol: string
    name: string
    decimals: string
  }
  token1: {
    symbol: string
    name: string
    decimals: string
  }
  amount0: string
  amount1: string
}

export interface FundRecordOutProps {
  timestamp: number
  outAmount: number
  outToken: string
  inAmount: number
  inToken: string
  index: number
}

export interface ACBuyDataProps {
  timestamp: number
  amount: string
  id: string
  investor: string
  sallAmount: string
  underlyingToken: AddressType
}

export interface FundActionAssetProps {
  id: string
  // derivative
  derivative: string // 衍生品类型，bytes32格式
  // method name
  method: string //函数名
  // incomingAssets
  income: any[] //收入资产
  out: any[] //收入资产
  // spendAssets
  timestamp: number
}
