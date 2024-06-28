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

export interface taskUserPointProps {
  totalDepositPoints: number
  totalStakePoints: number
  totalInvitePoints: number
  todayDepositPoints: number
  todayStakePoints: number
  todayInvitePoints: number
}

export type TaskProfileState = {
  user: taskUserProps
  dashboard: taskDashboardProps
  point: taskUserPointProps
  discordFollowed: boolean
  update: (
    user: taskUserProps,
    dashboard: taskDashboardProps,
    point: taskUserPointProps,
    discordFollowed: boolean
  ) => void
  init: () => void
}

export type TaskLoginProps = {
  isLogin: boolean
  outTime: number
  update: (isLogin: boolean, outTime: number) => void
  logout: () => void
}
