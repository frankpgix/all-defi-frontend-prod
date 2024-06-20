import { FC } from 'react'

import { useGetTaskProfile } from '@/hooks/useTasks'

import Dashboard from './c/Dashboard'
import GetPoints from './c/GetPoints'
import Leaderboard from './c/Leaderboard'
import MyPoints from './c/MyPoints'

const Tasks: FC = () => {
  useGetTaskProfile()
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
