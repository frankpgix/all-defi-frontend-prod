import { FC } from 'react'

import { useGetTaskProfile } from '@/hooks/useTasks'

import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'
import Button from '@@/common/Button'
import ConnectHelpButton from '@@/core/Wallet/ConnectHelpButton'

import Dashboard from './c/Dashboard'
import GetPoints from './c/GetPoints'
import Leaderboard from './c/Leaderboard'
import MyPoints from './c/MyPoints'

const Tasks: FC = () => {
  const { isLogin, goLogin } = useGetTaskProfile()
  return (
    <>
      <Dashboard />
      {!isLogin && (
        <div className="web">
          <Alert show type="error">
            To access personal points data, you need to sign with your wallet first{' '}
            <ConnectHelpButton size="mini">
              <Button size="mini" onClick={goLogin}>
                Go Sign
              </Button>
            </ConnectHelpButton>
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
