import { FC, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// import { useGetVaultList } from '@/hooks/useVaultList'
import Home from './Home'
import Investment from './Investment'
import Manager from './Manager'

// const Home = lazy(() => import('./Home'))
// const Investment = lazy(() => import('./Investment'))
const InvestmentHistory = lazy(() => import('./Investment/History'))

// const Manager = lazy(() => import('./Manager'))
const CreateVault = lazy(() => import('./Manager/CreateVault'))
const VaultDetail = lazy(() => import('./Manager/VaultDetail'))
// const VaultStake = lazy(() => import('./Manager/VaultStake'))
// const EditVault = lazy(() => import('./Manager/EditVault'))

const MyManagement: FC = () => {
  // useGetVaultList()
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="investment" element={<Investment />} />
      <Route path="investment/history" element={<InvestmentHistory />} />
      <Route path="manager" element={<Manager />} />
      <Route path="manager/vault/:vaultAddress" element={<VaultDetail />} />
      <Route path="manager/create" element={<CreateVault />} />
      {/* <Route path="manager/vault-edit/:vaultAddress" element={<EditVault />} /> */}
      {/* <Route path="manager/vault-stake/:vaultAddress/:direction" element={<VaultStake />} /> */}
    </Routes>
  )
}

export default MyManagement
