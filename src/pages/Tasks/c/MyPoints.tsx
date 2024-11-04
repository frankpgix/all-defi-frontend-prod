import { FC, useMemo } from 'react'

import BN from 'bignumber.js'

import { useTaskProfile } from '@/hooks/useTasks'

import { WHITEPAPER_URL } from '@/config'
import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import CopyText from '@@/common/CopyText'

const MyPoints: FC = () => {
  const { point, user } = useTaskProfile()
  const invetUrl = useMemo(
    () => (user.inviteCode ? `${location.origin}/invite?code=${user.inviteCode}` : ''),
    [user.inviteCode]
  )

  const total = useMemo(
    () =>
      BN(point.totalDepositPoints)
        .plus(point.totalStakePoints)
        .plus(point.totalInvitePoints)
        .toNumber(),
    [point]
  )

  return (
    <>
      <header className="p-task-header">My Points</header>
      <div className="p-task-my-points-layout">
        <div className="p-task-my-points">
          <div className="p-task-my-points-total">
            <label>Total Points</label>
            <em>{formatNumber(total, 2, '0,0')}</em>
            <Button to={WHITEPAPER_URL} text>
              points rules
            </Button>
          </div>
          <div className="p-task-my-points-details">
            <div className="p-task-my-points-item">
              <label>Stake to vault</label>
              <em>
                {formatNumber(point.totalStakePoints, 0, '0,0')} <small>Pts</small>
              </em>
            </div>
            <div className="p-task-my-points-item arrow">
              <label>Invitation Points</label>
              <em>
                {formatNumber(point.totalInvitePoints, 0, '0,0')} <small>Pts</small>
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
