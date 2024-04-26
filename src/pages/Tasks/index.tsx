import { FC } from 'react'

import Dashboard from './c/Dashboard'
import Leaderboard from './c/Leaderboard'
import MyPoints from './c/MyPoints'
import TaskItem from './c/TaskItem'

const Tasks: FC = () => {
  return (
    <>
      <Dashboard />
      <TaskItem />
      <MyPoints />
      <Leaderboard />
    </>
  )
}

export default Tasks
