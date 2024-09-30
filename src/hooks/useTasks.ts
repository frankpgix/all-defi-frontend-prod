import { useCallback, useEffect, useState } from 'react'

import { useAccount, useSignMessage } from 'wagmi'

import { TaskLoginProps, TaskProfileState } from '@/types/tasks'

import {
  // checkDiscordFollow,
  connectDiscord,
  connectTwitter,
  getDashboard, // getInviteCode,
  getPoint,
  getProfile,
  login
} from '@/api/tasks'
import { useStoreTaskLogin, useStoreTasks } from '@/stores/useStoreTasks'
import cache from '@/utils/cache'
import { sleep } from '@/utils/tools'

export const useLogin = () => {
  const { isLogin, outTime, loginLoading, update, logout } = useStoreTaskLogin(
    (state: TaskLoginProps) => ({
      isLogin: state.isLogin,
      loginLoading: state.loginLoading,
      outTime: state.outTime,
      update: state.update,
      logout: state.logout
    })
  )

  const { address: userAddress } = useAccount()
  const { signMessage } = useSignMessage()
  // const [isLogin, setIsLogin] = useState(false)
  const goLogin = useCallback(async () => {
    update(false, false, 0)
    const tokenCache = cache.get('Authorization')
    await sleep(200)

    console.log(1122, userAddress && !isLogin && !tokenCache)
    if (userAddress && !isLogin && !tokenCache) {
      if (window.isInTaskSign) return
      window.isInTaskSign = true
      const timestamp = ~~(+new Date() / 1000)
      const message = JSON.stringify({ userAddress, timestamp })
      signMessage(
        { message },
        {
          onSuccess: async (signature) => {
            const { data } = await login({ message, signature })
            cache.set('Authorization', {
              token: `Bearer ${data.token}`,
              outTime: data.expiresIn ?? 0 * 1000,
              userAddress
            })
            update(true, false, data.expiresIn ?? 0 * 1000)
            console.log(data)
          },
          onError: (error) => {
            console.log(error)
          },
          onSettled: () => {
            window.isInTaskSign = false
          }
        }
      )
    }
    if (tokenCache) {
      if (tokenCache.outTime < Date.now()) {
        update(false, false, 0)
      }
      update(true, false, tokenCache.outTime)
    }
  }, [userAddress, isLogin])

  useEffect(() => {
    if (!userAddress) {
      cache.rm('Authorization')
      logout()
    } else {
      const tokenCache = cache.get('Authorization')
      if (tokenCache?.outTime ?? 0 < Date.now()) {
        update(false, false, 0)
      }
      update(true, false, tokenCache?.outTime)
    }
  }, [userAddress])

  return { goLogin, isLogin, logout, loginLoading }
}

export const useTaskProfile = () => {
  const { user, dashboard, point } = useStoreTasks((state: TaskProfileState) => ({
    user: state.user,
    update: state.update,
    dashboard: state.dashboard,
    point: state.point
  }))
  const { isLogin } = useLogin()

  return { user, dashboard, isLogin, point }
}

export const useTaskProfileInit = () => {
  const { update, init } = useStoreTasks((state: TaskProfileState) => ({
    init: state.init,
    update: state.update
  }))
  const { logout } = useLogin()
  const getTaskProfile = async () => {
    const { code, data } = await getProfile()
    const { data: dashboard } = await getDashboard()
    const { data: point } = await getPoint()
    if (code === 0) {
      update(data, dashboard, point)
    } else {
      cache.rm('Authorization')
      init()
      logout()
    }
  }
  return { getTaskProfile }
}

export const useGetTaskProfile = () => {
  const { address: userAddress } = useAccount()

  const { getTaskProfile } = useTaskProfileInit()

  const { init } = useStoreTasks((state: TaskProfileState) => ({
    init: state.init
  }))
  const { goLogin, isLogin, loginLoading } = useLogin()

  const getData = useCallback(async () => getTaskProfile(), [isLogin, userAddress])

  useEffect(() => {
    const cacheUser = cache.get('Authorization')?.userAddress ?? ''
    console.log(1122333, cacheUser, userAddress)
    if (cacheUser !== userAddress) {
      cache.rm('Authorization')
      init()
      if (userAddress) {
        getData()
      }
    }
    if (!isLogin) {
      init()
    } else {
      getData()
    }
  }, [isLogin, userAddress])

  return { getTaskProfile, isLogin, goLogin, loginLoading }
}

export const useConnectTwitter = () => {
  const { getTaskProfile } = useTaskProfileInit()
  const [loading, setLoading] = useState(false)
  const goConnectTwitter = async () => {
    setLoading(true)
    await connectTwitter()
    await getTaskProfile()
    setLoading(false)
  }

  return { goConnectTwitter, loading }
}

export const useConnectDiscord = () => {
  const { getTaskProfile } = useTaskProfileInit()
  const [loading, setLoading] = useState(false)
  const goConnectDiscord = async () => {
    setLoading(true)
    await connectDiscord()
    await getTaskProfile()
    setLoading(false)
  }

  return { goConnectDiscord, loading }
}
