import { FC } from 'react'

import Chart from './c/Chart'
import ValutList from './c/ValutList'
import VerifiedDialog from './c/VerifiedDialog'

const Main: FC = () => {
  return (
    <>
      <Chart />
      <ValutList />
      <VerifiedDialog />
    </>
  )
}

export default Main
