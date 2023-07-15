import { useSelector } from 'react-redux'
import { State, FundsState } from '@/store/types'

export const useFundsData = (): FundsState => {
  return useSelector((state: State) => {
    return {
      fundsList: state.funds.fundsList
    }
  })
}
