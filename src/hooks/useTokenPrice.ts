import { useStoreTokenPrice } from '@/stores/useStoreTokenPrice'
import FundFactory from '@/class/FundFactory'
import { useInterval } from 'ahooks'

export const useTokenPriceInUSD = () => {
  const { tokenPriceList, update } = useStoreTokenPrice((state) => ({
    tokenPriceList: state.tokenPriceList,
    update: state.update
  }))
  return { tokenPriceList, update }
}

export const useUpdateTokenPriceInUSD = () => {
  const { update } = useTokenPriceInUSD()
  const { getBaseTokenPriceInUSD } = FundFactory
  useInterval(
    async () => {
      const res = await getBaseTokenPriceInUSD()
      // console.log(res)
      update(res)
    },
    10000,
    {
      immediate: true
    }
  )
}
