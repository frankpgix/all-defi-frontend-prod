import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

// import Button from '@/components/common/Button'
import ConnectButton from '@/components/core/Wallet/ConnectButton'
import { useToPageTop } from '@/hooks/useToPageTop'

import ErrorNetworkAlert from './ErrorNetworkAlert'

const Header: FC = () => {
  const navigate = useNavigate()
  useToPageTop()

  return (
    <>
      <header className="web-header">
        <div className="web-header-inner">
          <h1 className="web-header-logo" onClick={() => navigate('/')}>
            All Defi
          </h1>
          <nav className="web-header-nav">
            <NavLink to="/buy">Buy AC Token</NavLink>
            <NavLink to="/vaults">Vaults</NavLink>
            <NavLink to="/manage">my management</NavLink>
            <NavLink to="/all-mining">ALL MINING</NavLink>
            {/* <NavLink to="/">global data</NavLink> */}
          </nav>
          <div className="web-header-tools">
            <ConnectButton />
          </div>
        </div>
      </header>
      <div className="web-header-bg" />
      <div className="web-header-blank" />
      <ErrorNetworkAlert />
    </>
  )
}

export default Header
// <SelectNetworkButton />
