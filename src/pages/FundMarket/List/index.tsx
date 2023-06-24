import React, { FC } from 'react'

import Dashboard from './c/Dashboard'
import Charts from './c/Charts'
import FundList from './c/FundList'

const FundMarket: FC = () => {
  return (
    <>
      <Dashboard />
      <Charts />
      <FundList />
    </>
  )
}

export default FundMarket
