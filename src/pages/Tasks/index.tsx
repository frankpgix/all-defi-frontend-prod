import { FC } from 'react'

import Dashboard from './c/Dashboard'
import TaskItem from './c/TaskItem'

const Tasks: FC = () => {
  return (
    <>
      <Dashboard />
      <TaskItem />
    </>
  )
}

export default Tasks
