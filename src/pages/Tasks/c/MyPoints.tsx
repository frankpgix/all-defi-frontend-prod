import { FC } from 'react'

import Popper from '@@/common/Popper'

const MyPoints: FC = () => {
  return (
    <>
      <header className="p-task-header">My Points</header>
      <div className="p-task-my-points">
        <main>
          <div className="p-task-my-points-item-total">
            <label>
              Total Points <Popper content="Total Points" />
            </label>
            <em>312,123</em>
          </div>
          <div className="p-task-my-points-details">
            <div className="p-task-my-points-item">
              <label>Task 2 Points</label>
              <em>123,123</em>
            </div>
            <div className="p-task-my-points-item">
              <label>Task 3 Points</label>
              <em>123,123</em>
            </div>
            <div className="p-task-my-points-item arrow">
              <label>Invitation Points</label>
              <em>123,123</em>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default MyPoints
