// https://statistics-api.jimmyllee098.workers.dev/v1/userPoint?uid=0xB8562Ce515894d5409C99449cb4139f0EfDF318A&svid=0xd6b7cefa14148e3ed25132dae2e48db0072eb836
import { get } from '@/utils/http'

export const getUserPoint = async (uid: string, svid: string) => {
  const res = await get(
    `https://statistics-api.jimmyllee098.workers.dev/v1/userPoint?uid=${uid}&svid=${svid}`
  )
  return res.data
}
