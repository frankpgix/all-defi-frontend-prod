import { FC } from 'react'

import { useConnectDiscord, useConnectTwitter, useTaskProfile } from '@/hooks/useTasks'

import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import Image from '@@/common/Image'

const GetPoints: FC = () => {
  const { user, point } = useTaskProfile()
  const { goConnectTwitter, loading: twitterLoading } = useConnectTwitter()
  const { goConnectDiscord, loading: discordLoading } = useConnectDiscord()
  return (
    <section className="p-tasks-get-point-layout">
      <header className="p-tasks-get-point-header">
        <h3>Get Points Immediately</h3>
        <Button text>need helps?</Button>
      </header>
      <section className="p-tasks-get-point">
        <div className="p-tasks-get-point-item">
          <main>
            <Image src="task/x.svg" />
            <h4>Connect and follow AllDefi on Twitter</h4>
            <p>
              Copy invitation link, connect and follow us on Twitter, and get multiplier points.
            </p>
          </main>
          <footer>
            <Button
              size="medium"
              loading={twitterLoading}
              disabled={Boolean(user.twitterDisplayName)}
              onClick={goConnectTwitter}
            >
              {Boolean(user.twitterDisplayName) ? 'Followed' : 'connect'}
            </Button>
          </footer>
        </div>
        <div className="p-tasks-get-point-item">
          <main>
            <Image src="task/m.svg" />
            <h4>Join AllDefi Discord and get more points</h4>
            <p>Copy invitation link, join AllDefi Discord and get multiplier points.</p>
          </main>
          <footer>
            <Button
              loading={discordLoading}
              disabled={Boolean(user.discordName)}
              onClick={goConnectDiscord}
              size="medium"
            >
              {Boolean(user.discordName) ? 'Joined' : 'join'}
            </Button>
          </footer>
        </div>
        <div className="p-tasks-get-point-item fire">
          {/* <header>Token worth $1,000 USD deposit can get 100pts. </header> */}
          <main>
            <Image src="task/actoken.svg" />
            <h4>Deposit token and get AC Token</h4>
            <aside>
              <strong>
                {formatNumber(point.todayDepositPoints, 2, '0,0.00')}
                <small>pts</small>
              </strong>
              <span>You have received today.</span>
            </aside>
            <Button text>KYC Entrance</Button>
          </main>
          <footer>
            <Button size="medium">deposit</Button>
          </footer>
        </div>
        <div className="p-tasks-get-point-item fire">
          {/* <header>Token worth $1,000 USD deposit can get 100pts. </header> */}
          <main>
            <Image src="task/value.svg" />
            <h4>Stake to vault</h4>
            <aside>
              <strong>
                {formatNumber(point.todayStakePoints, 2, '0,0.00')}
                <small>pts</small>
              </strong>
              <span>You have received today.</span>
            </aside>
            <Button text>Buy acFDUSD</Button>
            <Button text>Buy acBTC</Button>
          </main>
          <footer>
            <Button size="medium">stake</Button>
          </footer>
        </div>
      </section>
    </section>
  )
}
export default GetPoints
