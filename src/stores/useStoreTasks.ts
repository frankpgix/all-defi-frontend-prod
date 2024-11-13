import { create } from 'zustand'

import {
  TaskLoginProps,
  TaskProfileState,
  taskDashboardProps,
  taskUserPointProps,
  taskUserProps
} from '@/types/tasks'

import { taskDashboardDefault, taskPointDefault, taskUserDefault } from '@/data/tasks'

export const useStoreTasks = create<TaskProfileState>((set) => {
  return {
    user: taskUserDefault,
    dashboard: taskDashboardDefault,
    point: taskPointDefault,
    update: (user: taskUserProps, dashboard: taskDashboardProps, point: taskUserPointProps) => {
      set({ user, dashboard, point })
    },
    init: () => {
      console.log(12345, '这里init 了数据')
      set({
        user: taskUserDefault,
        dashboard: taskDashboardDefault,
        point: taskPointDefault
      })
    }
  }
})

export const useStoreTaskLogin = create<TaskLoginProps>((set) => {
  return {
    isLogin: false,
    loginLoading: true,
    isRegister: false,
    outTime: 0,
    update: (isLogin: boolean, loginLoading: boolean, isRegister: boolean, outTime?: number) => {
      set({ isLogin, outTime, isRegister, loginLoading })
    },
    logout: () => set({ isLogin: false, outTime: 0, loginLoading: false, isRegister: false })
  }
})
