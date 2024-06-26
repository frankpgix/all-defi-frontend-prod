import { FC } from 'react'

import { useProfile } from '@/hooks/useProfile'
import { useGetTaskProfile } from '@/hooks/useTasks'

import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'
import Button from '@@/common/Button'
import ConnectButton from '@@/core/Wallet/ConnectButton'

import Dashboard from './c/Dashboard'
import GetPoints from './c/GetPoints'
import Leaderboard from './c/Leaderboard'
import MyPoints from './c/MyPoints'

const Tasks: FC = () => {
  const { account } = useProfile()
  const { isLogin, goLogin } = useGetTaskProfile()
  return (
    <>
      <Dashboard />
      {!isLogin && (
        <div className="web">
          <Alert show type="error">
            To access personal points data, you need to sign with your wallet first{' '}
            <ConnectButton simple>
              {!account ? (
                <Button size="mini">Connect Wallet</Button>
              ) : (
                <Button size="mini" onClick={goLogin}>
                  Go Sign
                </Button>
              )}
            </ConnectButton>
          </Alert>
          <Blank />
        </div>
      )}
      <GetPoints />
      <MyPoints />
      <Leaderboard />
    </>
  )
}

export default Tasks
