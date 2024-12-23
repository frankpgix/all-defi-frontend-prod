import { FC } from 'react'

import Button from '@/components/common/Button'
import Video from '@/components/common/Video'

const Banner: FC = () => {
  return (
    <section className="web-home-banner">
      <main>
        <h2>Unlock Passive Income: stake your holding and get a yield</h2>
        <p>Stake any token in institutional grade strategy Vaults for additional return</p>
        <Button to="/vaults">Start Now</Button>
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
