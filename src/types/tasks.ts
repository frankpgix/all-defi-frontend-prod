export interface taskUserProps {
  discordAvatarUrl: string
  discordDisplayName: string
  discordName: string
  inviteCode: string
  inviteeCount: number
  referrer: string
  twitterAvatarUrl: string
  twitterDisplayName: string
  twitterName: string
}

export interface taskDashboardProps {
  totalUsers: number
  newUsersToday: number
  totalPoints: number
  pointsToday: number
  topUsers: { userAddress: string; totalPoints: number }[]
  topReferrers: { userAddress: string; inviteeCount: number }[]
}

export type TaskProfileState = {
  user: taskUserProps
  dashboard: taskDashboardProps
  update: (user: taskUserProps, dashboard: taskDashboardProps) => void
}
