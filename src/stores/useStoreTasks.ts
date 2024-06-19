import { create } from 'zustand'

import { TaskProfileState, taskDashboardProps, taskUserProps } from '@/types/tasks'

export const useStoreTasks = create<TaskProfileState>((set) => {
  return {
    user: {
      discordAvatarUrl: '',
      discordDisplayName: '',
      discordName: '',
      inviteCode: '',
      inviteeCount: 0,
      referrer: '',
      twitterAvatarUrl: '',
      twitterDisplayName: '',
      twitterName: ''
    },
    dashboard: {
      totalUsers: 0,
      newUsersToday: 0,
      totalPoints: 0,
      pointsToday: 0,
      topUsers: [
        { userAddress: '0x...', totalPoints: 1000 },
        { userAddress: '0x...', totalPoints: 950 }
      ],
      topReferrers: [
        { userAddress: '0x...', inviteeCount: 20 },
        { userAddress: '0x...', inviteeCount: 18 }
      ]
    },
    update: (user: taskUserProps, dashboard: taskDashboardProps) => {
      set({ user, dashboard })
    }
  }
})
