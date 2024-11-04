import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Cache from '@/utils/cache'
import Loading from '@@/common/Loading'

const Invite: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // 获取 URL 参数
    const searchParams = new URLSearchParams(location.search)
    const code = searchParams.get('code')
    if (code) {
      Cache.set('inviteCode', code)
    }
    navigate('/')
  }, [])
  return <Loading show type="section" />
}

export default Invite
