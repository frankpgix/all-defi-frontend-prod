import React, { FC } from 'react'
import Button from '@/components/common/Button'
// import Image from '@/components/common/Image'

const Guide: FC = () => {
  return (
    <section className="web-home-guide">
      <main>
        <h2>Allocate to a strategy from DAO treasury</h2>
        <p>
          AC tokens are the native DAO tokens that allow holders to allocate DAO treasury on AllDeFi
          platform. They can be obtained through making a contribution to AC DAO or directly
          purchased from the open market at market price.
        </p>
        <aside>
          <Button to="/buy" outline>
            Buy AC token
          </Button>
          <Button to="/fund-market">ALLOCATE TO A STRATEGY</Button>
        </aside>
        <section>
          <dl>
            <dt>1.</dt>
            <dd>Make sure you have AC tokens to allocate.</dd>
          </dl>
          <dl>
            <dt>2.</dt>
            <dd>Choose one of several strategies listed.</dd>
          </dl>
          <dl>
            <dt>3.</dt>
            <dd>Allocate to a strategy by staking your AC tokens into the strategy's vault.</dd>
          </dl>
          <dl>
            <dt>4.</dt>
            <dd>Allocation is finalized and watch the performance.</dd>
          </dl>
        </section>
      </main>
    </section>
  )
}

export default Guide
