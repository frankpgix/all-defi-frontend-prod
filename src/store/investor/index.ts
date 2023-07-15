import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'
import { Signer } from 'ethers'

import { UserStakesProps } from '@/class/ACProtocol'

import { InvestorState } from '@/store/types'

const initialState: InvestorState = {
  stakeList: [],
  stakeListLoaded: false
}
export const getUserStakesAsync = createAsyncThunk(
  'investor/getUserStakesAsync',
  async (signer: Signer | undefined | null): Promise<UserStakesProps[]> => {
    if (signer) {
      // const resp = await getUserStakes(signer)
      // console.log(resp)
      return []
    }
    return []
  }
)

export const InvestorSlice = createSlice({
  name: 'Investor',
  initialState,
  reducers: {
    updateStakeList: (state, action) => {
      state.stakeList = action.payload
    },
    clearStakeList: (state) => {
      state.stakeList = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserStakesAsync.pending, (state, action) => {
      state.stakeListLoaded = true
    })
    builder.addCase(getUserStakesAsync.fulfilled, (state, action) => {
      state.stakeList = action.payload
      state.stakeListLoaded = false
    })
  }
})

// Actions
export const { updateStakeList, clearStakeList } = InvestorSlice.actions

export default InvestorSlice.reducer
