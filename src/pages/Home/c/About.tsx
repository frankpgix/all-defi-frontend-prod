import React, { FC } from 'react'
// import { VIDEO_RESOURCES_URL } from '@/config'
import Button from '@/components/common/Button'
// import Image from '@/components/common/Image'
// import Video from '@/components/common/Video'
import { useProfile } from '@/hooks/useProfile'

const About: FC = () => {
  const { isManager } = useProfile()
  // const isMa
  return (
    <section className="web-home-about">
      <main>
        <h4>
          AllDeFi welcomes all professional fund managers to list their own strategies on the
          platform.
        </h4>
        <p>
          To ensure the quality of the service and protect investors, the fund managers need to
          participate with a real name and prove his proficiency beforehand. Rather than a pure
          on-chain approach, AllDeFi chooses to apply more strict due diligence in an off-chain
          fashion.
        </p>
        <Button to="/manage/manager/create" disabled={!isManager}>
          CREATE A VAULT
        </Button>
      </main>
    </section>
  )
}

export default About
