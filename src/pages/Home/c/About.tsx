import { FC } from 'react'

import CreateVaultButton from '@/components/Vaults/CreateVaultButton'

// import Button from '@/components/common/Button'

// import { useProfile } from '@/hooks/useProfile'

const About: FC = () => {
  // const { isManager } = useProfile()
  // const isMa
  return (
    <section className="web-home-about">
      <main>
        <h4>
          AllDeFi invites all professional fund managers to showcase their strategies on our
          platform.
        </h4>
        <p>
          To maintain service quality and safeguard investors, fund managers must participate using
          their real names and demonstrate their expertise in advance. Instead of relying solely on
          an on-chain approach, AllDeFi implements stringent due diligence off-chain for enhanced
          security.
        </p>
        <CreateVaultButton large>CREATE A VAULT</CreateVaultButton>
      </main>
    </section>
  )
}

export default About
