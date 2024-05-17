import dayjs from 'dayjs'

import { GetTokenFuncType } from '@/types/base'
import {
  UserVaultHistoryDataProps,
  UserVaultHistorySourceDataProps,
  VaultUserActionsItemTypes,
  VaultsSimpleTypes
} from '@/types/graphql'

import { safeInterceptionValues } from '@/utils/tools'

export enum ActionType {
  Stake,
  CancelStake,
  Unstake,
  CancelUnstake,
  Claim
}

export const calcActionData = (
  item: VaultUserActionsItemTypes,
  getTokenByAddress: GetTokenFuncType,
  funds?: VaultsSimpleTypes[]
): UserVaultHistoryDataProps => {
  const token = getTokenByAddress(item.underlying)
  // console.log(22222, token, item, funds)
  const action = ActionType[item.actionType] ?? '-'
  let amount = 0
  if (action.includes('Unstake')) {
    amount = Number(safeInterceptionValues(item.amount, 4, 18))
  } else {
    amount = Number(safeInterceptionValues(item.amount, token.precision, token.decimals))
  }
  if (action.includes('Cancel')) {
    amount = -amount
  }
  return {
    name: item.vaultName,
    amount,
    action,
    hash: item.id.split('-')[0],
    investor: item.investor,
    baseToken: item.underlying,
    tokenName: token.name,
    vaultName: item.vaultName,
    time: item.timestamp * 1000,
    token
  }
}

export const calcUserVaultHistoryData = (
  data: UserVaultHistorySourceDataProps,
  getTokenByAddress: GetTokenFuncType
): UserVaultHistoryDataProps[] => {
  const { vaults = [], vaultUserActions = [] } = data ?? []
  return vaultUserActions.map((item) => calcActionData(item, getTokenByAddress, vaults))
}

export const calcDataTypeAndStartTime = (type: string, startTime: number) => {
  const now = dayjs().unix()
  const o = {
    startTime,
    dataType: '1w'
  }
  if (type === 'DAY') {
    o.startTime = now - 24 * 60 * 60
    o.dataType = '15m'
  }
  if (type === 'WEEK') {
    o.startTime = now - 24 * 60 * 60 * 7
    o.dataType = '1h'
  }
  if (type === 'MONTH') {
    o.startTime = now - 24 * 60 * 60 * 30
    o.dataType = '6h'
  }
  if (type === 'YEAR') {
    o.startTime = now - 24 * 60 * 60 * 365
    o.dataType = '1w'
  }
  return o
}
