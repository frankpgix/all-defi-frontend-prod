import { FC } from 'react'

import Chart from './c/Chart'
import ValutList from './c/ValutList'
import FundDialog from './c/ValutDialog'

const Main: FC = () => {
  return (
    <>
      <Chart />
      <ValutList />
      <FundDialog />
    </>
  )
}

export default Main
