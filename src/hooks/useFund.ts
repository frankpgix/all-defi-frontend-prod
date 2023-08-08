import { useStoreManageFundList } from '@/stores/useStoreFunds'
import { FundDetailProps } from '@/class/help'
import { useProfile } from '@/hooks/useProfile'
import FundReader from '@/class/FundReader'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

interface ManageFundListType {
  manageFundFist: FundDetailProps[]
  loading: boolean
  update: (manageFundFist: FundDetailProps[], loading: boolean) => void
  getData: () => void
}

export const useManageFundList = (): ManageFundListType => {
  const { manageFundFist, loading, update, getData } = useStoreManageFundList((state: any) => ({
    manageFundFist: state.manageFundFist,
    loading: state.loading,
    update: state.update,
    getData: state.getData
  }))

  return {
    manageFundFist,
    loading,
    update,
    getData
  }
}

export const useGetManageFundList = () => {
  const { getManagerFundList } = FundReader
  const { account: address } = useProfile()
  const { update, setGetDataFunc } = useStoreManageFundList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  const { data, loading, run } = useRequest(async () => await getManagerFundList(address), {
    debounceWait: 300
  })

  useEffect(() => {
    update(data || [], loading)
  }, [data, loading, update])

  useEffect(() => {
    setGetDataFunc(run)
  }, [setGetDataFunc, run])
}
