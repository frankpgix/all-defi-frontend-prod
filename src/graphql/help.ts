import { safeInterceptionValues } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'

interface FundsProps {
  id: string
  name: string
}

export interface RecordProps {
  id: string
  investor: string
  fundId: string
  amount: string
  baseToken: string
  actionType: number
  timestamp: number
}

interface UserFundHistorySourceDataProps {
  funds: FundsProps[]
  fundUserActions: RecordProps[]
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
  const token = getTokenByAddress(item.baseToken)
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
    name: (funds ? funds.find((fund) => fund.id === item.fundId)?.name : '') ?? '',
    amount,
    action,
    hash: item.id.split('-')[0],
    investor: item.investor,
    baseToken: item.baseToken,
    tokenName: token.name,
    time: item.timestamp * 1000,
    token
  }
}

export const calcUserFundHistoryData = (
  data: UserFundHistorySourceDataProps
): UserFundHistoryDataProps[] => {
  const { funds = [], fundUserActions = [] } = data ?? []
  return fundUserActions.map((item) => calcActionData(item, funds))
}
