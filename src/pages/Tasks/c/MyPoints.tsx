import { FC, useMemo } from 'react'

import { useTaskProfile } from '@/hooks/useTasks'

import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import CopyText from '@@/common/CopyText'

const MyPoints: FC = () => {
  const { point, user } = useTaskProfile()

  const invetUrl = useMemo(
    () => (user.inviteCode ? `https://alldefi.io/invite?code=${user.inviteCode}` : ''),
    [user.inviteCode]
  )
  return (
    <>
      <header className="p-task-header">My Points</header>
      <div className="p-task-my-points-layout">
        <div className="p-task-my-points">
          <div className="p-task-my-points-total">
            <label>Total Points</label>
            <em>
              {formatNumber(point.totalDepositPoints + point.totalDepositPoints, 2, '0,0.00')}
            </em>
            <Button text>points rules</Button>
          </div>
          <div className="p-task-my-points-details">
            <div className="p-task-my-points-item">
              <label>Deposit Token and Get AC Token</label>
              <em>
                {formatNumber(point.todayDepositPoints, 2, '0,0.00')} <small>Pts</small>
              </em>
            </div>
            <div className="p-task-my-points-item">
              <label>Stake to vault</label>
              <em>
                {formatNumber(point.totalStakePoints, 2, '0,0.00')} <small>Pts</small>
              </em>
            </div>
            <div className="p-task-my-points-item arrow">
              <label>Invitation Points</label>
              <em>
                {formatNumber(point.todayInvitePoints, 2, '0,0.00')} <small>Pts</small>
              </em>
            </div>
            <div className="p-task-my-points-item arrow">
              <label>Number of Invitations</label>
              <em>{formatNumber(user.inviteeCount, 0, '0,0')}</em>
            </div>
          </div>
          {invetUrl && (
            <div className="p-task-my-points-invet">
              <p>{invetUrl}</p>
              <CopyText text={invetUrl} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MyPoints
