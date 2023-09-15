import {
  useStoreManageFundList,
  useStoreFundList,
  useStoreUserFundList,
  useStoreManageFundVerifyList
} from '@/stores/useStoreFunds'
import { FundDetailProps, FundUserListDataProps } from '@/class/help'
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
    if (data) {
      update(data, loading)
    } else {
      update([], true)
    }
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
    if (data) {
      update(data, loading)
    } else {
      update([], true)
    }
  }, [data, loading, update])

  useEffect(() => {
    setGetDataFunc(run)
  }, [setGetDataFunc, run])
}

interface UserFundListType {
  fundList: FundUserListDataProps[]
  loading: boolean
  update: (manageFundList: FundUserListDataProps[], loading: boolean) => void
  getData: () => void
}

export const useUserFundList = (): UserFundListType => {
  const { fundList, loading, update, getData } = useStoreUserFundList((state: any) => ({
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

export const useGetUserFundList = () => {
  const { signer } = useProfile()
  const { getUserFundList } = FundReader
  const { update, setGetDataFunc } = useStoreUserFundList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  const { data, loading, run } = useRequest(
    async () => {
      if (signer) return await getUserFundList(signer)
    },
    {
      refreshDeps: [signer]
    }
  )
  useEffect(() => {
    if (data) {
      update(data, loading)
    } else {
      update([], true)
    }
  }, [data, loading, update, signer])

  useEffect(() => {
    setGetDataFunc(run)
  }, [setGetDataFunc, run])
}

export const useManageFundVerifyList = () => {
  const {
    createVerifyList,
    setCreateVerifyList,
    updateVerifyList,
    setUpdateVerifyList,
    lastChangeTime
  } = useStoreManageFundVerifyList((state: any) => {
    return {
      lastChangeTime: state.lastChangeTime,
      createVerifyList: state.createVerifyList,
      setCreateVerifyList: state.setCreateVerifyList,
      updateVerifyList: state.updateVerifyList,
      setUpdateVerifyList: state.setUpdateVerifyList
    }
  })

  useEffect(() => {
    const now = +new Date()
    if (now - lastChangeTime > 1000 * 60 * 60 * 24) {
      setCreateVerifyList([], 0)
      setUpdateVerifyList([], 0)
    }
  }, [lastChangeTime, setCreateVerifyList, setUpdateVerifyList])

  return {
    createVerifyList,
    setCreateVerifyList,
    updateVerifyList,
    setUpdateVerifyList,
    lastChangeTime
  }
}
