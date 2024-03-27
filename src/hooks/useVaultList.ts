import { useEffect } from 'react'

import { ManageVaultListType, UserVaultListType, VaultListType } from '@/types/vaultListStore'

import {
  useStoreManageVaultList,
  useStoreManageVaultVerifyList,
  useStoreUserVaultList,
  useStoreVaultList
} from '@/stores/useStoreVaultList'

import {
  useManageVaultList,
  useUserVaultList as useUserVaultListHook,
  useVaultList as useVaultListHook
} from './Contracts/useVaultReader'

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
  const { update } = useStoreManageVaultList((state: any) => ({
    update: state.update
  }))
  const { data, isLoading } = useManageVaultList()

  useEffect(() => {
    update(data, isLoading)
  }, [isLoading])
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
  // const { getTokenByAddress } = useToken()
  const { update } = useStoreVaultList((state: any) => ({
    update: state.update
  }))
  const { data, isLoading } = useVaultListHook()

  useEffect(() => {
    update(data, isLoading)
  }, [isLoading])
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
  const { update } = useStoreUserVaultList((state: any) => ({
    update: state.update
  }))

  const { data, isLoading } = useUserVaultListHook()

  useEffect(() => {
    update(data, isLoading)
  }, [isLoading])
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
