import {
  useStoreManageVaultList,
  useStoreVaultList,
  useStoreUserVaultList,
  useStoreManageVaultVerifyList
} from '@/stores/useStoreVaultList'
// import { VaultDetailProps, VaultUserListDataProps } from '@/class/help'
import { VaultDetailProps, VaultUserListDataProps } from '@/types/vault'
import { useProfile } from '@/hooks/useProfile'
import { useManageVaultList, useVaultList, useUserVaultList } from '@/hooks/useVaultReader'
// import FundReader from '@/class/FundReader'
// import { useRequest } from 'ahooks'
import { useEffect, useCallback } from 'react'

interface ManageFundListType {
  manageFundList: VaultDetailProps[]
  loading: boolean
  update: (manageFundList: VaultDetailProps[], loading: boolean) => void
  getData: () => void
}

export const useManageVaultListHook = (): ManageFundListType => {
  const { manageFundList, loading, update, getData } = useStoreManageVaultList((state: any) => ({
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

export const useGetManageVaultList = () => {
  const { data, isLoading: loading, refetch } = useManageVaultList()
  const { update, setGetDataFunc } = useStoreManageVaultList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  const getData = useCallback(() => {
    if (!loading) {
      update(data, loading)
    }
  }, [data, loading])
  useEffect(() => {
    void getData()
  }, [getData])

  useEffect(() => {
    setGetDataFunc(refetch)
  }, [setGetDataFunc, refetch])
}

interface FundListType {
  fundList: VaultDetailProps[]
  loading: boolean
  update: (manageFundList: VaultDetailProps[], loading: boolean) => void
  getData: () => void
}

export const useFundList = (): FundListType => {
  const { fundList, loading, update, getData } = useStoreVaultList((state: any) => ({
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
  // const { getFundList } = FundReader
  const { data, isLoading: loading, refetch } = useVaultList()
  const { update, setGetDataFunc } = useStoreVaultList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  // const { data, loading, run } = useRequest(async () => await getFundList(), {
  //   debounceWait: 300
  // })

  useEffect(() => {
    if (data) {
      update(data, loading)
    } else {
      update([], true)
    }
  }, [data, loading, update])

  useEffect(() => {
    setGetDataFunc(refetch)
  }, [setGetDataFunc, refetch])
}

interface UserFundListType {
  fundList: VaultUserListDataProps[]
  loading: boolean
  update: (manageFundList: VaultUserListDataProps[], loading: boolean) => void
  getData: () => void
}

export const useUserFundList = (): UserFundListType => {
  const { fundList, loading, update, getData } = useStoreUserVaultList((state: any) => ({
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
  const { account } = useProfile()
  // const { getUserFundList } = FundReader

  const { data, isLoading: loading, refetch } = useUserVaultList()
  const { update, setGetDataFunc } = useStoreUserVaultList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  // const { data, loading, run } = useRequest(
  //   async () => {
  //     if (account) return await getUserFundList(account)
  //   },
  //   {
  //     refreshDeps: [account]
  //   }
  // )
  useEffect(() => {
    if (data) {
      update(data, loading)
    } else {
      update([], true)
    }
  }, [data, loading, update, account])

  useEffect(() => {
    setGetDataFunc(refetch)
  }, [setGetDataFunc, refetch])
}

export const useManageFundVerifyList = () => {
  const {
    createVerifyList,
    setCreateVerifyList,
    updateVerifyList,
    setUpdateVerifyList,
    lastChangeTime
  } = useStoreManageVaultVerifyList((state: any) => {
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
    if (now - lastChangeTime > 1000 * 60 * 60 * 24 * 15) {
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
