import { useCallback, useEffect, useState } from 'react'

import { useSignMessage } from 'wagmi'

import { useProfile } from '@/hooks/useProfile'

import { TaskProfileState } from '@/types/tasks'

import { getDashboard, getProfile, login } from '@/api/tasks'
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
  const { user, dashboard, update } = useStoreTasks((state: TaskProfileState) => ({
    user: state.user,
    update: state.update,
    dashboard: state.dashboard
  }))
  const { goLogin, isLogin } = useLogin()
  const getData = useCallback(async () => {
    const { code, data } = await getProfile()
    const { data: dashboard } = await getDashboard()

    if (code === 0) {
      update(data, dashboard)
    } else if (code === 20003 || code === 20002) {
      cache.rm('Authorization')
      goLogin()
    }
  }, [isLogin])
  useEffect(() => {
    if (!isLogin) {
      goLogin()
    } else {
      getData()
    }
  }, [isLogin])

  return { user, dashboard, isLogin }
}

// export const useTaskDashboard = () => {
//   const { dashboard, update } = useStoreTasks((state: any) => ({
//     dashboard: state.dashboard,
//     update: state.update
//   }))
//   const getData = useCallback(async () => {
//     const { data } = await getDashboard()
//     update(data)
//   }, [])
//   useEffect(() => {
//     getData()
//   }, [])

//   return { dashboard }
// }
