import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Home from '@/pages/Home'
import Cache from '@/utils/cache'

const Invite: FC = () => {
  const location = useLocation()
  useEffect(() => {
    // 获取 URL 参数
    const searchParams = new URLSearchParams(location.search)
    const code = searchParams.get('code')
    if (code) {
      Cache.set('inviteCode', code)
    }
  }, [])
  return <Home />
}

export default Invite
