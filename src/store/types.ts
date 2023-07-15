import { ThunkAction } from 'redux-thunk'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

import { BalanceProps } from '@/class/Tokens'
import { UserStakesProps } from '@/class/ACProtocol'

export interface TokensState {
  balance: BalanceProps
  balanceLoaded: boolean
}

export interface InvestorState {
  stakeList: UserStakesProps[]
  stakeListLoaded: boolean
}

export interface FundsState {
  fundsList: Record<string, any>[]
}

export interface ShareMessageState {
  shareMessage: any
}

export interface State {
  investor: InvestorState
  tokens: TokensState
  shareMessage: ShareMessageState
  funds: FundsState
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>

export type AppThunkDispatch = ThunkDispatch<State, unknown, AnyAction>

export type AppGetState = () => State
