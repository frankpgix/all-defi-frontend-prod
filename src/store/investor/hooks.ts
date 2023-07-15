import { useSelector } from 'react-redux'
import { State, InvestorState } from '@/store/types'

export const useInvestorData = (): InvestorState => {
  return useSelector((state: State) => {
    return {
      stakeList: state.investor.stakeList,
      stakeListLoaded: state.investor.stakeListLoaded
    }
  })
}
