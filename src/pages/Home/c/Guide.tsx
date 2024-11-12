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
        <section className="web-home-guide-map">
          <dl>
            <dd>
              <button className="btn">Stake Asset</button>
            </dd>
            <dd>
              <button className="btn">Strategy Vault</button>
            </dd>
            <dd></dd>
          </dl>
          <dl>
            <dd>
              <button className="text top">As collateral to borrow</button>
            </dd>
            <dd>
              <button className="btn">Multi-Sig Wallet</button>
            </dd>
            <dd>
              <button className="text bottom">Settl P&L</button>
            </dd>
          </dl>
          <dl>
            <dd>
              <button className="btn">Trading Asset</button>
            </dd>
            <dd></dd>
            <dd>
              <button className="btn">Custody</button>
            </dd>
          </dl>
          <dl>
            <dd></dd>
            <dd>
              <button className="btn">Centralized Exchange</button>
            </dd>
            <dd>
              <button className="text bottom">Mirror</button>
            </dd>
          </dl>
        </section>
      </main>
    </section>
  )
}

export default Guide
