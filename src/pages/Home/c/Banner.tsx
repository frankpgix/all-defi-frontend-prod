import { FC } from 'react'

import Button from '@/components/common/Button'
import Video from '@/components/common/Video'

const Banner: FC = () => {
  return (
    <section className="web-home-banner">
      <main>
        <h2>Amplify Passive DeFi Yield with Active CeFi Strategy</h2>
        <p>Stake Yield-Bearing Tokens in Expert-Managed Vaults for additional return</p>
        <Button to="/vaults">STAKE sBITU</Button>
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
