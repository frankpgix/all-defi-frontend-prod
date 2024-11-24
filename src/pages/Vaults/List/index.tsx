import { FC } from 'react'

import Charts from './c/Charts'
import Dashboard from './c/Dashboard'
import VaultList from './c/VaultList/V2'

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
