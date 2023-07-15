import { useSelector } from 'react-redux'
import { State, TokensState } from '@/store/types'

export const useTokensData = (): TokensState => {
  return useSelector((state: State) => {
    return {
      balance: state.tokens.balance,
      balanceLoaded: state.tokens.balanceLoaded
    }
  })
}
