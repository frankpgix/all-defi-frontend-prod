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
  const { address: userAddress } = useAccount()

  const { update, init } = useStoreTasks((state: TaskProfileState) => ({
    init: state.init,
    update: state.update
  }))
  const { goLogin, isLogin, logout, loginLoading } = useLogin()
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
    } else {
      cache.rm('Authorization')
      init()
      logout()
    }
  }, [isLogin, userAddress])
  useEffect(() => {
    if (!isLogin) {
      init()
    } else {
      getTaskProfile()
    }
  }, [isLogin, userAddress])

  return { getTaskProfile, isLogin, goLogin, loginLoading }
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
