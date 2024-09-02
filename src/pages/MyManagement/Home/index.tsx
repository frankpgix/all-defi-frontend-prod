import { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import { useProfile } from '@/hooks/useProfile'

import Loading from '@@/common/Loading'
import ConnectButton from '@@/core/Wallet/ConnectButton'

const Home: FC = () => {
  const navigate = useNavigate()
  const { account: address, isManager, loading } = useProfile()
  console.log(address, isManager, loading)
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
          Staking <br />
          Management
        </h2>
        <p>Shares holders can monitor their staking performance, manage and adjust their staking</p>
        <hr />
      </main>
    ),
    []
  )
  return (
    <div className="web-manage-menu">
      <Loading type="float" show={loading && !noAddress} />
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
            <p>Whitelisted managers can create new vault, manage and monitor established vault</p>
            <hr />
          </main>
        </li>
      </ul>
    </div>
  )
}

export default Home
