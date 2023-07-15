import { createSlice } from '@reduxjs/toolkit'

import { FundsState } from '@/store/types'

const initialState: FundsState = {
  fundsList: []
}

export const FundsSlice = createSlice({
  name: 'Funds',
  initialState,
  reducers: {
    updateFundsList: (state, action) => {
      state.fundsList = action.payload
    },
    clearFundsList: (state) => {
      state.fundsList = []
    }
  }
})

// Actions
export const { updateFundsList, clearFundsList } = FundsSlice.actions

export default FundsSlice.reducer
