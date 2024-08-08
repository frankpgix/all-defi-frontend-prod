import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useToPageTop } from '@/hooks/useToPageTop'

import ConnectButton from '@/components/core/Wallet/ConnectButton'

import ErrorNetworkAlert from './ErrorNetworkAlert'
import NotifyButton from './NotifyButton'

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
            {/* <NavLink to="/buy">Buy AC Token</NavLink> */}
            <NavLink to="/vaults">Vaults</NavLink>
            <NavLink to="/manage">My Management</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            {/* <NavLink to="/all-mining">ALL MINING</NavLink> */}
            {/* <NavLink to="/">global data</NavLink> */}
          </nav>
          <div className="web-header-tools">
            <ConnectButton />
            <NotifyButton />
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
