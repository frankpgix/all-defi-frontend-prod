import React, { FC } from 'react'

import { useProfile } from '@/hooks/useProfile'
import ALink from '@@/common/ALink'
import nav from './nav'

const Footer: FC = () => {
  const { isManager } = useProfile()
  return (
    <footer className="web-footer">
      <main>
        <h2 className="web-footer-logo">All Defi</h2>
        <nav className="web-footer-nav">
          {nav.map(({ name, list }, index) => (
            <dl key={index}>
              <dt>{name}</dt>
              {list.map(({ name, url, checkManage }, key) => (
                <dd key={`${index}-${key}`}>
                  {checkManage ? (
                    <ALink to={url} disabled={isManager}>
                      {name}
                    </ALink>
                  ) : (
                    <ALink to={url}>{name}</ALink>
                  )}
                </dd>
              ))}
            </dl>
          ))}
        </nav>
        <div className="web-footer-community">
          <ALink className="x" title="Twitter" to="https://twitter.com/Alldefiprotocol">
            Twitter
          </ALink>
          <ALink className="email" title="Email" to="mailto:web@alldefi.com">
            Email
          </ALink>
        </div>
      </main>
      <div className="web-footer-copy">&copy; All DeFi</div>
    </footer>
  )
}

export default Footer
