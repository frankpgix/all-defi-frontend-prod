import { FC } from 'react'

import Button from '@/components/common/Button'

// import Image from '@/components/common/Image'

const Guide: FC = () => {
  return (
    <section className="web-home-guide">
      <main>
        <h2>Choose a vault to stake your asset</h2>
        <p>
          Vaults can be filtered by strategy type and staking asset. Explore and select the vault
          that aligns with your asset type and risk-return profile.
        </p>
        <aside>
          {/* <Button to="/buy" outline>
            Buy AC token
          </Button> */}
          <Button to="/vaults">STAKE TO A VAULT</Button>
        </aside>
        <section>
          <dl>
            <dt>1.</dt>
            <dd>Make sure you have AC tokens to Stake.</dd>
          </dl>
          <dl>
            <dt>2.</dt>
            <dd>Choose one of several vaults listed.</dd>
          </dl>
          <dl>
            <dt>3.</dt>
            <dd>Select a vault to a vault by staking your AC tokens into the strategy's vault.</dd>
          </dl>
          <dl>
            <dt>4.</dt>
            <dd>Staking is finalized and watch the performance.</dd>
          </dl>
        </section>
      </main>
    </section>
  )
}

export default Guide
