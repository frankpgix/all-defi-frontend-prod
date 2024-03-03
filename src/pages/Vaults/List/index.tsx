import { FC } from 'react'

import Dashboard from './c/Dashboard'
import Charts from './c/Charts'
import VaultList from './c/VaultList'

const FundMarket: FC = () => {
  return (
    <>
      <Dashboard />
      <Charts />
      <VaultList />
    </>
  )
}

export default FundMarket
