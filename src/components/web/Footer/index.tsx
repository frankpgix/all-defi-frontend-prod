import React, { FC } from 'react'

import ALink from '@@/common/ALink'
import nav from './nav'

const Footer: FC = () => {
  return (
    <footer className="web-footer">
      <main>
        <h2 className="web-footer-logo">All Defi</h2>
        <nav className="web-footer-nav">
          {nav.map(({ name, list }, index) => (
            <dl key={index}>
              <dt>{name}</dt>
              {list.map(({ name, url }, key) => (
                <dd key={`${index}-${key}`}>
                  <ALink to={url}>{name}</ALink>
                </dd>
              ))}
            </dl>
          ))}
        </nav>
        <div className="web-footer-community">
          <a className="twitter" title="Twitter" href="https://www.google.com" target="_blank">
            Twitter
          </a>
          <a className="telegram" title="Telegram" href="https://www.google.com" target="_blank">
            Telegram
          </a>
          <a className="discord" title="Discord" href="https://www.google.com" target="_blank">
            Discord
          </a>
          <a className="email" title="Email" href="mailto:web@alldefi.com">
            Email
          </a>
        </div>
      </main>
      <div className="web-footer-copy">&copy; All DeFi</div>
    </footer>
  )
}

export default Footer
