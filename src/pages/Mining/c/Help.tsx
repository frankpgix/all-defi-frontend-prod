import React, { FC } from 'react'
import Button from '@@/common/Button'
const Help: FC = () => {
  return (
    <section className="web-mining-help">
      <div className="web-mining-help-ball animate__animated animate__fadeInLeftBig" />
      <h3>how to mining</h3>
      <article>
        <p>
          Subscribe to various funds offered by AllDeFi to get shares credentials, participate in mining and earn ALL
          rewards.
        </p>
        <Button to="/fund-market" text>
          read more
        </Button>
      </article>
    </section>
  )
}
export default Help
