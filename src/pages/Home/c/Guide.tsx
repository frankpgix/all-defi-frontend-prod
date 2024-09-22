import { FC } from 'react'

import Button from '@/components/common/Button'

// import Image from '@/components/common/Image'

const Guide: FC = () => {
  return (
    <section className="web-home-guide">
      <main>
        <h2>Stake to a vault from DAO treasury</h2>
        <p>
          AC tokens are the native DAO tokens that allow holders to stake DAO treasury on AllDeFi
          platform. They can be obtained through making a deposit to AC DAO or directly purchased
          from the open market at market price.
        </p>
        <aside>
          {/* <Button to="/buy" outline>
            Buy AC token
          </Button> */}
          <Button to="/vaults">RESTAKE TO A VAULT</Button>
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
