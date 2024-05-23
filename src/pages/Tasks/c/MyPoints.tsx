import { FC } from 'react'

import Button from '@@/common/Button'
import CopyText from '@@/common/CopyText'

const MyPoints: FC = () => {
  return (
    <>
      <header className="p-task-header">My Points</header>
      <div className="p-task-my-points-layout">
        <div className="p-task-my-points">
          <div className="p-task-my-points-total">
            <label>Total Points</label>
            <em>312,123</em>
            <Button text>points rules</Button>
          </div>
          <div className="p-task-my-points-details">
            <div className="p-task-my-points-item">
              <label>Deposit Token and Get AC Token</label>
              <em>123,123</em>
            </div>
            <div className="p-task-my-points-item">
              <label>Stake to vault</label>
              <em>123,123</em>
            </div>
            <div className="p-task-my-points-item arrow">
              <label>Invitation Points</label>
              <em>123,123</em>
            </div>
            <div className="p-task-my-points-item arrow">
              <label>Number of Invitations</label>
              <em>123,123</em>
            </div>
          </div>
          <div className="p-task-my-points-invet">
            <p>https://alldefi.io/1e13c1e13c1e13c1e13c1e13c1e13c1e13c</p>
            <CopyText text="https://alldefi.io/1e13c" />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPoints
