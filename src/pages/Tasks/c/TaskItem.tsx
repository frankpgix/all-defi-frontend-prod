import { FC } from 'react'

import Blank from '@@/common/Blank'
import Button from '@@/common/Button'
import CopyText from '@@/common/CopyText'
import Popper from '@@/common/Popper'
import BlueLineSection from '@@/web/BlueLineSection'

const TasksItem: FC = () => {
  return (
    <>
      {/* <header className="p-task-header">My Points</header> */}
      <BlueLineSection title="Get points immediately" className="p-task-items">
        <header className="p-task-items-header">
          <em>Task 1</em>
          <span>Complete social platform tasks</span>
        </header>
        <section className="p-task-items-section">
          <div className="p-task-items-item done">
            <p>Fill in the Invitation Code</p>
            <Button size="tiny">To Complete Task</Button>
          </div>
          <div className="p-task-items-item">
            <p>Join AllDeFi Discord</p>
            <Button size="tiny">To Complete Task</Button>
          </div>
          <div className="p-task-items-item">
            <p>Connect and follow Alldefi on Twitte</p>
            <Button size="tiny">Connect Twitter</Button>
          </div>
          <div className="p-task-items-invite">
            Referral Invite Link: <em>alldefi.io/1e13c</em>
            <CopyText text="https://alldefi.io/1e13c" />
          </div>
        </section>
        <Blank size="medium" />
        <section className="p-task-items-section">
          <main>
            <header className="p-task-items-header">
              <em>Task 2</em>
              <span>Buy ACToken</span>
              <Popper content="Buy ACToken" />
            </header>
            <div className="p-task-items-item">
              <p>Connect and follow Alldefi on Twitte</p>
            </div>
            <div className="p-task-items-item-more">
              <p>Got XXX points today</p>
              <Button size="mini">Contribution</Button>
            </div>
          </main>
          <main>
            <header className="p-task-items-header">
              <em>Task 3</em>
              <span>Allocate to vault</span>
              <Popper content="Allocate to vault" />
            </header>
            <div className="p-task-items-item">
              <p>Allocate XXX USD to any one Vault Can Get XXX Points</p>
            </div>
            <div className="p-task-items-item-more">
              <p>Got XXX points today</p>
              <Button size="mini">Allocation</Button>
            </div>
          </main>
        </section>
      </BlueLineSection>
    </>
  )
}

export default TasksItem
