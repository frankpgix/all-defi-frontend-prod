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
    discordFollowed: false,
    update: (
      user: taskUserProps,
      dashboard: taskDashboardProps,
      point: taskUserPointProps,
      discordFollowed: boolean
    ) => {
      set({ user, dashboard, point, discordFollowed })
    },
    init: () => {
      console.log(12345, '这里init 了数据')
      set({
        user: taskUserDefault,
        dashboard: taskDashboardDefault,
        point: taskPointDefault,
        discordFollowed: false
      })
    }
  }
})

export const useStoreTaskLogin = create<TaskLoginProps>((set) => {
  return {
    isLogin: false,
    loginLoading: true,
    outTime: 0,
    update: (isLogin: boolean, loginLoading: boolean, outTime?: number) => {
      set({ isLogin, outTime, loginLoading })
    },
    logout: () => set({ isLogin: false, outTime: 0, loginLoading: false })
  }
})
