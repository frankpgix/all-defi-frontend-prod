import { FC, useMemo } from 'react'

import ConnectButton from '@/components/common/Wallet/ConnectButton'
import { useProfile } from '@/hooks/useProfile'

export interface NotConnect {
  br?: number
}
const NotConnect: FC<NotConnect> = ({ br = 48 }) => {
  const { account } = useProfile()
  return useMemo(() => {
    if (!account) {
      return (
        <section className="web-not-connect" style={{ borderRadius: `${br}px` }}>
          <ConnectButton />
        </section>
      )
    }
    return null
  }, [account, br])
}

export default NotConnect
