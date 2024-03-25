import { useEffect } from 'react'

import { useRequest } from 'ahooks'

import { useProfile } from '@/hooks/useProfile'

import { ManageVaultListType, UserVaultListType, VaultListType } from '@/types/vaultListStore'

import { getManageVaultList, getUserVaultList, getVaultList } from '@/api/vaultList'
import {
  useStoreManageVaultList,
  useStoreManageVaultVerifyList,
  useStoreUserVaultList,
  useStoreVaultList
} from '@/stores/useStoreVaultList'

export const useManageVaultListHook = (): ManageVaultListType => {
  const { manageVaultList, loading, update, getData } = useStoreManageVaultList((state: any) => ({
    manageVaultList: state.manageVaultList,
    loading: state.loading,
    update: state.update,
    getData: state.getData
  }))

  return {
    manageVaultList,
    loading,
    update,
    getData
  }
}

export const useGetManageVaultList = () => {
  const { account } = useProfile()
  const { update, setGetDataFunc } = useStoreManageVaultList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  const { data, loading, run } = useRequest(async () => await getManageVaultList(account), {
    debounceWait: 300
  })

  useEffect(() => {
    if (data && !loading) {
      update(data, loading)
    } else {
      update([], true)
    }
  }, [data, loading])

  useEffect(() => {
    setGetDataFunc(run)
  }, [setGetDataFunc, run])

  useEffect(run, [account])
}

export const useVaultList = (): VaultListType => {
  const { vaultList, loading, update, getData } = useStoreVaultList((state: any) => ({
    vaultList: state.vaultList,
    loading: state.loading,
    update: state.update,
    getData: state.getData
  }))

  return {
    vaultList,
    loading,
    update,
    getData
  }
}

export const useGetVaultList = () => {
  const { update, setGetDataFunc } = useStoreVaultList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  const { data, loading, run } = useRequest(async () => await getVaultList(), {
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

export const useUserVaultList = (): UserVaultListType => {
  const { vaultList, loading, update, getData } = useStoreUserVaultList((state: any) => ({
    vaultList: state.vaultList,
    loading: state.loading,
    update: state.update,
    getData: state.getData
  }))

  return {
    vaultList,
    loading,
    update,
    getData
  }
}

export const useGetUserVaultList = () => {
  const { account } = useProfile()
  const { update, setGetDataFunc } = useStoreUserVaultList((state: any) => ({
    update: state.update,
    setGetDataFunc: state.setGetDataFunc
  }))

  const { data, loading, run } = useRequest(
    async () => {
      if (account) return await getUserVaultList(account)
    },
    {
      refreshDeps: [account]
    }
  )
  useEffect(() => {
    if (data) {
      update(data, loading)
    } else {
      update([], true)
    }
  }, [data, loading, update, account])

  useEffect(() => {
    setGetDataFunc(run)
  }, [setGetDataFunc, run])

  useEffect(run, [account])
}

export const useManageVaultVerifyList = () => {
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
