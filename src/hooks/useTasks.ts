import { useCallback, useEffect, useState } from 'react'

import { useAccount, useSignMessage } from 'wagmi'

import { TaskProfileState } from '@/types/tasks'

import {
  checkDiscordFollow,
  connectDiscord,
  connectTwitter,
  getDashboard,
  getPoint,
  getProfile,
  login
} from '@/api/tasks'
import { useStoreTasks } from '@/stores/useStoreTasks'
import cache from '@/utils/cache'
import { sleep } from '@/utils/tools'

export const useLogin = () => {
  const { address: userAddress } = useAccount()
  const { signMessage } = useSignMessage()
  const [isLogin, setIsLogin] = useState(false)
  const goLogin = useCallback(async () => {
    const token = cache.get('Authorization')
    await sleep(200)

    if (userAddress && !isLogin && !token) {
      if (window.isInTaskSign) return
      window.isInTaskSign = true
      const timestamp = ~~(+new Date() / 1000)
      const message = JSON.stringify({ userAddress, timestamp })
      signMessage(
        { message },
        {
          onSuccess: async (signature) => {
            const { data } = await login({ message, signature })
            cache.set('Authorization', `Bearer ${data.token}`)
            setIsLogin(true)
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
    if (token) {
      setIsLogin(true)
    }
  }, [userAddress, isLogin])

  const logout = () => setIsLogin(false)

  useEffect(() => {
    if (!userAddress) {
      cache.rm('Authorization')
      setIsLogin(false)
    } else {
      if (cache.get('Authorization')) {
        setIsLogin(true)
      }
    }
  }, [userAddress])

  return { goLogin, isLogin, logout }
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

export const useGetTaskProfile = () => {
  const { logout } = useLogin()
  const { update, init } = useStoreTasks((state: TaskProfileState) => ({
    init: state.init,
    update: state.update
  }))
  const { goLogin, isLogin } = useLogin()
  const getTaskProfile = useCallback(async () => {
    const { code, data } = await getProfile()
    const { data: dashboard } = await getDashboard()
    const { data: point } = await getPoint()
    const { data: checkDiscord } = await checkDiscordFollow()

    if (code === 0) {
      update(data, dashboard, point, Boolean(checkDiscord?.isMember))
    } else if (code === 20003 || code === 20002) {
      cache.rm('Authorization')
      init()
      logout()
    }
    console.log(1112222)
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
