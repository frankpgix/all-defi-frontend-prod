import { FC, ReactNode, useMemo } from 'react'

import classNames from 'classnames'

import { useConnectDiscord, useConnectTwitter, useLogin, useTaskProfile } from '@/hooks/useTasks'

import { WHITEPAPER_URL } from '@/config'
import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import Image from '@@/common/Image'
import ConnectHelpButton from '@@/core/Wallet/ConnectHelpButton'

const SignHelpButton: FC<{ children: ReactNode; isLogin: boolean; goLogin: () => void }> = ({
  children,
  isLogin,
  goLogin
}) => {
  return (
    <ConnectHelpButton size="mini">
      {isLogin ? (
        children
      ) : (
        <Button size="mini" onClick={goLogin}>
          GO Sign
        </Button>
      )}
    </ConnectHelpButton>
  )
}

const GetPoints: FC = () => {
  const { isLogin, goLogin } = useLogin()

  const { user, point } = useTaskProfile()
  const { goConnectTwitter, loading: twitterLoading } = useConnectTwitter()
  const { goConnectDiscord, loading: discordLoading } = useConnectDiscord()
  const isBaseTaskFinish = useMemo(
    () => user.twitterFollowed && user.discordJoined,
    [user.twitterFollowed, user.discordJoined]
  )

  return (
    <section className="p-tasks-get-point-layout">
      <header className="p-tasks-get-point-header">
        <h3>Get Points Immediately</h3>
        <Button text to={WHITEPAPER_URL}>
          need helps?
        </Button>
      </header>
      <section className="p-tasks-get-point">
        <div className={classNames('p-tasks-get-point-item')}>
          <section>
            <Image src="task/value.svg" />
            <main>
              <h4>Stake to vault</h4>
              <p>{formatNumber(point.todayStakePoints, 0, '0,0')} pts rewards / day</p>
            </main>
          </section>
          <SignHelpButton {...{ isLogin, goLogin }}>
            <Button size="mini" to="/vaults" disabled={!isBaseTaskFinish}>
              stake
            </Button>
          </SignHelpButton>
        </div>
        <div className="p-tasks-get-point-item">
          <section>
            <Image src="task/x.svg" />
            <main>
              <h4>Follow us on X</h4>
              <p>2x rewards / day</p>
            </main>
          </section>
          <SignHelpButton {...{ isLogin, goLogin }}>
            <Button
              size="mini"
              loading={twitterLoading}
              disabled={user.twitterFollowed}
              to="https://twitter.com/intent/follow?screen_name=Alldefiprotocol"
              onClick={goConnectTwitter}
            >
              {user.twitterFollowed ? 'Followed' : 'Follow'}
            </Button>
          </SignHelpButton>
        </div>
        <div className="p-tasks-get-point-item">
          <section>
            <Image src="task/m.svg" />
            <main>
              <h4>JJoin us on Discord</h4>
              <p>2x rewards / day</p>
            </main>
          </section>
          <SignHelpButton {...{ isLogin, goLogin }}>
            <Button
              loading={discordLoading}
              disabled={Boolean(user.discordJoined)}
              onClick={goConnectDiscord}
              to="https://discord.gg/BQbzfRkH"
              size="mini"
            >
              {user.discordJoined ? 'Joined' : 'join'}
            </Button>
          </SignHelpButton>
        </div>
      </section>
    </section>
  )
}
export default GetPoints
