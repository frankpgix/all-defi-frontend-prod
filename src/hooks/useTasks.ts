import { useCallback, useEffect, useState } from 'react'

import { useAccount, useSignMessage } from 'wagmi'

import { TaskLoginProps, TaskProfileState } from '@/types/tasks'

import {
  checkDiscordFollow,
  connectDiscord,
  connectTwitter,
  getDashboard,
  getInviteCode,
  getPoint,
  getProfile,
  login
} from '@/api/tasks'
import { useStoreTaskLogin, useStoreTasks } from '@/stores/useStoreTasks'
import cache from '@/utils/cache'
import { sleep } from '@/utils/tools'

export const useLogin = () => {
  const { isLogin, outTime, update, logout } = useStoreTaskLogin((state: TaskLoginProps) => ({
    isLogin: state.isLogin,
    outTime: state.outTime,
    update: state.update,
    logout: state.logout
  }))

  const { address: userAddress } = useAccount()
  const { signMessage } = useSignMessage()
  // const [isLogin, setIsLogin] = useState(false)
  const goLogin = useCallback(async () => {
    const tokenCache = cache.get('Authorization')
    await sleep(200)

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
              outTime: data.expiresIn ?? 0 * 1000
            })
            update(true, data.expiresIn ?? 0 * 1000)
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
        update(false, 0)
      }
      update(true, tokenCache.outTime)
    }
  }, [userAddress, isLogin])

  useEffect(() => {
    if (!userAddress) {
      cache.rm('Authorization')
      logout()
    } else {
      const tokenCache = cache.get('Authorization')
      if (tokenCache.outTime < Date.now()) {
        update(false, 0)
      }
      update(true, tokenCache.outTime)
    }
  }, [userAddress])

  return { goLogin, isLogin, logout }
}

export const useTaskProfile = () => {
  const { user, dashboard, point, discordFollowed } = useStoreTasks((state: TaskProfileState) => ({
    user: state.user,
    update: state.update,
    dashboard: state.dashboard,
    point: state.point,
    discordFollowed: state.discordFollowed
  }))
  const { isLogin } = useLogin()

  return { user, dashboard, isLogin, point, discordFollowed }
}

export const useGetTaskProfile = () => {
  const { update, init } = useStoreTasks((state: TaskProfileState) => ({
    init: state.init,
    update: state.update
  }))
  const { goLogin, isLogin, logout } = useLogin()
  const getTaskProfile = useCallback(async () => {
    const { code, data } = await getProfile()
    const { data: dashboard } = await getDashboard()
    const { data: point } = await getPoint()
    const { data: checkDiscord } = await checkDiscordFollow()
    if (checkDiscord?.isMember && !data?.inviteCode) {
      await getInviteCode()
      getTaskProfile()
      return
    }

    if (code === 0) {
      update(data, dashboard, point, Boolean(checkDiscord?.isMember))
    } else if (code === 20003 || code === 20002) {
      cache.rm('Authorization')
      init()
      logout()
    }
  }, [isLogin])
  useEffect(() => {
    console.log(111, isLogin)
    if (!isLogin) {
      init()
    } else {
      getTaskProfile()
    }
  }, [isLogin])

  return { getTaskProfile, isLogin, goLogin }
}

export const useConnectTwitter = () => {
  const [loading, setLoading] = useState(false)
  const goConnectTwitter = async () => {
    setLoading(true)
    const { data } = await connectTwitter()
    window.open(data.authUrl)
    setLoading(false)
  }

  return { goConnectTwitter, loading }
}

export const useConnectDiscord = () => {
  const [loading, setLoading] = useState(false)
  const goConnectDiscord = async () => {
    setLoading(true)
    const { data } = await connectDiscord()
    window.open(data.authUrl)
    setLoading(false)
    console.log(data)
  }

  return { goConnectDiscord, loading }
}
