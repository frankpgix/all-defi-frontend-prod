import { useCallback, useEffect, useState } from 'react'

import { useSignMessage } from 'wagmi'

import { useProfile } from '@/hooks/useProfile'

import { getProfile, login } from '@/api/tasks'
import { useStoreTasks } from '@/stores/useStoreTasks'
import cache from '@/utils/cache'
import { sleep } from '@/utils/tools'

export const useLogin = () => {
  const { account: userAddress } = useProfile()
  const { signMessage } = useSignMessage()
  const [isLogin, setIsLogin] = useState(false)
  const goLogin = useCallback(async () => {
    const token = cache.get('Authorization')
    await sleep(1000)

    if (userAddress && !isLogin && !token) {
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
          }
        }
      )
    }
    if (token) {
      setIsLogin(true)
    }
  }, [userAddress, isLogin])
  useEffect(() => {
    goLogin()
  }, [goLogin])

  return { goLogin, isLogin }
}

export const useTaskProfile = () => {
  const { user, update } = useStoreTasks((state: any) => ({
    user: state.user,
    update: state.update
  }))
  const { goLogin, isLogin } = useLogin()
  const getData = useCallback(async () => {
    const { code, data } = await getProfile()

    if (code === 20003) {
      cache.rm('Authorization')
      goLogin()
    } else {
      update(data)
    }
  }, [isLogin])
  useEffect(() => {
    if (!isLogin) {
      goLogin()
    } else {
      getData()
    }
  }, [isLogin])

  return { user, isLogin }
}
