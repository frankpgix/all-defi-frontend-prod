import { FC, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const Investment = lazy(() => import('./Investment'))
const InvestmentHistory = lazy(() => import('./Investment/History'))

const Manager = lazy(() => import('./Manager'))
const CreateVault = lazy(() => import('./Manager/CreateVault'))
const VaultDetail = lazy(() => import('./Manager/VaultDetail'))
// const FundStake = lazy(() => import('./Manager/FundStake'))
const EditVault = lazy(() => import('./Manager/EditVault'))
// const Dapp = lazy(() => import('./Manager/Dapp'))

const MyManagement: FC = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="investment" element={<Investment />} />
      <Route path="investment/history" element={<InvestmentHistory />} />
      <Route path="manager" element={<Manager />} />
      <Route path="manager/vault/:vaultAddress" element={<VaultDetail />} />
      <Route path="manager/create" element={<CreateVault />} />
      <Route path="manager/fund-edit/:vaultAddress" element={<EditVault />} />
      {/*<Route path="manager/fund-stake/:fundAddress/:direction" element={<FundStake />} />
      <Route path="manager/dapp/:fundAddress" element={<Dapp />} /> */}
    </Routes>
  )
}

export default MyManagement
