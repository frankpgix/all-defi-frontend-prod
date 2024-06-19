import { get, post } from '@/utils/http'

export const login = async (params: any) => {
  return await post('login', params)
}

export const getProfile = async () => await get('profile')
export const getPoint = async () => await get('point')
export const getInviteCode = async () => await get('inviteCode')
export const getDashboard = async () => await get('dashboard')
export const connectTwitter = async () => await get('twitter/auth')
