import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Signer } from 'ethers'

import TokenClass, { BalanceProps, defaultBalance } from '@/class/Tokens'

import { TokensState } from '@/store/types'

const initialState: TokensState = {
  balance: defaultBalance,
  balanceLoaded: false
}
const { getTokensBalance } = TokenClass

export const getTokensBalanceAsync = createAsyncThunk(
  'tokensData/getTokensBalanceAsync',
  async (signer: Signer | undefined | null): Promise<BalanceProps | null> => {
    if (signer) {
      return await getTokensBalance(signer)
    }
    return null
  }
)

export const TokensSlice = createSlice({
  name: 'tokensData',
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.balance = action.payload
    },
    clearBalance: (state) => {
      state.balance = defaultBalance
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTokensBalanceAsync.pending, (state, action) => {
      state.balanceLoaded = true
    })
    builder.addCase(getTokensBalanceAsync.fulfilled, (state, action) => {
      // console.log(11111222, action)
      if (action.payload) state.balance = { ...action.payload }
      state.balanceLoaded = false
    })
  }
})

// Actions
export const { updateBalance, clearBalance } = TokensSlice.actions

export default TokensSlice.reducer
