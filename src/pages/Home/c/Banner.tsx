import React, { FC } from 'react'

import Button from '@/components/common/Button'
import Video from '@/components/common/Video'

const Banner: FC = () => {
  return (
    <section className="web-home-banner">
      <main>
        <h2>A Decentralized Asset Management Platform on Blockchain.</h2>
        <p>
          Decentralized yet professional <br />
          invest only with the real professional fund managers
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
