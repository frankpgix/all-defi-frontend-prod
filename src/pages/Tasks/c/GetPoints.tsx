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
        <div className="p-tasks-get-point-item">
          <main>
            <Image src="task/x.svg" />
            <h4>Connect and follow AllDefi on Twitter</h4>
            <p>
              Copy invitation link, connect and follow us on Twitter, and get multiplier points.
            </p>
            <br />
            <Button text to="https://twitter.com/intent/follow?screen_name=Alldefiprotocol">
              Twitter
            </Button>
          </main>
          <footer>
            <SignHelpButton {...{ isLogin, goLogin }}>
              <Button
                size="medium"
                loading={twitterLoading}
                disabled={user.twitterFollowed}
                to="https://twitter.com/intent/follow?screen_name=Alldefiprotocol"
                onClick={goConnectTwitter}
              >
                {user.twitterFollowed ? 'Followed' : 'Follow'}
              </Button>
            </SignHelpButton>
          </footer>
        </div>
        <div className="p-tasks-get-point-item">
          <main>
            <Image src="task/m.svg" />
            <h4>Join AllDefi Discord and get more points</h4>
            <p>Copy invitation link, join AllDefi Discord and get multiplier points.</p>
            <br />
            <Button text to="https://discord.gg/BQbzfRkH">
              Discord
            </Button>
          </main>
          <footer>
            <SignHelpButton {...{ isLogin, goLogin }}>
              <Button
                loading={discordLoading}
                disabled={Boolean(user.discordJoined)}
                onClick={goConnectDiscord}
                to="https://discord.gg/BQbzfRkH"
                size="medium"
              >
                {user.discordJoined ? 'Joined' : 'join'}
              </Button>
            </SignHelpButton>
          </footer>
        </div>
        {/* <div className={classNames('p-tasks-get-point-item', { fire: isBaseTaskFinish })}>
          {/* <header>Token worth $1,000 USD deposit can get 100pts. </header>
          <main>
            <Image src="task/actoken.svg" />
            <h4>Deposit token and get AC Token</h4>
            <aside>
              <strong>
                {formatNumber(point.todayDepositPoints, 0, '0,0')}
                <small>pts</small>
              </strong>
              <span>You have received today.</span>
            </aside>
            <Button text>KYC Entrance</Button>
          </main>
          <footer>
            <SignHelpButton {...{ isLogin, goLogin }}>
              <Button size="medium" to="/buy" disabled={!isBaseTaskFinish}>
                deposit
              </Button>
            </SignHelpButton>
          </footer>
        </div> */}
        <div className={classNames('p-tasks-get-point-item', { fire: isBaseTaskFinish })}>
          {/* <header>Token worth $1,000 USD deposit can get 100pts. </header> */}
          <main>
            <Image src="task/value.svg" />
            <h4>Stake to vault</h4>
            <aside>
              <strong>
                {formatNumber(point.todayStakePoints, 0, '0,0')}
                <small>pts</small>
              </strong>
              <span>You have received today.</span>
            </aside>
            {/* <Button text>Buy acFDUSD</Button>
            <Button text>Buy acBTC</Button> */}
          </main>
          <footer>
            <SignHelpButton {...{ isLogin, goLogin }}>
              <Button size="medium" to="/vaults" disabled={!isBaseTaskFinish}>
                stake
              </Button>
            </SignHelpButton>
          </footer>
        </div>
      </section>
    </section>
  )
}
export default GetPoints
