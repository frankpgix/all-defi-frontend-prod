import { FC } from 'react'

import Button from '@/components/common/Button'
import Video from '@/components/common/Video'

const Banner: FC = () => {
  return (
    <section className="web-home-banner">
      <main>
        <h2>Stake Yield-Bearing Tokens in Expert-Managed Vaults for additional return</h2>
        <p>Amplify Passive DeFi Yield with Active CeFi Strategy</p>
        <Button to="/vaults">RESTAKE sBITU</Button>
      </main>
      <div className="web-home-banner-video-layout">
        <div className="web-home-banner-video">
          <Video src="ball.mp4" />
        </div>
      </div>
    </section>
  )
}

export default Banner
