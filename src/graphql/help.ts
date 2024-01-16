import { safeInterceptionValues } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'

interface FundsProps {
  id: string
  name: string
}

export interface RecordProps {
  id: string
  investor: string
  vaultId: string
  amount: string
  underlyingToken: string
  actionType: number
  timestamp: number
}

interface UserFundHistorySourceDataProps {
  vaults: FundsProps[]
  vaultUserActions: RecordProps[]
}

export interface UserFundHistoryDataProps {
  name: string
  amount: number
  action: string
  investor: string
  baseToken: string
  tokenName: string
  hash: string
  time: number
  token: any
}

export enum ActionType {
  Allocate,
  'Cancel Allocate',
  Withhold,
  'Cancel Withhold',
  Claim,
  'Draw Share Token'
}

export const calcActionData = (
  item: RecordProps,
  funds?: FundsProps[]
): UserFundHistoryDataProps => {
  const token = getTokenByAddress(item.underlyingToken)
  // console.log(22222, token, item, funds)
  const action = ActionType[item.actionType] ?? '-'
  let amount = 0
  if (action.includes('Redeem')) {
    amount = Number(safeInterceptionValues(item.amount, 4, 18))
  } else {
    amount = Number(safeInterceptionValues(item.amount, token.precision, token.decimals))
  }
  if (action.includes('Cancel')) {
    amount = -amount
  }
  return {
    name: (funds ? funds.find((fund) => fund.id === item.vaultId)?.name : '') ?? '',
    amount,
    action,
    hash: item.id.split('-')[0],
    investor: item.investor,
    baseToken: item.underlyingToken,
    tokenName: token.name,
    time: item.timestamp * 1000,
    token
  }
}

export const calcUserFundHistoryData = (
  data: UserFundHistorySourceDataProps
): UserFundHistoryDataProps[] => {
  const { vaults = [], vaultUserActions = [] } = data ?? []
  return vaultUserActions.map((item) => calcActionData(item, vaults))
}
