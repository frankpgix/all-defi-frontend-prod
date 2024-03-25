import { useStoreBaseTokenPrice } from '@/stores/useStoreBaseTokenPrice'
import { useInterval } from 'ahooks'
import { useBaseTokenPriceUSD } from '@/hooks/Contracts/useVaultFactory'

export const useBaseTokenPriceInUSD = () => {
  const { baseTokenPriceList, update } = useStoreBaseTokenPrice((state) => ({
    baseTokenPriceList: state.baseTokenPriceList,
    update: state.update
  }))
  return { baseTokenPriceList, update }
}

export const useUpdateBaseTokenPriceInUSD = () => {
  const { update } = useBaseTokenPriceInUSD()
  const { data, isLoading, isSuccess, refetch } = useBaseTokenPriceUSD()
  useInterval(
    async () => {
      await refetch()
      if (!isLoading && isSuccess) {
        update(data)
      }
    },
    10000,
    {
      immediate: true
    }
  )
}
