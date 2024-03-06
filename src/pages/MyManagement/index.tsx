import { FC, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const Investment = lazy(() => import('./Investment'))
const InvestmentHistory = lazy(() => import('./Investment/History'))

const Manager = lazy(() => import('./Manager'))
const CreateVault = lazy(() => import('./Manager/CreateVault'))
const VaultDetail = lazy(() => import('./Manager/VaultDetail'))
const VaultStake = lazy(() => import('./Manager/VaultStake'))
const EditVault = lazy(() => import('./Manager/EditVault'))
const Dapp = lazy(() => import('./Manager/Dapp'))

const MyManagement: FC = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="investment" element={<Investment />} />
      <Route path="investment/history" element={<InvestmentHistory />} />
      <Route path="manager" element={<Manager />} />
      <Route path="manager/vault/:vaultAddress" element={<VaultDetail />} />
      <Route path="manager/create" element={<CreateVault />} />
      <Route path="manager/vault-edit/:vaultAddress" element={<EditVault />} />
      <Route path="manager/vault-stake/:vaultAddress/:direction" element={<VaultStake />} />
      <Route path="manager/dapp/:vaultAddress" element={<Dapp />} />
    </Routes>
  )
}

export default MyManagement
