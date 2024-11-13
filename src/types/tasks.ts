export interface taskUserProps {
  referrer: string
  inviteCode: string
  inviteeCount: number
  twitterFollowed: boolean
  discordJoined: boolean
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
  update: (user: taskUserProps, dashboard: taskDashboardProps, point: taskUserPointProps) => void
  init: () => void
}

export interface TaskLoginProps {
  isLogin: boolean
  isRegister: boolean
  loginLoading: boolean
  outTime: number
  update: (isLogin: boolean, loginLoading: boolean, isRegister: boolean, outTime: number) => void
  logout: () => void
}
