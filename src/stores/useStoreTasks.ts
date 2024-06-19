import { create } from 'zustand'

import { taskUserProps } from '@/types/tasks'

export const useStoreTasks = create((set) => {
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
    update: (user: taskUserProps) => {
      set({ user })
    }
  }
})
