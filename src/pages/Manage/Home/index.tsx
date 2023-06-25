import React, { FC, useMemo } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useStoreProfile } from '@/store/useProfile'

import ConnectButton from '@@/common/Wallet/ConnectButton'

const Home: FC = () => {
  const { address, isManager } = useStoreProfile()
  const navigate = useNavigate()
  const noAddress = useMemo(() => !Boolean(address), [address])

  const goNav = (disabled: boolean, url: string) => {
    if (!disabled) {
      navigate(url)
    }
  }
  const investmentDom = useMemo(
    () => (
      <main>
        <hr />
        <h2>
          Investment <br />
          Management
        </h2>
        <p>Investors can monitor own portofolio, manage existing funds and invest new funds</p>
        <hr />
      </main>
    ),
    []
  )
  return (
    <div className="web-manage-menu">
      <ul>
        {noAddress ? (
          <ConnectButton as="li" simple>
            {investmentDom}
          </ConnectButton>
        ) : (
          <li onClick={() => goNav(noAddress, '/manage/investment')}>{investmentDom}</li>
        )}
        <li
          className={classNames({ disabled: noAddress || !isManager })}
          onClick={() => goNav(noAddress || !isManager, '/manage/manager')}
        >
          <main>
            <hr />
            <h2>
              Strategy <br />
              Management
            </h2>
            <p>Whitelisted managers can create new funds, manage and monitor established funds</p>
            <hr />
          </main>
        </li>
      </ul>
    </div>
  )
}

export default Home
