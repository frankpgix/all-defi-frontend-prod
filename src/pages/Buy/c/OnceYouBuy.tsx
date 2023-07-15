import React, { FC } from 'react'

import Button from '@/components/common/Button'
import Image from '@/components/common/Image'
const OnceYouBuy: FC = () => {
  return (
    <section className="web-buy-once">
      <header>
        <h2>Once you buy...</h2>
        <Button text to="/">
          read more
        </Button>
      </header>
      <section className="web-buy-once-process">
        <div className="web-buy-once-process-item">
          <div className="web-buy-once-process-item-ball animate__animated animate__backInDown" />
          <em>STEP 1</em>
          <h3>Contribution</h3>
          <p>Contribute to receive AC token and sALL</p>
          <div className="web-buy-once-process-item-detail">
            <div className="web-buy-once-process-item-detail-icons">
              <i>
                <Image src="icon/sac-usdc.png" />
                <span>acUSDC</span>
              </i>
              <i>
                <Image src="icon/sall-token.png" />
                <span>sALL</span>
              </i>
            </div>
          </div>
        </div>
        <div className="web-buy-once-process-item">
          <div className="web-buy-once-process-item-ball animate__animated animate__backInDown animate__delay-1s" />
          <em>STEP 2</em>
          <h3>fund investment</h3>
          <p>Invest AC tokens into any fund to receive Share Token</p>
          <div className="web-buy-once-process-item-detail">
            <div className="web-buy-once-process-item-detail-icons">
              <i>
                <Image src="icon/buy-0.png" />
                <span>Share Token</span>
              </i>
              <i>
                <Image src="icon/sall-token.png" />
                <span>sALL</span>
              </i>
            </div>
          </div>
        </div>
        <div className="web-buy-once-process-item">
          <div className="web-buy-once-process-item-ball animate__animated animate__backInDown animate__delay-2s" />
          <em>STEP 3</em>
          <h3>ALL mining</h3>
          <p>Stake Share Token and sALL to mine ALL</p>
          <div className="web-buy-once-process-item-detail">
            <div className="web-buy-once-process-item-detail-icons">
              <i>
                <Image src="icon/buy-1.png" />
                <span>Mining</span>
              </i>
            </div>
          </div>
        </div>
        <div className="web-buy-once-process-item">
          <div className="web-buy-once-process-item-ball animate__animated animate__backInDown animate__delay-3s" />
          <em>STEP 4</em>
          <h3>harvest ALL</h3>
          <p>Harvested ALL can be claimed anytime</p>
          <div className="web-buy-once-process-item-detail">
            <div className="web-buy-once-process-item-detail-icons">
              <i>
                <Image src="icon/buy-0.png" />
                <span>Share Token</span>
              </i>
              <i>
                <Image src="icon/alltoken.png" />
                <span>ALL Token</span>
              </i>
            </div>
          </div>
        </div>
        <div className="web-buy-once-process-arrow-1"></div>
        <div className="web-buy-once-process-arrow-2"></div>
        <div className="web-buy-once-process-arrow-3"></div>
        <div className="web-buy-once-process-arrow-4"></div>
        <div className="web-buy-once-process-arrow-5"></div>
      </section>
    </section>
  )
}

export default OnceYouBuy
