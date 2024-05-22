import { FC } from 'react'

import Dashboard from './c/Dashboard'
import GetPoints from './c/GetPoints'
import Leaderboard from './c/Leaderboard'
import MyPoints from './c/MyPoints'

// import TaskItem from './c/TaskItem'

const Tasks: FC = () => {
  return (
    <>
      <Dashboard />
      <GetPoints />
      <MyPoints />
      <Leaderboard />
    </>
  )
}

export default Tasks
