import { create } from 'zustand'

import {
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
      set({
        user: taskUserDefault,
        dashboard: taskDashboardDefault,
        point: taskPointDefault,
        discordFollowed: false
      })
    }
  }
})
