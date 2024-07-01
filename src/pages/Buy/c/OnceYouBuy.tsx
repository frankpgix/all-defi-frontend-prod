import { FC } from 'react'

import Button from '@/components/common/Button'
import Image from '@/components/common/Image'
import { WHITEPAPER_URL } from '@/config'

const OnceYouBuy: FC = () => {
  return (
    <section className="c-buy-once">
      <header>
        <h2>What can you do with AC token… </h2>
        <Button text to={WHITEPAPER_URL}>
          read more
        </Button>
      </header>
      <section className="c-buy-once-process">
        <div className="c-buy-once-process-item">
          <div className="c-buy-once-process-item-ball animate__animated animate__backInDown" />
          <em>STEP 1</em>
          <h3>Buy & Deposit</h3>
          <p>Buy AC token and deposit to AC DAO, receive AC Token</p>
          <div className="c-buy-once-process-item-detail">
            <div className="c-buy-once-process-item-detail-icons">
              <i>
                <Image src="icon/sac-usdc.png" />
                <span>acFDUSD</span>
              </i>
              {/* <i>
                <Image src="icon/sall-token.png" />
                <span>sALL</span>
              </i> */}
            </div>
          </div>
        </div>
        <div className="c-buy-once-process-item">
          <div className="c-buy-once-process-item-ball animate__animated animate__backInDown animate__delay-1s" />
          <em>STEP 2</em>
          <h3>Stake</h3>
          <p>Stake to any vaults managed by professional managers</p>
          <div className="c-buy-once-process-item-detail">
            <div className="c-buy-once-process-item-detail-icons">
              <i>
                <Image src="icon/buy-0.png" />
                <span>Share Token</span>
              </i>
              {/* <i>
                <Image src="icon/sall-token.png" />
                <span>sALL</span>
              </i> */}
            </div>
          </div>
        </div>
        <div className="c-buy-once-process-item">
          <div className="c-buy-once-process-item-ball animate__animated animate__backInDown animate__delay-2s" />
          <em>STEP 3</em>
          <h3>Reward</h3>
          <p>Receive AC Tokens reward if vaults perform</p>
          <div className="c-buy-once-process-item-detail">
            <div className="c-buy-once-process-item-detail-icons">
              <i>
                <Image src="asset/mining.png" />
                <span>Reward</span>
              </i>
            </div>
          </div>
        </div>
        <div className="c-buy-once-process-item">
          <div className="c-buy-once-process-item-ball animate__animated animate__backInDown animate__delay-3s" />
          <em>STEP 4</em>
          <h3>Adjust Staking</h3>
          <p>Unstake from vaults and reallocate if needed</p>
          <div className="c-buy-once-process-item-detail">
            <div className="c-buy-once-process-item-detail-icons">
              <i>
                <Image src="asset/withhold.png" />
                <span>Unstake</span>
              </i>
              {/* <i>
                <Image src="icon/alltoken.png" />
                <span>ALL Token</span>
              </i> */}
            </div>
          </div>
        </div>
        <div className="c-buy-once-process-arrow-1"></div>
        <div className="c-buy-once-process-arrow-2"></div>
        <div className="c-buy-once-process-arrow-3"></div>
        <div className="c-buy-once-process-arrow-4"></div>
        <div className="c-buy-once-process-arrow-5"></div>
      </section>
    </section>
  )
}

export default OnceYouBuy
