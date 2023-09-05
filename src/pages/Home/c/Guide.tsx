import React, { FC } from 'react'
import Button from '@/components/common/Button'
// import Image from '@/components/common/Image'

const Guide: FC = () => {
  return (
    <section className="web-home-guide">
      <main>
        <h2>Make an Investment.</h2>
        <p>
          AC tokens are the native tokens that work as currency in the AllDeFi asset management
          platform. They can be obtained through making a contribution to AC DAO or directly
          purchased from the open market, at market price.
        </p>
        <aside>
          <Button to="/buy" outline>
            Buy AC token
          </Button>
          <Button to="/fund-market">Make an Investment</Button>
        </aside>
        <section>
          <dl>
            <dt>1.</dt>
            <dd>Make sure you have AC tokens to invest.</dd>
          </dl>
          <dl>
            <dt>2.</dt>
            <dd>Choose one of several funds listed</dd>
          </dl>
          <dl>
            <dt>3.</dt>
            <dd>Subscribe to a fund by staking your AC tokens into the fund's vault</dd>
          </dl>
          <dl>
            <dt>4.</dt>
            <dd>Subscription is final and watch your PNL.</dd>
          </dl>
        </section>
      </main>
    </section>
  )
}

export default Guide
