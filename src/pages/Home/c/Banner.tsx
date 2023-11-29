import React, { FC } from 'react'

import Button from '@/components/common/Button'
import Video from '@/components/common/Video'

const Banner: FC = () => {
  return (
    <section className="web-home-banner">
      <main>
        <h2>DeFi Industry DAO, From DeFi, For DeFi</h2>
        <p>
          Enjoy DAO growth by allocating DAO <br />
          treasury to professional strategies
        </p>
        <Button to="/buy">start now</Button>
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
