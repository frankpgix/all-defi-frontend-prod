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
  login,
  register
} from '@/api/tasks'
import { useStoreTaskLogin, useStoreTasks } from '@/stores/useStoreTasks'
import cache from '@/utils/cache'
import { sleep } from '@/utils/tools'

import { useNotify } from './useNotify'

export const useLoginStore = () => {
  const { isLogin, loginLoading, update, outTime, logout } = useStoreTaskLogin(
    (state: TaskLoginProps) => ({
      isLogin: state.isLogin,
      loginLoading: state.loginLoading,
      outTime: state.outTime,
      update: state.update,
      logout: state.logout
    })
  )
  return { isLogin, loginLoading, update, outTime, logout }
}

export const useLogin = () => {
  const { isLogin, loginLoading, update, outTime, logout } = useLoginStore()
  const { address: userAddress } = useAccount()
  const { signMessage } = useSignMessage()
  // const [isLogin, setIsLogin] = useState(false)
  const goLogin = useCallback(async () => {
    update(false, false, false, 0)
    const tokenCache = cache.get('Authorization')
    // const referrer = cache.get('inviteCode')
    await sleep(200)

    // console.log(1122, userAddress && !isLogin && !tokenCache)
    if (userAddress && !isLogin && (!tokenCache || tokenCache.outTime < Date.now())) {
      if (window.isInTaskSign) return
      window.isInTaskSign = true
      const timestamp = ~~(+new Date() / 1000)
      const message = JSON.stringify({ userAddress, timestamp })
      signMessage(
        { message },
        {
          onSuccess: async (signature) => {
            const param = { message, signature } as any
            // if (referrer) {
            //   param.referrer = referrer
            // }
            const { data } = await login(param)

            const isRegister = data.user?.referrer !== undefined

            cache.set('Authorization', {
              token: `Bearer ${data.token}`,
              outTime: (data.expiresIn ?? 0) * 1000,
              userAddress,
              isRegister
            })
            update(true, false, isRegister, (data.expiresIn ?? 0) * 1000)
            // console.log(data)
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
        console.log(1234567)
        update(false, false, false, 0)
      } else {
        update(true, false, tokenCache.isRegister, tokenCache.outTime)
      }
    }
  }, [userAddress, isLogin])

  useEffect(() => {
    if (!userAddress) {
      cache.rm('Authorization')
      logout()
    } else {
      const tokenCache = cache.get('Authorization')
      if ((tokenCache?.outTime ?? 0) < +Date.now()) {
        update(false, false, false, 0)
      } else {
        update(true, false, tokenCache?.isRegister, tokenCache?.outTime)
      }
    }
  }, [userAddress])

  return { goLogin, isLogin, logout, loginLoading }
}

export const useRegister = () => {
  const tokenCache = cache.get('Authorization')
  const { getTaskProfile } = useTaskProfileInit()
  const { isLogin, isRegister, update } = useStoreTaskLogin((state: TaskLoginProps) => ({
    isLogin: state.isLogin,
    isRegister: state.isRegister,
    update: state.update
  }))
  const { createNotify, updateNotifyItem } = useNotify()
  const goRegister = async (code: string) => {
    const notifyId = await createNotify({ type: 'loading', content: 'Bind Referrer' })
    const data = await register(code)
    if (data.code === 0) {
      cache.set('Authorization', { ...tokenCache, isRegister: true })
      update(true, false, true, tokenCache?.outTime)
      updateNotifyItem(notifyId, {
        title: 'Operation successful',
        type: 'success',
        content: 'Bind Referrer'
      })
      await sleep(200)
      getTaskProfile()
    } else {
      updateNotifyItem(notifyId, {
        title: 'Bind Referrer',
        type: 'error',
        content: data.msg
      })
    }
    console.log(data)
  }
  // useEffect(() => { },[isLogin, isRegister])
  return { isLogin, isRegister, goRegister }
}

export const useTaskProfile = () => {
  const { user, dashboard, point } = useStoreTasks((state: TaskProfileState) => ({
    user: state.user,
    update: state.update,
    dashboard: state.dashboard,
    point: state.point
  }))
  const { isLogin } = useLoginStore()

  return { user, dashboard, isLogin, point }
}

export const useTaskProfileInit = () => {
  const { update, init } = useStoreTasks((state: TaskProfileState) => ({
    init: state.init,
    update: state.update
  }))
  const { logout } = useLoginStore()
  const getTaskProfile = async () => {
    const isRegister = cache.get('Authorization')?.isRegister ?? false
    if (!isRegister) return
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

  const { isLogin, loginLoading } = useLoginStore()

  const { init } = useStoreTasks((state: TaskProfileState) => ({
    init: state.init
  }))
  const { goLogin } = useLogin()

  const getData = useCallback(async () => getTaskProfile(), [isLogin, userAddress])
  useEffect(() => {
    const cacheUser = cache.get('Authorization')?.userAddress ?? ''
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
