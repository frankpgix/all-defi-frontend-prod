import { FC } from 'react'

import Button from '@/components/common/Button'
import Video from '@/components/common/Video'

const Banner: FC = () => {
  return (
    <section className="web-home-banner">
      <main>
        <h2>Enjoy DAO Growth By Allocating DAO Treasury To Professional Managers.</h2>
        <p>DeFi Industry DAO, From DeFi, For DeFi</p>
        <Button to="/vaults">start now</Button>
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
