import { FC } from 'react'

import Dashboard from './c/Dashboard'
import MyPoints from './c/MyPoints'
import TaskItem from './c/TaskItem'

const Tasks: FC = () => {
  return (
    <>
      <Dashboard />
      <TaskItem />
      <MyPoints />
    </>
  )
}

export default Tasks
