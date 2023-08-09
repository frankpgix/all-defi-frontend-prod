import { useStoreManageFundList, useStoreFundList } from '@/stores/useStoreFunds'
import { FundDetailProps } from '@/class/help'
import { useProfile } from '@/hooks/useProfile'
import FundReader from '@/class/FundReader'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

interface ManageFundListType {
  manageFundList: FundDetailProps[]
  loading: boolean
  update: (manageFundList: FundDetailProps[], loading: boolean) => void
  getData: () => void
}

export const useManageFundList = (): ManageFundListType => {
  const { manageFundList, loading, update, getData } = useStoreManageFundList((state: any) => ({
    manageFundList: state.manageFundList,
    loading: state.loading,
    update: state.update,
    getData: state.getData
  }))

  return {
    manageFundList,
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

interface FundListType {
  fundList: FundDetailProps[]
  loading: boolean
  update: (manageFundList: FundDetailProps[], loading: boolean) => void
  getData: () => void
}

export const useFundList = (): FundListType => {
  const { fundList, loading, update, getData } = useStoreFundList((state: any) => ({
    fundList: state.fundList,
    loading: state.loading,
    update: state.update,
    getData: state.getData
  }))

  return {
    fundList,
    loading,
    update,
    getData
  }
}

export const useGetFundList = () => {
  const { getFundList } = FundReader
  const { update, setGetDataFunc } = useStoreFundList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  const { data, loading, run } = useRequest(async () => await getFundList(), {
    debounceWait: 300
  })

  useEffect(() => {
    update(data || [], loading)
  }, [data, loading, update])

  useEffect(() => {
    setGetDataFunc(run)
  }, [setGetDataFunc, run])
}
