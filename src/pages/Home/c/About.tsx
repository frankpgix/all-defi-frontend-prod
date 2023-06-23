import React, { FC } from 'react'
// import { VIDEO_RESOURCES_URL } from '@/config'
import Button from '@/components/common/Button'
// import Image from '@/components/common/Image'
// import Video from '@/components/common/Video'

const About: FC = () => {
  return (
    <section className="web-home-about">
      <main>
        <h4>
          ALLDeFi welcomes all professional and responsible fund managers to create their own funds on the platform.
        </h4>
        <p>
          To ensure the quality of the service and protect investors, the fund managers need to participate with a real
          name and prove his proficiency beforehand. Rather than a pure on-chain approach, ALLDeFi chooses to apply more
          strict due diligence in an off-chain fashion.
        </p>
        <Button to="/manage">CREATE A FUND</Button>
      </main>
    </section>
  )
}

export default About
